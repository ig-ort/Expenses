<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory, HasUlids, Filterable;

    protected $table = 'Expense';
    protected $primaryKey = 'expense_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'amount',
        'description',
        'method_payment_id',
        'card_id',
        'bank_account_id',
        'expense_date',
        'is_installment',
        'expense_status_id',
        'installments_count',
        'is_paid',
        'total_paid',
    ];

    // Un gasto pertenece a un usuario
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'id');
    }

    // Un gasto pertenece a una cuenta bancaria
    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class,'bank_account_id');
    }

    // Un gasto pertenece a una cuenta bancaria
    public function methodPayment(): BelongsTo
    {
        return $this->belongsTo(MethodPayment::class,'method_payment_id');
    }

    // Un gasto pertenece a una cuenta bancaria
    public function installment(): HasMany
    {
        return $this->hasMany(Installment::class,'expense_id');
    }

    // Un gasto pertenece a una cuenta bancaria
    public function card(): BelongsTo
    {
        return $this->belongsTo(Card::class,'card_id');
    }

    // Scope to get bank accounts of the authenticated user
    public function scopeForAuthenticatedUser(Builder $query): Builder
    {
        return $query->where('user_id', auth()->id());
    }

    public function updateStatus()
    {
        if ($this->total_paid >= $this->amount) {
            $this->expense_status_id = 3;// 'paid';
            $this->is_paid = true;
        } elseif ($this->total_paid > 0) {
            $this->expense_status_id = 2;// 'partial';
            $this->is_paid = false;
        } else {
            $this->expense_status_id = 1;// 'pending';
            $this->is_paid = false;
        }
        
        $this->save();
    }
}
