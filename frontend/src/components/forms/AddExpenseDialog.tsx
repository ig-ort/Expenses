'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, CalendarIcon } from 'lucide-react'

import { Button } from '@src/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@src/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@src/components/ui/form'
import { Input } from '@src/components/ui/input'
import { Textarea } from '@src/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@src/components/ui/select'
import { Calendar as CalendarComponent } from '@src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/popover'
import { Switch } from '@src/components/ui/switch'
import { Separator } from '@src/components/ui/separator'

import { ExpenseCategory } from '@/types/domains/expenses/types/expense'
import { CreateExpenseForm } from '@/types/forms'
import { cn } from '@src/lib/utils'
import { createExpenseAction } from '@/actions/expense-actions'
import { getPaymentMethodsAction } from '@/actions/payment-method-actions'
import { MethodPayment } from '@/types/domains/methodpayment/types/methodpayment'
import { toast } from 'sonner'

const formSchema = z.object({
  amount: z.string().min(1, 'El monto es requerido'),
  description: z.string().optional(),
  expense_date: z.string().min(1, 'La fecha es requerida'),
  category: z.nativeEnum(ExpenseCategory, {
    errorMap: () => ({ message: 'Selecciona una categoría' })
  }),
  method_payment_id: z.string().min(1, 'Selecciona un método de pago'),
  location: z.string().optional(),
  is_recurring: z.boolean().default(false),
  recurring_frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
})

interface AddExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateExpenseForm) => void
  onExpenseAdded?: () => void // Callback para refrescar datos
}

const getCategoryOptions = () => [
  { value: ExpenseCategory.FOOD, label: 'Alimentación', icon: '🍽️' },
  { value: ExpenseCategory.TRANSPORTATION, label: 'Transporte', icon: '🚗' },
  { value: ExpenseCategory.ENTERTAINMENT, label: 'Entretenimiento', icon: '🎬' },
  { value: ExpenseCategory.SHOPPING, label: 'Compras', icon: '🛍️' },
  { value: ExpenseCategory.HEALTH, label: 'Salud', icon: '🏥' },
  { value: ExpenseCategory.EDUCATION, label: 'Educación', icon: '📚' },
  { value: ExpenseCategory.BILLS, label: 'Facturas', icon: '💡' },
  { value: ExpenseCategory.OTHER, label: 'Otros', icon: '📦' },
]

const getRecurringOptions = () => [
  { value: 'daily', label: 'Diario' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'yearly', label: 'Anual' },
]

export function AddExpenseDialog({ open, onOpenChange, onSubmit, onExpenseAdded }: AddExpenseDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<MethodPayment[]>([])
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      description: '',
      expense_date: format(new Date(), 'yyyy-MM-dd'),
      category: ExpenseCategory.OTHER,
      method_payment_id: '',
      location: '',
      is_recurring: false,
    }
  })

  const isRecurring = form.watch('is_recurring')

  // Cargar métodos de pago al abrir el modal
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        setIsLoadingPaymentMethods(true)
        const result = await getPaymentMethodsAction()
        if (result.success && result.data) {
          setPaymentMethods(result.data)
        } else {
          console.error('Error al cargar métodos de pago:', result.error)
          toast.error(result.error || 'Error al cargar métodos de pago')
        }
      } catch (error) {
        console.error('Error al cargar métodos de pago:', error)
        toast.error('Error al cargar métodos de pago')
      } finally {
        setIsLoadingPaymentMethods(false)
      }
    }

    if (open) {
      loadPaymentMethods()
    }
  }, [open])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const formData = {
        ...values,
        tags: [], // Por ahora vacío
        // Agregar campos requeridos por la API de Laravel
        is_installment: false,
        installments_count: undefined,
        bank_account_id: undefined,
        card_id: undefined,
      } as CreateExpenseForm

      if (onSubmit) {
        // Si se proporciona onSubmit personalizado, usarlo
        await onSubmit(formData)
      } else {
        // Usar Server Action directamente
        const result = await createExpenseAction(formData)
        if (result.success) {
          toast.success(result.message || 'Gasto añadido correctamente')
          if (onExpenseAdded) {
            onExpenseAdded()
          }
        } else {
          throw new Error(result.error || 'Error en la respuesta de la API')
        }
      }

      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error al crear gasto:', error)
      toast.error(error instanceof Error ? error.message : 'Error al añadir el gasto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Gasto</DialogTitle>
          <DialogDescription>
            Registra un nuevo gasto en tu lista personal
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Monto */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="350.00"
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe tu gasto (opcional)"
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha */}
            <FormField
              control={form.control}
              name="expense_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP', { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoría y Método de Pago en la misma fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getCategoryOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <span>{option.icon}</span>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method_payment_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Pago *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingPaymentMethods ? "Cargando..." : "Selecciona método"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingPaymentMethods ? (
                          <SelectItem value="loading" disabled>
                            Cargando métodos de pago...
                          </SelectItem>
                        ) : (
                          paymentMethods
                            .filter(method => method.is_active === 1 || method.is_active === true)
                            .map((method) => (
                              <SelectItem key={method.method_payment_id} value={method.method_payment_id}>
                                <div className="flex items-center space-x-2">
                                  <span>{method.icon || '💳'}</span>
                                  <span>{method.name}</span>
                                </div>
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ubicación */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ej: Supermercado, Restaurante, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Gasto recurrente */}
            <FormField
              control={form.control}
              name="is_recurring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Gasto Recurrente</FormLabel>
                    <FormDescription>
                      ¿Este gasto se repite periódicamente?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Frecuencia (solo si es recurrente) */}
            {isRecurring && (
              <FormField
                control={form.control}
                name="recurring_frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frecuencia</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona frecuencia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getRecurringOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar Gasto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
