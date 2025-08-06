<?php

namespace App\Helpers;

class Helpers
{
    /**
     * Versión mejorada con distribución progresiva
     * 
     * @param float $cantidadTotal Cantidad total a dividir
     * @param int $numeroPartes Número de partes a crear
     * @return array<float> Array con las partes divididas
     * @throws InvalidArgumentException Si los parámetros no son válidos
     */
    public static function dividirCantidad(float $cantidadTotal, int $numeroPartes): array
    {
        // Validaciones
        if ($numeroPartes <= 0) {
            throw new InvalidArgumentException("Número de partes inválido");
        }
        
        if ($cantidadTotal <= 0) {
            throw new InvalidArgumentException("Cantidad inválida");
        }
        
        $cantidadTotal = round($cantidadTotal, 2);
        $partes = [];
        $restante = $cantidadTotal;
        
        for ($i = 1; $i <= $numeroPartes; $i++) {
            if ($i == $numeroPartes) {
                // Última parte: tomar todo lo que queda
                $parte = round($restante, 2);
            } else {
                // Calcular parte dividiendo lo restante entre las partes que quedan
                $parte = floor($restante * 100 / ($numeroPartes - $i + 1)) / 100;
                $restante -= $parte;
                $restante = round($restante, 2);
            }
            
            $partes[] = $parte;
        }
        
        return $partes;
    }
}
