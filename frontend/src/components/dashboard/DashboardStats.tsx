'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { CalendarDays, DollarSign, PlusCircle, TrendingDown, TrendingUp } from "lucide-react"
import { ExpenseCategory } from "@/types/domains/expenses/types/expense"
import { formatCurrency } from "@/lib/locale-config"

interface DashboardStatsProps {
  totalExpenses: number
  totalAmount: number
  currentMonthAmount: number
  previousMonthAmount: number
  monthlyChangePercentage: number
  averageDailyExpense: number
}

const getCategoryIcon = (category: ExpenseCategory) => {
  const icons = {
    [ExpenseCategory.FOOD]: '🍽️',
    [ExpenseCategory.TRANSPORTATION]: '🚗',
    [ExpenseCategory.ENTERTAINMENT]: '🎬',
    [ExpenseCategory.SHOPPING]: '🛍️',
    [ExpenseCategory.HEALTH]: '🏥',
    [ExpenseCategory.EDUCATION]: '📚',
    [ExpenseCategory.BILLS]: '💡',
    [ExpenseCategory.OTHER]: '📦',
  }
  return icons[category] || '📦'
}

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

export function DashboardStats({
  totalExpenses,
  totalAmount,
  currentMonthAmount,
  previousMonthAmount,
  monthlyChangePercentage,
  averageDailyExpense
}: DashboardStatsProps) {
  const isPositiveChange = monthlyChangePercentage > 0
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total de Gastos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Gastos</CardTitle>
          <PlusCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalExpenses}</div>
          <p className="text-xs text-muted-foreground">
            gastos registrados
          </p>
        </CardContent>
      </Card>

      {/* Total General */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total General</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          <p className="text-xs text-muted-foreground">
            en gastos acumulados
          </p>
        </CardContent>
      </Card>

      {/* Este Mes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(currentMonthAmount)}</div>
          <div className="flex items-center text-xs">
            {isPositiveChange ? (
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
            )}
            <span className={isPositiveChange ? 'text-red-500' : 'text-green-500'}>
              {Math.abs(monthlyChangePercentage)}%
            </span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </CardContent>
      </Card>

      {/* Promedio Diario */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio Diario</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(averageDailyExpense)}</div>
          <p className="text-xs text-muted-foreground">
            gasto promedio por día
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
