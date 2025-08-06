<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreBankRequest;
use App\Http\Requests\UpdateBankRequest;
use Illuminate\Validation\ValidationException;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = Bank::query();

        $query->where('user_id', Auth::id());

        // Aplicar filtros
        if (!empty($filters)) {
            $query->filter($filters);
        }

        // Aplicar ordenamiento
        if (!empty($sorts)) {
            $query->sort($sorts);
        }

        // Paginar o obtener todos los registros
        $banks = $query->paginateOrGet($perPage);
 
        // $banks = Bank::where('user_id', Auth::id())->get();
        return ApiResponse::success($banks, 'Bancos obtenidos exitosamente');
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreBankRequest $request)
    {
        try {
            
            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255', // Falta agregar unique de usuario - banco
                'icon' => 'nullable|string|max:255',
                'description' => 'nullable|string',
            ]);
    
            $bank = Bank::create([
                'name' => $request->name,
                'code' => $request->code,
                'icon' => $request->icon ?? null,
                'description' => $request->description ?? null,
                'is_active' => 1,
                'user_id' => Auth::id(),
            ]);
    
            return ApiResponse::success($bank, 'Banco registrado exitosamente', 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {

            $bank = Bank::find($id);

            if (!$bank) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            if ($bank->user_id !== Auth::id()) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            return ApiResponse::success($bank, 'Banco obtenido correctamente');
            
        } catch (\Exception  $e) {
            return ApiResponse::error(null, 'Ocurrió un error al obtener el banco', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBankRequest $request, $id)
    {
        try {

            $bank = Bank::find($id);

            if (!$bank) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            if ($bank->user_id !== Auth::id()) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            // Validar los datos de entrada
            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255', // Falta agregar unique de usuario - banco
                'icon' => 'nullable|string|max:255',
                'description' => 'nullable|string',
            ]);
    
            $bank->update($request->all());
    
            // Devolver una respuesta JSON
            return response()->json([
                'message' => 'Banco actualizado exitosamente',
                'user' => $bank,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {

            $bank = Bank::find($id);

            if (!$bank) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            if ($bank->user_id !== Auth::id()) {
                return ApiResponse::error(null, 'Banco no encontrado', 404);
            }

            $bank->delete();
    
            return ApiResponse::success(null, 'Banco eliminado correctamente', 200);

        } catch (\Exception $e) {
            return ApiResponse::error(null, 'Ocurrió un error al eliminar el banco', 500);
        }        
    }
}
