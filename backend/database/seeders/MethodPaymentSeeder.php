<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MethodPayment;

class MethodPaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methodPayments = [
            [
                'name' => 'Efectivo',
                'description' => 'Pago en efectivo',
                'is_active' => '1',
                'image' => 'cash.png',
                'icon' => 'cash.png',
                'order' => '1',
                'payment_logic_id' => '1',
            ],
            [
                'name' => 'Transferencia Bancaria',
                'description' => 'Pago con transferencia bancaria',
                'is_active' => '1',
                'image' => 'bank-transfer.png',
                'icon' => 'bank-transfer.png',
                'order' => '2',
                'payment_logic_id' => '2',
            ],
            [
                'name' => 'Tarjeta de Débito',
                'description' => 'Pago con tarjeta de débito',
                'is_active' => '1',
                'image' => 'credit-card.png',
                'icon' => 'credit-card.png',
                'order' => '3',
                'payment_logic_id' => '3',
            ],
            [
                'name' => 'Tarjeta de Crédito',
                'description' => 'Pago con tarjeta de crédito',
                'is_active' => '1',
                'image' => 'debit-card.png',
                'icon' => 'debit-card.png',
                'order' => '4',
                'payment_logic_id' => '4',
            ],
        ];

        foreach ($methodPayments as $methodPayment) {
            MethodPayment::firstOrCreate($methodPayment);
        }
    }
}
