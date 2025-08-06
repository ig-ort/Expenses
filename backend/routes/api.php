<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\MethodPaymentController;
use App\Http\Controllers\CardTypeController;
use App\Http\Controllers\ExpenseController;

Route::get('/', function () {
    return view('welcome');
});

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/weblogin', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', function (Request $request) {
    return App\Models\User::all();
});

// Public routes for development (remove auth middleware temporarily)
// Route::middleware('auth:sanctum')->group(function () {
    // Bank routes
    Route::get('/banks', [BankController::class, 'index']);
    Route::post('/bank', [BankController::class, 'store']);
    Route::get('/bank/{id}', [BankController::class, 'show']);
    Route::put('/bank/{id}', [BankController::class, 'update']);
    Route::delete('/bank/{id}', [BankController::class, 'destroy']);
    
    // Bank Account routes
    Route::get('/bank-accounts', [BankAccountController::class, 'index']);
    Route::post('/bank-account', [BankAccountController::class, 'store']);
    Route::get('/bank-account/{id}', [BankAccountController::class, 'show']);
    Route::put('/bank-account/{id}', [BankAccountController::class, 'update']);
    Route::delete('/bank-account/{id}', [BankAccountController::class, 'destroy']);
    
    // Card routes
    Route::get('/cards', [CardController::class, 'index']);
    Route::post('/card', [CardController::class, 'store']);
    Route::get('/card/{id}', [CardController::class, 'show']);
    Route::put('/card/{id}', [CardController::class, 'update']);
    Route::delete('/card/{id}', [CardController::class, 'destroy']);
    
    // Expense routes (corrected spelling)
    Route::get('/expenses', [ExpenseController::class, 'index']);
    Route::post('/expense', [ExpenseController::class, 'store']);
    Route::get('/expense/{id}', [ExpenseController::class, 'show']);
    Route::put('/expense/{id}', [ExpenseController::class, 'update']);
    Route::delete('/expense/{id}', [ExpenseController::class, 'destroy']);
    
    // Card Type routes
    Route::get('/card-types', [CardTypeController::class, 'index']);
    
    // Method Payment routes
    Route::get('/method-payments', [MethodPaymentController::class, 'index']);
// });
