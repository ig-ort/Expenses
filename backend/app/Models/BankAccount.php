<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class BankAccount extends Model
{
    /** @use HasFactory<\Database\Factories\BankAccountFactory> */
    use HasFactory, HasUlids, Filterable;

    protected $table = 'BankAccount';
    protected $primaryKey = 'bank_account_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'clabe',
        'account_number',
        'icon',
        'description',
        'is_active',
        'bank_id',
        'deleted_at',
    ];

    // Una cuenta bancaria pertenece a un banco
    public function bank(): BelongsTo
    {
        return $this->belongsTo(Bank::class,'bank_id');
    }

    // Scope to get bank accounts of the authenticated user
    public function scopeForAuthenticatedUser(Builder $query): Builder
    {
        return $query->whereHas('bank', function ($q) {
            $q->where('user_id', auth()->id()); // Filter by the authenticated user's ID
        });
    }

}
