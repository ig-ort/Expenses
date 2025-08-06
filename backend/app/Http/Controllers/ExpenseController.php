<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Helpers\ApiResponse;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = Expense::forAuthenticatedUser();

        $query->with('bankAccount')
            ->with('methodPayment')
            ->with('card');

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
        $expenses = $query->paginateOrGet($perPage);
 
        // $banks = Card::where('user_id', Auth::id())->get();
        return ApiResponse::success($expenses, 'Gastos obtenidos exitosamente');
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreExpenseRequest $request)
    {
        try {
            
            DB::beginTransaction();

            $request->validate([
                'amount' => 'required|numeric|decimal:0,2|min:0.01',
                'description' => 'nullable|string',
                'expense_date' => 'required|date|date_format:Y-m-d',
                'is_installment' => 'required|boolean',
                'installments_count' => 'required_if:is_installment,true|nullable|integer|between:1,100',
                'bank_account_id' => 'nullable|exists:BankAccount,bank_account_id',
                'card_id' => 'nullable|exists:Card,card_id',
                'method_payment_id' => 'required|exists:MethodPayment,method_payment_id',
                'payment' => 'nullable|array',
                'payment.amount' => 'required_with:payment|numeric|min:0.01',
                'payment.payment_date' => 'required_with:payment|date',
                'payment.payment_method' => 'required_with:payment|string|max:255',
            ]);

            $expense = Expense::create([
                'amount' => $request->amount,
                'description' => $request->description ?? null,
                'expense_date' => $request->expense_date,
                'is_installment' => $request->is_installment,
                'installments_count' => $request->installments_count ?? null,
                'bank_account_id' => $request->bank_account_id ?? null,
                'card_id' => $request->card_id ?? null,
                'method_payment_id' => $request->method_payment_id,
                'user_id' => Auth::id(),
            ]);
    
            if ($expense->is_installment) {

                $montos = Helpers::dividirCantidad((float)$expense->amount, (int)$expense->installments_count);

                foreach ($montos as $key => $monto) {
                    $installment = $expense->installment()->create([
                        'amount' => $monto,
                        'due_date' => $expense->expense_date,
                        'is_paid' => 0,
                        'total_paid' => 0
                    ]);

                    $installment->updateStatus();
                }

            }

            $expense->updateStatus();

            DB::commit();
            return ApiResponse::success($expense, 'Gasto registrado exitosamente', 201);

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

            $expense = Expense::forAuthenticatedUser()->find($id);

            if (!$expense) {
                return ApiResponse::error(null, 'Gasto no encontrado', 404);
            }

            return ApiResponse::success($expense, 'Gasto obtenido correctamente');
            
        } catch (\Exception  $e) {
            return ApiResponse::error(null, 'Ocurrió un error al obtener el Gasto', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, $id)
    {
        try {

            $expense = Expense::forAuthenticatedUser()->find($id);

            if (!$expense) {
                return ApiResponse::error(null, 'Gasto no encontrado', 404);
            }

            $request->validate([
                'amount' => 'required|numeric|decimal:0,2|min:0.01',
                'description' => 'nullable|string',
                'expense_date' => 'required|date|date_format:Y-m-d',
                'is_installment' => 'required|boolean',
                'installments_count' => 'nullable|numeric|between:1,100',
                'bank_account_id' => 'nullable|exists:BankAccount,bank_account_id',
                'card_id' => 'nullable|exists:Card,card_id',
                'method_payment_id' => 'required|exists:MethodPayment,method_payment_id',
            ]);
    
            $expense->update(
                $request->only([
                    'amount',
                    'description',
                    'expense_date',
                    'is_installment',
                    'installments_count',
                    'bank_account_id',
                    'card_id',
                    'method_payment_id'
                ])
            );

            if ($expense->is_installment) {


                $expense->installment()->delete();

                $montos = Helpers::dividirCantidad((float)$expense->amount, (int)$expense->installments_count);

                foreach ($montos as $key => $monto) {
                    $installment = $expense->installment()->create([
                        'amount' => $monto,
                        'due_date' => $expense->expense_date,
                        'is_paid' => 0,
                        'total_paid' => 0
                    ]);

                    $installment->updateStatus();
                }

            }

            $expense->updateStatus();
    
            return ApiResponse::success($expense, 'Gasto actualizado exitosamente', 201);

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

            $expense = Expense::forAuthenticatedUser()->find($id);

            if (!$expense) {
                return ApiResponse::error(null, 'Gasto no encontrado', 404);
            }

            $expense->delete();
    
            return ApiResponse::success(null, 'Gasto eliminado correctamente', 200);

        } catch (\Exception $e) {
            return ApiResponse::error(null, 'Ocurrió un error al eliminar el Gasto', 500);
        }        
    }
}
