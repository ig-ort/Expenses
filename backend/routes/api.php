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
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientProjectNoteController;
use App\Http\Controllers\TimeLogController;
use App\Http\Controllers\TimeLogDetController;
use App\Http\Controllers\ProjectStatusController;

Route::get('/', function () {
    return view('welcome');
});

// Auhentication routes
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

Route::middleware('auth:sanctum')->group(function () {

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

    // Expense routes
    Route::get('/espenses', [ExpenseController::class, 'index']);
    Route::post('/espense', [ExpenseController::class, 'store']);
    Route::get('/espense/{id}', [ExpenseController::class, 'show']);
    Route::put('/espense/{id}', [ExpenseController::class, 'update']);
    Route::delete('/espense/{id}', [ExpenseController::class, 'destroy']);
    
    // Method Payment routes
    Route::get('/card-types', [CardTypeController::class, 'index']);

    // Method Payment routes
    Route::get('/method-payments', [MethodPaymentController::class, 'index']);

    // Client routes
    Route::get('/clients', [ClientController::class, 'index']);
    Route::post('/client', [ClientController::class, 'store']);
    Route::get('/client/{id}', [ClientController::class, 'show']);
    Route::put('/client/{id}', [ClientController::class, 'update']);
    Route::delete('/client/{id}', [ClientController::class, 'destroy']);
    
    // Project routes
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/project', [ProjectController::class, 'store']);
    Route::get('/project/{id}', [ProjectController::class, 'show']);
    Route::put('/project/{id}', [ProjectController::class, 'update']);
    Route::delete('/project/{id}', [ProjectController::class, 'destroy']);

    // Project Note routes
    Route::get('/project-notes', [ClientProjectNoteController::class, 'index']);
    Route::post('/project-note', [ClientProjectNoteController::class, 'store']);
    Route::get('/project-note/{id}', [ClientProjectNoteController::class, 'show']);
    Route::put('/project-note/{id}', [ClientProjectNoteController::class, 'update']);
    Route::delete('/project-note/{id}', [ClientProjectNoteController::class, 'destroy']);
    
    // Additional hierarchical routes for 3-level structure
    Route::get('/project-note/{id}/sub-notes', [ClientProjectNoteController::class, 'getSubNotes']);
    Route::get('/project-note/{id}/structure', [ClientProjectNoteController::class, 'getProjectStructure']);
    Route::get('/project-notes/main-projects', [ClientProjectNoteController::class, 'getMainProjects']);

    // Time Log routes
    Route::get('/time-logs', [TimeLogController::class, 'index']);
    Route::post('/time-log', [TimeLogController::class, 'store']);
    Route::get('/time-log/{id}', [TimeLogController::class, 'show']);
    Route::put('/time-log/{id}', [TimeLogController::class, 'update']);
    Route::delete('/time-log/{id}', [TimeLogController::class, 'destroy']);

    // Time Log Det routes
    Route::get('/time-log-dets', [TimeLogDetController::class, 'index']);
    Route::post('/time-log-det', [TimeLogDetController::class, 'store']);
    Route::get('/time-log-det/{id}', [TimeLogDetController::class, 'show']);
    Route::put('/time-log-det/{id}', [TimeLogDetController::class, 'update']);
    Route::delete('/time-log-det/{id}', [TimeLogDetController::class, 'destroy']);

    // Project Status routes
    Route::get('/project-status', [ProjectStatusController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});