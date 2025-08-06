<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreBankAccountRequest;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\UpdateBankAccountRequest;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = BankAccount::forAuthenticatedUser();

        $query->with('bank');

        // $query = auth()->user();

        // Aplicar filtros
        if (!empty($filters)) {
            $query->filter($filters);
        }

        // Aplicar ordenamiento
        if (!empty($sorts)) {
            $query->sort($sorts);
        }

        // Paginar o obtener todos los registros
        $bankAccounts = $query->paginateOrGet($perPage);
 
        // $banks = BankAccount::where('user_id', Auth::id())->get();
        return ApiResponse::success($bankAccounts, 'Cuentas Bancarias obtenidas exitosamente');
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreBankAccountRequest $request)
    {
        try {
            
            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255', // Falta agregar unique de usuario - banco
                'clabe' => 'nullable|string|max:18',
                'account_number' => 'nullable|string|max:18',
                'icon' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'bank_id' => 'required|exists:Bank,bank_id',
            ]);
    
            $bankaccount = BankAccount::create([
                'name' => $request->name,
                'code' => $request->code,
                'clabe' => $request->clabe ?? null,
                'account_number' => $request->account_number ?? null,
                'bank_id' => $request->bank_id,
                'icon' => $request->icon ?? null,
                'description' => $request->description ?? null,
                'is_active' => 1,
            ]);
    
            return ApiResponse::success($bankaccount, 'Cuenta Bancaria registrada exitosamente', 201);

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

            $bankaccount = BankAccount::forAuthenticatedUser()->find($id);

            if (!$bankaccount) {
                return ApiResponse::error(null, 'Cuenta Bancaria no encontrada', 404);
            }

            return ApiResponse::success($bankaccount, 'Cuenta Bancaria obtenida correctamente');
            
        } catch (\Exception  $e) {
            return ApiResponse::error(null, 'Ocurrió un error al obtener la Cuenta Bancaria', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBankAccountRequest $request, $id)
    {
        try {

            $bankaccount = BankAccount::forAuthenticatedUser()->find($id);

            if (!$bankaccount) {
                return ApiResponse::error(null, 'Cuenta Bancaria no encontrada', 404);
            }

            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:255', // Falta agregar unique de usuario - banco
                'clabe' => 'nullable|string|max:18',
                'account_number' => 'nullable|string|max:18',
                'icon' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'bank_id' => 'required|exists:Bank,bank_id',
            ]);
    
            $bankaccount->update($request->all());
    
            // Devolver una respuesta JSON
            return response()->json([
                'message' => 'Cuenta Bancaria actualizada exitosamente',
                'user' => $bankaccount,
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

            $bankaccount = BankAccount::forAuthenticatedUser()->find($id);

            if (!$bankaccount) {
                return ApiResponse::error(null, 'Cuenta Bancaria no encontrada', 404);
            }

            $bankaccount->delete();
    
            return ApiResponse::success(null, 'Cuenta Bancaria eliminada correctamente', 200);

        } catch (\Exception $e) {
            return ApiResponse::error(null, 'Ocurrió un error al eliminar la Cuenta Bancaria', 500);
        }        
    }
}
