<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class Card extends Model
{
    /** @use HasFactory<\Database\Factories\CardFactory> */
    use HasFactory, HasUlids, Filterable;

    protected $table = 'Card';
    protected $primaryKey = 'card_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'bank_account_id',
        'card_type_id',
        'name',
        'last_four_digits',
        'expiration_date',
        'credit_limit',
        'cutoff_day',
        'payment_day',
        'payment_due_days',
        'deleted_at',
    ];

    // Una tarjeta pertenece a un usuario
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'id');
    }

    // Una tarjeta pertenece a una cuenta bancaria
    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class,'bank_account_id');
    }

    // Una tarjeta pertenece a una cuenta bancaria
    public function cardType(): BelongsTo
    {
        return $this->belongsTo(CardType::class,'card_type_id');
    }

    // Scope to get bank accounts of the authenticated user
    public function scopeForAuthenticatedUser(Builder $query): Builder
    {
        return $query->where('user_id', auth()->id());
    }
}
