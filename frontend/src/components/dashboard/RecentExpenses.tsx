'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { Expense, ExpenseCategory } from "@/types/domains/expenses/types/expense"
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatCurrency } from "@/lib/locale-config"

interface RecentExpensesProps {
  expenses: Expense[]
  onViewExpense?: (expense: Expense) => void
  onEditExpense?: (expense: Expense) => void
  onDeleteExpense?: (expense: Expense) => void
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

const getCategoryColor = (category: ExpenseCategory) => {
  const colors = {
    [ExpenseCategory.FOOD]: 'bg-red-100 text-red-800 hover:bg-red-100',
    [ExpenseCategory.TRANSPORTATION]: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    [ExpenseCategory.ENTERTAINMENT]: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    [ExpenseCategory.SHOPPING]: 'bg-pink-100 text-pink-800 hover:bg-pink-100',
    [ExpenseCategory.HEALTH]: 'bg-green-100 text-green-800 hover:bg-green-100',
    [ExpenseCategory.EDUCATION]: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    [ExpenseCategory.BILLS]: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
    [ExpenseCategory.OTHER]: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  }
  return colors[category] || colors[ExpenseCategory.OTHER]
}

export function RecentExpenses({ 
  expenses, 
  onViewExpense, 
  onEditExpense, 
  onDeleteExpense 
}: RecentExpensesProps) {
  
  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos Recientes</CardTitle>
          <CardDescription>Tus últimos gastos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tienes gastos recientes</h3>
            <p className="text-muted-foreground mb-4">Empieza registrando tu primer gasto</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos Recientes</CardTitle>
        <CardDescription>Tus últimos {expenses.length} gastos registrados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.expense_id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors space-y-3 sm:space-y-0"
            >
              {/* Contenido principal */}
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="text-xl sm:text-2xl flex-shrink-0">
                  {getCategoryIcon(expense.category)}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <p className="font-medium leading-none truncate">
                      {expense.description || getCategoryLabel(expense.category)}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`${getCategoryColor(expense.category)} text-xs mt-1 sm:mt-0 self-start sm:self-auto`}
                    >
                      {getCategoryLabel(expense.category)}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">
                        {formatDistance(new Date(expense.expense_date), new Date(), {
                          addSuffix: true,
                          locale: es
                        })}
                      </span>
                    </div>
                    {expense.method_payment_name && (
                      <div className="flex items-center space-x-1 sm:ml-2">
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{expense.method_payment_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Monto y acciones */}
              <div className="flex items-center justify-between sm:justify-end sm:space-x-2">
                <div className="text-left sm:text-right">
                  <p className="font-bold text-lg sm:text-xl">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
                
                <div className="flex space-x-1">
                  {onViewExpense && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewExpense(expense)}
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEditExpense && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditExpense(expense)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDeleteExpense && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteExpense(expense)}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
