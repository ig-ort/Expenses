<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class MethodPayment extends Model
{
    use HasFactory, HasUlids, Filterable;

    protected $table = 'MethodPayment';
    protected $primaryKey = 'method_payment_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'is_active',
        'image',
        'icon',
        'order',
        'payment_logic_id',
    ];

    public function paymentLogic(): BelongsTo
    {
        return $this->belongsTo(PaymentLogic::class);
    }

    // // Un banco tiene muchas cuentas bancarias
    // public function bankAccounts(): HasMany
    // {
    //     return $this->hasMany(BankAccount::class);
    // }
}
