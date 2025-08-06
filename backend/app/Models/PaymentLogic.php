<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class PaymentLogic extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentLogicFactory> */
    use HasFactory;
    
    protected $table = 'PaymentLogic';
    protected $primaryKey = 'payment_logic_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
    ];

    public function methodPayments(): HasMany
    {
        return $this->hasMany(MethodPayment::class);
    }
}
