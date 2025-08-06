<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use Illuminate\Validation\ValidationException;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Por defecto 10, o 'all' para obtener todos los registros
        $filters = $request->only('filters');
        $sorts = $request->only('sort');

        $query = Card::forAuthenticatedUser();

        $query->with('bankAccount')
            ->with('cardType');

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
        $cards = $query->paginateOrGet($perPage);
 
        // $banks = Card::where('user_id', Auth::id())->get();
        return ApiResponse::success($cards, 'Tajetas obtenidas exitosamente');
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCardRequest $request)
    {
        try {
            
            $request->validate([
                'name' => 'required|string|max:255',
                'last_four_digits' => 'required|string|min:4|max:4',
                'expiration_date' => 'nullable|date',
                'credit_limit' => 'nullable|numeric|decimal:0,2|min:0.01',
                'cutoff_day' => 'nullable|numeric|between:1,31',
                'payment_day' => 'nullable|numeric|between:1,31',
                'payment_due_days' => 'nullable|numeric|between:1,31',
                'bank_account_id' => 'required|exists:BankAccount,bank_account_id',
                'card_type_id' => 'required|exists:CardType,card_type_id',
            ]);

            $card = Card::create([
                'name' => $request->name,
                'last_four_digits' => $request->last_four_digits,
                'expiration_date' => $request->expiration_date ?? null,
                'credit_limit' => $request->account_number ?? null,
                'cutoff_day' => $request->cutoff_day ?? null,
                'payment_day' => $request->payment_day ?? null,
                'payment_due_days' => $request->payment_due_days ?? null,
                'bank_account_id' => $request->bank_account_id,
                'card_type_id' => $request->card_type_id,
                'user_id' => Auth::id(),
            ]);
    
            return ApiResponse::success($card, 'Tarjeta registrada exitosamente', 201);

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

            $card = Card::forAuthenticatedUser()->find($id);

            if (!$card) {
                return ApiResponse::error(null, 'Tarjeta no encontrada', 404);
            }

            return ApiResponse::success($card, 'Tarjeta obtenida correctamente');
            
        } catch (\Exception  $e) {
            return ApiResponse::error(null, 'Ocurrió un error al obtener la Tarjeta', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, $id)
    {
        try {

            $card = Card::forAuthenticatedUser()->find($id);

            if (!$card) {
                return ApiResponse::error(null, 'Tarjeta no encontrada', 404);
            }

            $request->validate([
                'name' => 'required|string|max:255',
                'last_four_digits' => 'required|string|max:4',
                'expiration_date' => 'nullable|date',
                'credit_limit' => 'nullable|numeric|decimal:0,2|min:0.01',
                'cutoff_day' => 'nullable|numeric|between:1,31',
                'payment_day' => 'nullable|numeric|between:1,31',
                'payment_due_days' => 'nullable|numeric|between:1,31',
                'bank_account_id' => 'required|exists:BankAccount,bank_account_id',
                'card_type_id' => 'required|exists:CardType,card_type_id',
            ]);
    
            $card->update($request->all());
    
            return ApiResponse::success($card, 'Tarjeta actualizada exitosamente', 201);

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

            $card = Card::forAuthenticatedUser()->find($id);

            if (!$card) {
                return ApiResponse::error(null, 'Tarjeta no encontrada', 404);
            }

            $card->delete();
    
            return ApiResponse::success(null, 'Tarjeta eliminada correctamente', 200);

        } catch (\Exception $e) {
            return ApiResponse::error(null, 'Ocurrió un error al eliminar la Tarjeta', 500);
        }        
    }
}
