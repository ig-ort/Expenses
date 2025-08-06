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
import { getExpensesAction } from "@/actions/expense-actions"

// Datos de ejemplo para el desarrollo (precios en pesos mexicanos)
const mockExpenses: Expense[] = [
  {
    expense_id: '1',
    amount: 350.00,
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
    amount: 45.00,
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
    amount: 1250.00,
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
    amount: 650.00,
    description: 'Consulta médica',
    expense_date: '2024-08-03',
    category: ExpenseCategory.HEALTH,
    method_payment_id: '1',
    method_payment_name: 'Tarjeta de débito',
    created_at: '2024-08-03T16:00:00Z',
    updated_at: '2024-08-03T16:00:00Z'
  },
  {
    expense_id: '5',
    amount: 180.00,
    description: 'Cine con amigos',
    expense_date: '2024-08-02',
    category: ExpenseCategory.ENTERTAINMENT,
    method_payment_id: '1',
    method_payment_name: 'Tarjeta de débito',
    created_at: '2024-08-02T20:00:00Z',
    updated_at: '2024-08-02T20:00:00Z'
  }
]

const mockCategoryStats: CategoryStatsType[] = [
  {
    category: ExpenseCategory.FOOD,
    category_name: 'Alimentación',
    total_amount: 2150.50,
    expense_count: 8,
    percentage: 35.2
  },
  {
    category: ExpenseCategory.TRANSPORTATION,
    category_name: 'Transporte',
    total_amount: 890.00,
    expense_count: 12,
    percentage: 18.9
  },
  {
    category: ExpenseCategory.SHOPPING,
    category_name: 'Compras',
    total_amount: 3250.00,
    expense_count: 5,
    percentage: 25.4
  },
  {
    category: ExpenseCategory.HEALTH,
    category_name: 'Salud',
    total_amount: 1350.00,
    expense_count: 3,
    percentage: 13.8
  },
  {
    category: ExpenseCategory.ENTERTAINMENT,
    category_name: 'Entretenimiento',
    total_amount: 720.00,
    expense_count: 4,
    percentage: 6.7
  }
]

// Función helper para obtener el nombre de la categoría
const getCategoryLabel = (category: ExpenseCategory) => {
  const labels = {
    [ExpenseCategory.FOOD]: 'Alimentación',
    [ExpenseCategory.TRANSPORTATION]: 'Transporte',
    [ExpenseCategory.ENTERTAINMENT]: 'Entretenimiento',
    [ExpenseCategory.SHOPPING]: 'Compras',
    [ExpenseCategory.HEALTH]: 'Salud',
    [ExpenseCategory.EDUCATION]: 'Educación',
    [ExpenseCategory.BILLS]: 'Facturas',
    [ExpenseCategory.OTHER]: 'Otros',
  }
  return labels[category] || 'Otros'
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categoryStats, setCategoryStats] = useState<CategoryStatsType[]>([])
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  // Cargar datos reales de la API usando Server Actions
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Cargar gastos desde la API
        const expensesResult = await getExpensesAction({ per_page: 'all' })
        
        if (expensesResult.success && expensesResult.data) {
          setExpenses(expensesResult.data)
          
          // Calcular estadísticas por categoría basadas en los datos reales
          const categoryStatsMap = new Map<string, { total: number, count: number }>()
          
          expensesResult.data.forEach(expense => {
            const key = expense.category
            const current = categoryStatsMap.get(key) || { total: 0, count: 0 }
            categoryStatsMap.set(key, {
              total: current.total + expense.amount,
              count: current.count + 1
            })
          })
          
          const totalAmount = expensesResult.data.reduce((sum, expense) => sum + expense.amount, 0)
          
          const realCategoryStats: CategoryStatsType[] = Array.from(categoryStatsMap.entries()).map(([category, stats]) => ({
            category: category as ExpenseCategory,
            category_name: getCategoryLabel(category as ExpenseCategory),
            total_amount: stats.total,
            expense_count: stats.count,
            percentage: totalAmount > 0 ? (stats.total / totalAmount) * 100 : 0
          }))
          
          setCategoryStats(realCategoryStats)
        } else {
          console.error('Error al cargar gastos:', expensesResult.error)
          // Fallback a datos mock en caso de error
          setExpenses(mockExpenses)
          setCategoryStats(mockCategoryStats)
          toast.error('Error al cargar datos. Mostrando datos de ejemplo.')
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        // Fallback a datos mock en caso de error
        setExpenses(mockExpenses)
        setCategoryStats(mockCategoryStats)
        toast.error('Error al conectar con la API. Mostrando datos de ejemplo.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Calcular estadísticas del dashboard
  const totalExpenses = expenses.length
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonthAmount = totalAmount // Por simplicidad, asumimos todo es del mes actual
  const previousMonthAmount = totalAmount * 0.85 // Simulamos el mes anterior
  const monthlyChangePercentage = ((currentMonthAmount - previousMonthAmount) / previousMonthAmount) * 100
  const averageDailyExpense = totalAmount / 30 // Aproximado

  const handleAddExpense = async (data: CreateExpenseForm) => {
    try {
      // Aquí llamarías a tu API
      console.log('Añadiendo gasto:', data)
      
      // Simulamos el añadir el gasto
      const newExpense: Expense = {
        expense_id: (expenses.length + 1).toString(),
        amount: parseFloat(data.amount),
        description: data.description || '',
        expense_date: data.expense_date,
        category: data.category,
        method_payment_id: data.method_payment_id,
        method_payment_name: 'Método de pago', // Se obtendría de la API
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setExpenses([...expenses, newExpense])
      setIsAddExpenseOpen(false)
      toast.success('Gasto añadido correctamente')
    } catch (error) {
      toast.error('Error al añadir el gasto')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6">
      {/* Header - Responsive */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard de Gastos</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Resumen de tus gastos y estadísticas financieras
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button onClick={() => setIsAddExpenseOpen(true)} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Gasto
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

      {/* Grid principal - Mejorado para móvil */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Gráfico de categorías */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Gastos por Categoría</CardTitle>
            <CardDescription className="text-sm">
              Distribución de tus gastos por categorías este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpensesByCategoryChart categoryStats={categoryStats} />
          </CardContent>
        </Card>

        {/* Gastos recientes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Gastos Recientes</CardTitle>
            <CardDescription className="text-sm">
              Tus últimos gastos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentExpenses
              expenses={expenses.slice(0, 5)}
              onViewExpense={(expense) => console.log('Ver gasto:', expense)}
              onEditExpense={(expense) => console.log('Editar gasto:', expense)}
              onDeleteExpense={(expense) => console.log('Eliminar gasto:', expense)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Diálogo para añadir gastos - Ahora con API */}
      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onExpenseAdded={() => {
          // Recargar datos cuando se añade un nuevo gasto
          // Por ahora simulamos, luego conectaremos con API real
          console.log('Gasto añadido, recargando datos...')
          toast.success('Gasto añadido correctamente')
        }}
      />
    </div>
  )
}
