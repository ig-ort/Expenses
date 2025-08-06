'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Progress } from "@src/components/ui/progress"
import { ExpenseCategory } from "@/types/domains/expenses/types/expense"
import { CategoryStats } from "@/types/domains/dashboard/types/statistics"

interface ExpensesByCategoryChartProps {
  categoryStats: CategoryStats[]
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

const getCategoryColors = () => {
  return [
    '#FF6B6B', // Food - Red
    '#4ECDC4', // Transportation - Teal  
    '#45B7D1', // Entertainment - Blue
    '#96CEB4', // Shopping - Mint
    '#FECA57', // Health - Yellow
    '#FF9FF3', // Education - Pink
    '#54A0FF', // Bills - Light Blue
    '#5F27CD', // Other - Purple
  ]
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

export function ExpensesByCategoryChart({ categoryStats }: ExpensesByCategoryChartProps) {
  if (categoryStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución de tus gastos por categorías</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No hay datos para mostrar</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const colors = getCategoryColors()
  const maxAmount = Math.max(...categoryStats.map(stat => stat.total_amount))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoría</CardTitle>
        <CardDescription>Distribución de tus gastos por categorías</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categoryStats.map((stat, index) => (
            <div key={stat.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm font-medium">
                    {getCategoryLabel(stat.category)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">
                    {stat.expense_count} gastos
                  </span>
                  <span className="font-bold min-w-[100px] text-right">
                    {formatCurrency(stat.total_amount)}
                  </span>
                  <span className="text-muted-foreground min-w-[50px] text-right">
                    {stat.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={stat.percentage} 
                className="h-2"
                style={{ 
                  '--progress-foreground': colors[index % colors.length] 
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
