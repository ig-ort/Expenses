<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use App\Models\BankAccount;
use App\Traits\Filterable;

/**
 * 
 *
 * @property string $bank_id
 * @property string $name
 * @property string $code
 * @property string|null $icon
 * @property string|null $description
 * @property int $is_active
 * @property int $user_id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\BankFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereBankId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Bank whereUserId($value)
 * @mixin \Eloquent
 */
class Bank extends Model
{
    /** @use HasFactory<\Database\Factories\BankFactory> */
    use HasFactory, HasUlids, Filterable;

    protected $table = 'Bank';
    protected $primaryKey = 'bank_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'icon',
        'description',
        'is_active',
        'user_id',
        'deleted_at',
    ];

    // Un banco pertenece a un usuario
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Un banco tiene muchas cuentas bancarias
    public function bankAccounts(): HasMany
    {
        return $this->hasMany(BankAccount::class);
    }
}
