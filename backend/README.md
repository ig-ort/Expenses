# Configuracion en local

APP_URL=http://localhost:8000

FRONTEND_URL=http://localhost:3000

SESSION_SECURE_COOKIE=false
SESSION_SAMESITE=lax

SANCTUM_STATEFUL_DOMAINS=localhost:3000

SESSION_DOMAIN=localhost

# API Response

```
{
  "success": true,
  "message": "Descripción de la respuesta",
  "data": { },
  "errors": { }
}
```

Explicación de los campos:

| Campo 	| Tipo 	            | Descripción 	|
|-----------|-------------------|---------------------------------------------------------------|
| success   | bool              | true si la petición fue exitosa, false si falló.              |
| message   | string            | Mensaje de confirmación o error.                              |
| data      | object o array    | Datos devueltos (si aplica). Puede ser un objeto o un array.  |
| errors    | object o null     | Lista de errores si la petición falló.                        |

Trait Filterable

Uso básico
1. Implementar el Trait en un modelo

Para usar el Trait Filterable, simplemente agrégalo en tu modelo:

```
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class TuModelo extends Model
{
    use Filterable;

    // Resto del código del modelo...
}
```

2. Parámetros de filtrado
El Trait soporta los siguientes parámetros de filtrado:

a) Filtros básicos:
filters[columna][like]: Filtra registros donde la columna contenga el valor (búsqueda aproximada).

plaintext
?filters[nombre][like]=John
filters[columna][equals]: Filtra registros donde la columna sea igual al valor (comparación exacta).

plaintext
?filters[status][equals]=active

b) Filtros de fechas:
filters[columna][from] y filters[columna][to]: Filtra registros dentro de un rango de fechas.

plaintext
?filters[created_at][from]=2023-01-01&filters[created_at][to]=2023-12-31
filters[columna][gt]: Filtra registros donde la columna sea mayor que el valor.

plaintext
?filters[created_at][gt]=2023-01-01
filters[columna][lt]: Filtra registros donde la columna sea menor que el valor.

plaintext
?filters[created_at][lt]=2023-12-31
filters[columna][gte]: Filtra registros donde la columna sea mayor o igual que el valor.

plaintext
?filters[created_at][gte]=2023-01-01
filters[columna][lte]: Filtra registros donde la columna sea menor o igual que el valor.

plaintext
?filters[created_at][lte]=2023-12-31

c) Ordenamiento:
sort[columna]: Ordena los resultados por la columna especificada (asc o desc).

plaintext
?sort[nombre]=asc

d) Paginación:
per_page: Define el número de registros por página. Usa all para obtener todos los registros sin paginación.

plaintext
?per_page=10

# Sistema de Notas de 3 Niveles - Client Project Notes

## Descripción General

El modelo `ClientProjectNote` maneja exactamente 3 niveles de notas:

```
Proyecto Principal (Nivel 0)
├── Fase 1 (Nivel 1)
│   ├── Tarea 1.1 (Nivel 2)
│   ├── Tarea 1.2 (Nivel 2)
│   └── Tarea 1.3 (Nivel 2)
├── Fase 2 (Nivel 1)
│   ├── Tarea 2.1 (Nivel 2)
│   └── Tarea 2.2 (Nivel 2)
└── Fase 3 (Nivel 1)
    └── Tarea 3.1 (Nivel 2)
```

## Estructura del Modelo

### Niveles Definidos

1. **Nivel 0 - Proyecto Principal**: No tiene padre (`parent_note_id = null`)
2. **Nivel 1 - Fase**: Hijo directo del proyecto principal
3. **Nivel 2 - Tarea**: Hijo directo de una fase

### Relaciones

- **`parent()`**: Obtiene la nota padre (relación BelongsTo)
- **`subNotes()`**: Obtiene solo los hijos directos (relación HasMany)

### Métodos Utilitarios

- **`isMainProject()`**: Verifica si es un proyecto principal (nivel 0)
- **`isPhase()`**: Verifica si es una fase (nivel 1)
- **`isTask()`**: Verifica si es una tarea (nivel 2)
- **`getLevel()`**: Retorna el nivel (0, 1, o 2)
- **`getMainProject()`**: Obtiene el proyecto principal de cualquier nota

## Endpoints de la API

### Endpoints Básicos

- `GET /api/project-notes` - Listar todas las notas
- `POST /api/project-note` - Crear nueva nota
- `GET /api/project-note/{id}` - Obtener nota específica
- `PUT /api/project-note/{id}` - Actualizar nota
- `DELETE /api/project-note/{id}` - Eliminar nota

### Endpoints Específicos para 3 Niveles

- `GET /api/project-note/{id}/sub-notes` - Obtener hijos directos de una nota
- `GET /api/project-note/{id}/structure` - Obtener estructura completa de un proyecto principal
- `GET /api/project-notes/main-projects` - Obtener solo proyectos principales

## Parámetros de Consulta

### Para `/api/project-notes`

- `include_sub_notes=true` - Incluye 2 niveles de profundidad (subNotes.subNotes)
- `only_main_projects=true` - Solo devuelve proyectos principales (nivel 0)
- `per_page=N` - Número de elementos por página

### Para `/api/project-note/{id}`

- `include_sub_notes=true` - Incluye hasta 2 niveles de hijos (por defecto: true)
- `include_parent=true` - Incluye información del padre (por defecto: true)

### Para `/api/project-note/{id}/sub-notes`

- `include_grandchildren=false` - Incluye nietos (tareas si es un proyecto, o false si es una fase)

### Para `/api/project-notes/main-projects`

- `include_structure=false` - Incluye toda la estructura (fases y tareas)
- `per_page=N` - Número de elementos por página

## Validaciones

1. **Límite de Niveles**: No se permite crear más de 3 niveles
2. **Autorización**: Solo se pueden asignar como padres notas del usuario autenticado
3. **Ciclos Simples**: No se permite asignar como padre a un hijo directo

## Ejemplos de Uso

### 1. Crear un proyecto principal

```json
POST /api/project-note
{
    "content": "Desarrollo de App Móvil",
    "project_id": 1,
    "client_id": 1,
    "parent_note_id": null
}
```

### 2. Crear una fase

```json
POST /api/project-note
{
    "content": "Fase de Diseño",
    "project_id": 1,
    "client_id": 1,
    "parent_note_id": "id-del-proyecto-principal"
}
```

### 3. Crear una tarea

```json
POST /api/project-note
{
    "content": "Diseñar wireframes",
    "project_id": 1,
    "client_id": 1,
    "parent_note_id": "id-de-la-fase"
}
```

### 4. Obtener proyectos principales con estructura completa

```
GET /api/project-notes/main-projects?include_structure=true
```

### 5. Obtener estructura completa de un proyecto específico

```
GET /api/project-note/{id}/structure
```

### 6. Obtener todas las fases de un proyecto

```
GET /api/project-note/{id}/sub-notes
```

### 7. Obtener todas las tareas de una fase con sus detalles

```
GET /api/project-note/{id}/sub-notes?include_grandchildren=false
```

## Estructura de Respuesta

### Proyecto Principal con Estructura Completa

```json
{
    "success": true,
    "data": {
        "client_project_note_id": "01234567-89ab-cdef-0123-456789abcdef",
        "content": "Desarrollo de App Móvil",
        "level": 0,
        "is_main_project": true,
        "is_phase": false,
        "is_task": false,
        "project": { ... },
        "client": { ... },
        "sub_notes": [
            {
                "client_project_note_id": "fase-1-id",
                "content": "Fase de Diseño",
                "sub_notes": [
                    {
                        "client_project_note_id": "tarea-1-id",
                        "content": "Crear wireframes"
                    },
                    {
                        "client_project_note_id": "tarea-2-id",
                        "content": "Diseñar UI"
                    }
                ]
            },
            {
                "client_project_note_id": "fase-2-id",
                "content": "Fase de Desarrollo",
                "sub_notes": [
                    {
                        "client_project_note_id": "tarea-3-id",
                        "content": "Setup del proyecto"
                    }
                ]
            }
        ]
    }
}
```

### Respuesta de Estructura de Proyecto

```json
{
    "success": true,
    "data": {
        "main_project": {
            "client_project_note_id": "01234567-89ab-cdef-0123-456789abcdef",
            "content": "Desarrollo de App Móvil",
            "sub_notes": [ ... ]
        },
        "level": 0,
        "total_phases": 3,
        "total_tasks": 7
    }
}
```

## Casos de Uso Típicos

1. **Gestión de Proyectos**: Crear proyectos con fases bien definidas y tareas específicas
2. **Seguimiento de Progreso**: Ver el avance por fases y tareas individuales
3. **Planificación**: Organizar el trabajo en una estructura clara de 3 niveles
4. **Reportes**: Generar informes por proyecto, fase o tarea

## Consideraciones

- Máximo 3 niveles: Proyecto > Fase > Tarea
- Cada nivel tiene un propósito específico y claro
- La estructura es simple y fácil de entender para el frontend
- Compatible con sistemas de gestión de proyectos tradicionales
