<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Filterable;

class CardType extends Model
{
    /** @use HasFactory<\Database\Factories\CardTypeFactory> */
    use HasFactory, HasUlids, Filterable;
    
    protected $table = 'CardType';
    protected $primaryKey = 'card_type_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'description',
    ];

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }
}
