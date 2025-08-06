<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class Installment extends Model
{
    
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory, HasUlids, Filterable;

    protected $table = 'Installment';
    protected $primaryKey = 'installment_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'expense_id',
        'amount',
        'due_date',
        'is_paid',
        'total_paid'
    ];

    // Una mensualidad pertenece a un gasto
    public function expenses(): BelongsTo
    {
        return $this->belongsTo(Expense::class, 'expense_id');
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
