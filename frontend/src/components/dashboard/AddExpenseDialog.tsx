'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { ExpenseCategory } from '@/types/domains/expenses/types/expense'
import { PaymentMethodType } from '@/types/domains/methodpayment/types/methodpayment'
import { formatCurrency } from '@/lib/locale-config'

interface AddExpenseDialogProps {
  onAddExpense: (expense: {
    amount: number
    description: string
    category: ExpenseCategory
    paymentMethod: PaymentMethodType
    date: Date
    notes?: string
  }) => void
}

export function AddExpenseDialog({ onAddExpense }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ExpenseCategory | ''>('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | ''>('')
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || !description || !category || !paymentMethod) {
      return
    }

    onAddExpense({
      amount: parseFloat(amount),
      description,
      category: category as ExpenseCategory,
      paymentMethod: paymentMethod as PaymentMethodType,
      date,
      notes: notes || undefined
    })

    // Reset form
    setAmount('')
    setDescription('')
    setCategory('')
    setPaymentMethod('')
    setDate(new Date())
    setNotes('')
    setOpen(false)
  }

  const categoryOptions = [
    { value: ExpenseCategory.FOOD, label: 'Alimentación' },
    { value: ExpenseCategory.TRANSPORTATION, label: 'Transporte' },
    { value: ExpenseCategory.ENTERTAINMENT, label: 'Entretenimiento' },
    { value: ExpenseCategory.BILLS, label: 'Servicios' },
    { value: ExpenseCategory.HEALTH, label: 'Salud' },
    { value: ExpenseCategory.SHOPPING, label: 'Compras' },
    { value: ExpenseCategory.EDUCATION, label: 'Educación' },
    { value: ExpenseCategory.OTHER, label: 'Otros' },
  ]

  const paymentMethodOptions = [
    { value: PaymentMethodType.CASH, label: 'Efectivo' },
    { value: PaymentMethodType.CREDIT_CARD, label: 'Tarjeta de Crédito' },
    { value: PaymentMethodType.DEBIT_CARD, label: 'Tarjeta de Débito' },
    { value: PaymentMethodType.BANK_TRANSFER, label: 'Transferencia Bancaria' },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Gasto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto (MXN)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {amount && (
              <p className="text-sm text-muted-foreground">
                {formatCurrency(parseFloat(amount) || 0)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Ej: Comida en restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona método de pago" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas (Opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Información adicional..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Agregar Gasto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
