<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ApiResponse;
use App\Models\MethodPayment;
use App\Http\Requests\StoreMethodPaymentRequest;
use App\Http\Requests\UpdateMethodPaymentRequest;

class MethodPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 'all'); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = MethodPayment::query();

        // Aplicar filtros
        if (!empty($filters)) {
            $query->filter($filters);
        }

        // Aplicar ordenamiento
        if (!empty($sorts)) {
            $query->sort($sorts);
        } else {
            $query->orderBy('order', 'asc');
        }

        // Paginar o obtener todos los registros
        $methods = $query->paginateOrGet($perPage);
 
        return ApiResponse::success($methods, 'Métodos de pago obtenidos exitosamente');
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
    public function store(StoreMethodPaymentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MethodPayment $methodPayment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MethodPayment $methodPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMethodPaymentRequest $request, MethodPayment $methodPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MethodPayment $methodPayment)
    {
        //
    }
}
