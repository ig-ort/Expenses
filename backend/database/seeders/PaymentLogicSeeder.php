<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaymentLogic;

class PaymentLogicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentLogics = [
            [
                'payment_logic_id' => '1',
                'name' => 'Efectivo',
                'description' => 'Pago en efectivo',
            ],
            [
                'payment_logic_id' => '2',
                'name' => 'Transferencia Bancaria',
                'description' => 'Pago con transferencia bancaria',
            ],
            [
                'payment_logic_id' => '3',
                'name' => 'Tarjeta de Débito',
                'description' => 'Pago con tarjeta de débito',
            ],
            [
                'payment_logic_id' => '4',
                'name' => 'Tarjeta de Crédito',
                'description' => 'Pago con tarjeta de crédito',
            ],
        ];

        foreach ($paymentLogics as $paymentLogic) {
            PaymentLogic::firstOrCreate($paymentLogic);
        }
    }
}
