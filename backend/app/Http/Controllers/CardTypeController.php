<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ApiResponse;
use App\Models\CardType;
use App\Http\Requests\StoreCardTypeRequest;
use App\Http\Requests\UpdateCardTypeRequest;

class CardTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 'all'); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = CardType::query();

        // Aplicar filtros
        if (!empty($filters)) {
            $query->filter($filters);
        }

        // Aplicar ordenamiento
        if (!empty($sorts)) {
            $query->sort($sorts);
        } else {
            $query->orderBy('name', 'asc');
        }

        // Paginar o obtener todos los registros
        $methods = $query->paginateOrGet($perPage);
 
        return ApiResponse::success($methods, 'Tipos de Tarjeta obtenidas exitosamente');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardTypeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CardType $cardType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CardType $cardType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardTypeRequest $request, CardType $cardType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CardType $cardType)
    {
        //
    }
}
