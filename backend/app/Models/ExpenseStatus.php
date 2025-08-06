<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class ExpenseStatus extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseStatusFactory> */
    use HasFactory, Filterable;
    
    protected $table = 'ExpenseStatus';
    protected $primaryKey = 'expense_status_id';
    
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    public function expense(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
