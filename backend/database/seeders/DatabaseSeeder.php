<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CardTypeSeeder;
use Database\Seeders\ExpenseStatusSeeder;
use Database\Seeders\PaymentLogicSeeder;
use Database\Seeders\MethodPaymentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(PaymentLogicSeeder::class);
        $this->call(MethodPaymentSeeder::class);
        $this->call(CardTypeSeeder::class);
        $this->call(ExpenseStatusSeeder::class);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
