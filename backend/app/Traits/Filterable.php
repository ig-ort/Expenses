<?php

namespace App\Traits;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

trait Filterable
{
    /**
     * Aplica filtros a la consulta.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $filters
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['filters'])) {
            foreach ($filters['filters'] as $column => $filter) {
                // Verificar si la columna existe en el modelo
                if (!$this->columnExists($column)) {
                    continue; // Omitir esta columna si no existe
                }
                
                if (is_array($filter)) {
                    // Filtro por rango (por ejemplo, fechas)
                    if (isset($filter['from']) || isset($filter['to'])) {
                        $columnType = $this->getColumnType($column);
                        
                        // Si ambos están presentes, usar whereBetween
                        if (isset($filter['from']) && isset($filter['to'])) {
                            $from = $this->validateDate($filter['from'], $column, 'start');
                            $to = $this->validateDate($filter['to'], $column, 'end');
                            if ($from && $to) {
                                $query->whereBetween($column, [$from, $to]);
                            }
                        }
                        // Solo 'from' está presente (mayor o igual que)
                        elseif (isset($filter['from'])) {
                            $from = $this->validateDate($filter['from'], $column, 'start');
                            if ($from) {
                                $query->where($column, '>=', $from);
                            }
                        }
                        // Solo 'to' está presente (menor o igual que)
                        elseif (isset($filter['to'])) {
                            $to = $this->validateDate($filter['to'], $column, 'end');
                            if ($to) {
                                $query->where($column, '<=', $to);
                            }
                        }
                    }
                    // Filtro por comparación exacta (=)
                    elseif (isset($filter['equals'])) {
                        $value = $this->validateType($column, $filter['equals']);
                        if ($value !== null) {
                            $query->where($column, '=', $value);
                        }
                    }
                    // Filtro por LIKE
                    elseif (isset($filter['like'])) {
                        $value = $this->validateType($column, $filter['like']);
                        if ($value !== null) {
                            $query->where($column, 'like', "%{$value}%");
                        }
                    }
                    // Filtro por mayor que (>)
                    elseif (isset($filter['gt'])) {
                        $value = $this->validateType($column, $filter['gt']);
                        if ($value !== null) {
                            // Si es una fecha/datetime, usar la hora exacta o final del día para ser más estricto
                            if (in_array($this->getColumnType($column), ['date', 'datetime', 'timestamp'])) {
                                $value = $this->validateDate($filter['gt'], $column, 'end');
                            }
                            $query->where($column, '>', $value);
                        }
                    }
                    // Filtro por menor que (<)
                    elseif (isset($filter['lt'])) {
                        $value = $this->validateType($column, $filter['lt']);
                        if ($value !== null) {
                            // Si es una fecha/datetime, usar la hora exacta o inicio del día para ser más estricto
                            if (in_array($this->getColumnType($column), ['date', 'datetime', 'timestamp'])) {
                                $value = $this->validateDate($filter['lt'], $column, 'start');
                            }
                            $query->where($column, '<', $value);
                        }
                    }
                    // Filtro por mayor o igual que (>=)
                    elseif (isset($filter['gte'])) {
                        $value = $this->validateType($column, $filter['gte']);
                        if ($value !== null) {
                            // Si es una fecha/datetime, usar el inicio del día
                            if (in_array($this->getColumnType($column), ['date', 'datetime', 'timestamp'])) {
                                $value = $this->validateDate($filter['gte'], $column, 'start');
                            }
                            $query->where($column, '>=', $value);
                        }
                    }
                    // Filtro por menor o igual que (<=)
                    elseif (isset($filter['lte'])) {
                        $value = $this->validateType($column, $filter['lte']);
                        if ($value !== null) {
                            // Si es una fecha/datetime, usar el final del día
                            if (in_array($this->getColumnType($column), ['date', 'datetime', 'timestamp'])) {
                                $value = $this->validateDate($filter['lte'], $column, 'end');
                            }
                            $query->where($column, '<=', $value);
                        }
                    }
                }
                // Si el filtro es un string, se asume un LIKE por defecto
                else {
                    $value = $this->validateType($column, $filter);
                    if ($value !== null) {
                        $query->where($column, 'like', "%{$value}%");
                    }
                }
            }
        }

        return $query;
    }

    /**
     * Valida y convierte un valor según el tipo de dato esperado para la columna.
     *
     * @param string $column
     * @param mixed $value
     * @return mixed
     */
    protected function validateType($column, $value)
    {
        // Obtener el tipo de dato esperado para la columna
        $type = $this->getColumnType($column);
        
        // Si la columna no existe, devolver null
        if ($type === null) {
            return null;
        }

        switch ($type) {
            case 'date':
            case 'datetime':
            case 'timestamp':
                return $this->validateDate($value, $column);
            case 'integer':
            case 'bigint':
                return $this->validateInteger($value);
            case 'decimal':
            case 'float':
                return $this->validateFloat($value);
            case 'string':
            default:
                return $this->validateString($value);
        }
    }

    /**
     * Valida y convierte un valor a fecha.
     *
     * @param mixed $value
     * @param string $column
     * @param string $timeRange 'start' para inicio del día, 'end' para final del día, null para hora exacta
     * @return string|null
     */
    protected function validateDate($value, $column, $timeRange = null)
    {
        try {
            $carbonDate = Carbon::parse($value);
            $columnType = $this->getColumnType($column);

            // Si la columna es de tipo 'date', devolver solo la fecha
            if ($columnType === 'date') {
                return $carbonDate->toDateString(); // Formato: YYYY-MM-DD
            }

            // Para datetime/timestamp, manejar rangos de tiempo
            if ($timeRange === 'start') {
                return $carbonDate->startOfDay()->toDateTimeString(); // YYYY-MM-DD 00:00:00
            } elseif ($timeRange === 'end') {
                return $carbonDate->endOfDay()->toDateTimeString(); // YYYY-MM-DD 23:59:59
            }

            // Si no se especifica rango, usar la hora exacta o inicio del día si solo se pasó fecha
            return $carbonDate->toDateTimeString(); // Formato: YYYY-MM-DD HH:MM:SS
        } catch (\Exception $e) {
            return null; // Si no es una fecha válida, devolver null
        }
    }

    /**
     * Valida y convierte un valor a entero.
     *
     * @param mixed $value
     * @return int|null
     */
    protected function validateInteger($value)
    {
        return filter_var($value, FILTER_VALIDATE_INT) !== false ? (int)$value : null;
    }

    /**
     * Valida y convierte un valor a float.
     *
     * @param mixed $value
     * @return float|null
     */
    protected function validateFloat($value)
    {
        return filter_var($value, FILTER_VALIDATE_FLOAT) !== false ? (float)$value : null;
    }

    /**
     * Valida y convierte un valor a string.
     *
     * @param mixed $value
     * @return string|null
     */
    protected function validateString($value)
    {
        return is_string($value) ? $value : null;
    }

    /**
     * Verifica si la columna existe en el modelo.
     *
     * @param string $column
     * @return bool
     */
    protected function columnExists($column)
    {
        try {
            $this->getConnection()->getSchemaBuilder()->getColumnType($this->getTable(), $column);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Obtiene el tipo de dato de la columna.
     *
     * @param string $column
     * @return string|null
     */
    protected function getColumnType($column)
    {
        // Verificar si la columna existe antes de obtener su tipo
        if (!$this->columnExists($column)) {
            return null;
        }
        
        // Obtener el tipo de dato de la columna desde el esquema de la base de datos
        return $this->getConnection()->getSchemaBuilder()->getColumnType($this->getTable(), $column);
    }

    /**
     * Aplica ordenamiento a la consulta.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $sorts
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSort($query, $sorts)
    {
        if (isset($sorts['sort'])) {
            foreach ($sorts['sort'] as $column => $direction) {
                // Verificar si la columna existe antes de aplicar el ordenamiento
                if ($this->columnExists($column)) {
                    $query->orderBy($column, $direction);
                }
            }
        }

        return $query;
    }

    /**
     * Pagina o obtiene todos los registros.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection
     */
    public function scopePaginateOrGet($query, $perPage)
    {
        if ($perPage === 'all') {
            $results = $query->get();
            return [
                'data' => $results,
                'total' => $results->count(),
                'per_page' => $results->count(),
                'current_page' => 1,
                'last_page' => 1,
            ];
        }

        return $query->paginate($perPage);
    }
    
}