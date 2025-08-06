'use client'

import { useState, useEffect } from 'react'
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { PlusCircle, Filter } from "lucide-react"
import { DashboardStats } from "@src/components/dashboard/DashboardStats"
import { RecentExpenses } from "@src/components/dashboard/RecentExpenses"
import { ExpensesByCategoryChart } from "@src/components/dashboard/ExpensesByCategoryChart"
import { AddExpenseDialog } from "@src/components/forms/AddExpenseDialog"
import { Expense, ExpenseCategory } from "@/types/domains/expenses/types/expense"
import { CategoryStats as CategoryStatsType } from "@/types/domains/dashboard/types/statistics"
import { CreateExpenseForm } from "@/types/forms"
import { toast } from "sonner"

// Datos de ejemplo para el desarrollo
const mockExpenses: Expense[] = [
  {
    expense_id: '1',
    amount: 25.50,
    description: 'Almuerzo en restaurante',
    expense_date: '2024-08-05',
    category: ExpenseCategory.FOOD,
    method_payment_id: '1',
    method_payment_name: 'Tarjeta de débito',
    created_at: '2024-08-05T12:30:00Z',
    updated_at: '2024-08-05T12:30:00Z'
  },
  {
    expense_id: '2',
    amount: 12.00,
    description: 'Metro y autobús',
    expense_date: '2024-08-05',
    category: ExpenseCategory.TRANSPORTATION,
    method_payment_id: '2',
    method_payment_name: 'Efectivo',
    created_at: '2024-08-05T08:15:00Z',
    updated_at: '2024-08-05T08:15:00Z'
  },
  {
    expense_id: '3',
    amount: 89.99,
    description: 'Compra semanal supermercado',
    expense_date: '2024-08-04',
    category: ExpenseCategory.SHOPPING,
    method_payment_id: '1',
    method_payment_name: 'Tarjeta de débito',
    created_at: '2024-08-04T18:45:00Z',
    updated_at: '2024-08-04T18:45:00Z'
  },
  {
    expense_id: '4',
    amount: 45.00,
    description: 'Consulta médica',
    expense_date: '2024-08-03',
    category: ExpenseCategory.HEALTH,
    method_payment_id: '1',
    method_payment_name: 'Tarjeta de débito',
    created_at: '2024-08-03T16:00:00Z',
    updated_at: '2024-08-03T16:00:00Z'
  }
]

const mockCategoryStats: CategoryStatsType[] = [
  {
    category: ExpenseCategory.FOOD,
    category_name: 'Alimentación',
    total_amount: 145.50,
    expense_count: 8,
    percentage: 35.2
  },
  {
    category: ExpenseCategory.TRANSPORTATION,
    category_name: 'Transporte',
    total_amount: 78.00,
    expense_count: 12,
    percentage: 18.9
  },
  {
    category: ExpenseCategory.SHOPPING,
    category_name: 'Compras',
    total_amount: 289.99,
    expense_count: 5,
    percentage: 32.1
  },
  {
    category: ExpenseCategory.HEALTH,
    category_name: 'Salud',
    total_amount: 95.00,
    expense_count: 3,
    percentage: 13.8
  }
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categoryStats, setCategoryStats] = useState<CategoryStatsType[]>([])
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  // Simulamos la carga de datos
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simulamos una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setExpenses(mockExpenses)
      setCategoryStats(mockCategoryStats)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleViewExpense = (expense: Expense) => {
    console.log('Ver gasto:', expense)
    // TODO: Implementar modal de vista de gasto
  }

  const handleEditExpense = (expense: Expense) => {
    console.log('Editar gasto:', expense)
    // TODO: Implementar modal de edición de gasto
  }

  const handleDeleteExpense = (expense: Expense) => {
    console.log('Eliminar gasto:', expense)
    // TODO: Implementar confirmación y eliminación de gasto
  }

  const handleAddExpense = () => {
    setIsAddExpenseOpen(true)
  }

  const handleSubmitExpense = async (expenseData: CreateExpenseForm) => {
    try {
      // TODO: Integrar con el servicio real
      console.log('Nuevo gasto:', expenseData)
      
      // Simular la creación del gasto
      const newExpense: Expense = {
        expense_id: Date.now().toString(),
        amount: parseFloat(expenseData.amount),
        description: expenseData.description,
        expense_date: expenseData.expense_date,
        category: expenseData.category,
        method_payment_id: expenseData.method_payment_id,
        method_payment_name: 'Tarjeta de débito', // Mock
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Agregar a la lista de gastos
      setExpenses(prev => [newExpense, ...prev])
      
      toast.success('Gasto registrado exitosamente')
    } catch (error) {
      console.error('Error al registrar gasto:', error)
      toast.error('Error al registrar el gasto')
    }
  }

  // Calcular estadísticas del dashboard
  const totalExpenses = expenses.length
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonthAmount = expenses
    .filter(expense => expense.expense_date.startsWith('2024-08'))
    .reduce((sum, expense) => sum + expense.amount, 0)
  const previousMonthAmount = 320.45 // Mock data
  const monthlyChangePercentage = currentMonthAmount > previousMonthAmount 
    ? ((currentMonthAmount - previousMonthAmount) / previousMonthAmount) * 100
    : ((previousMonthAmount - currentMonthAmount) / previousMonthAmount) * -100
  const averageDailyExpense = totalAmount / 30 // Mock calculation

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de tus gastos personales
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm" onClick={handleAddExpense}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Gasto
          </Button>
        </div>
      </div>

      {/* Estadísticas principales */}
      <DashboardStats
        totalExpenses={totalExpenses}
        totalAmount={totalAmount}
        currentMonthAmount={currentMonthAmount}
        previousMonthAmount={previousMonthAmount}
        monthlyChangePercentage={monthlyChangePercentage}
        averageDailyExpense={averageDailyExpense}
      />

      {/* Grid de contenido */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gastos recientes */}
        <div className="lg:col-span-2">
          <RecentExpenses
            expenses={expenses}
            onViewExpense={handleViewExpense}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>

        {/* Gráfico por categorías */}
        <div className="lg:col-span-1">
          <ExpensesByCategoryChart categoryStats={categoryStats} />
        </div>
      </div>

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Gestiona tus gastos de forma eficiente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <PlusCircle className="h-6 w-6" />
              <span>Nuevo Gasto</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Filter className="h-6 w-6" />
              <span>Ver Todos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Estadísticas</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Configurar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal para agregar gastos */}
      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onSubmit={handleSubmitExpense}
      />
    </div>
  )
}
