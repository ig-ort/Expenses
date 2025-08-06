<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpenseStatus;

class ExpenseStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status = [
            [
                'expense_status_id' => 1,
                'name' => 'Pendiente',
                'description' => 'Pendiente de pago',
            ],
            [
                'expense_status_id' => 2,
                'name' => 'Pagado Parcialmente',
                'description' => 'Pagado Parcialmente',
            ],
            [
                'expense_status_id' => 3,
                'name' => 'Pagado',
                'description' => 'Pagado',
            ]
        ];

        foreach ($status as $expenseStatus) {
            ExpenseStatus::firstOrCreate($expenseStatus);
        }
    }
}
