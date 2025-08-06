<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CardType;

class CardTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cardTypes = [
            [
                'name' => 'Crédito',
                'type' => 'credit',
                'description' => 'Tarjeta de Crédito',
            ],
            [
                'name' => 'Débito',
                'type' => 'debit',
                'description' => 'Tarjeta de Débito',
            ]
        ];

        foreach ($cardTypes as $cardType) {
            CardType::firstOrCreate($cardType);
        }
    }
}
