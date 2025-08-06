import { MethodPayment, PaymentMethodType } from "@/types/domains/methodpayment/types/methodpayment";
import { CreatePaymentMethodForm } from "@/types/forms";
import { getData, saveData, updateData, deleteData } from "@/lib/fetch-data";

const collectionRoute = "payment-methods";
const mutationRoute = "payment-method";

// Obtener todos los métodos de pago
const getAllPaymentMethods = async () => {
    return await getData<MethodPayment[]>(`/${collectionRoute}`);
};

// Obtener métodos de pago activos
const getActivePaymentMethods = async () => {
    return await getData<MethodPayment[]>(`/${collectionRoute}/active`);
};

// Obtener método de pago por ID
const getPaymentMethodById = async (method_id: string) => {
    return await getData<MethodPayment>(`/${mutationRoute}/${method_id}`);
};

// Crear nuevo método de pago
const storePaymentMethod = async ({ paymentMethodForm }: { paymentMethodForm: CreatePaymentMethodForm }) => {
    const data = {
        name: paymentMethodForm.name,
        type: paymentMethodForm.type,
        description: paymentMethodForm.description,
        icon: paymentMethodForm.icon,
        color: paymentMethodForm.color,
        is_active: true,
    };
    
    return await saveData<MethodPayment>(`/${mutationRoute}`, data as any);
};

// Actualizar método de pago
const updatePaymentMethod = async ({ 
    method_id, 
    paymentMethodForm 
}: { 
    method_id: string;
    paymentMethodForm: CreatePaymentMethodForm;
}) => {
    const data = {
        name: paymentMethodForm.name,
        type: paymentMethodForm.type,
        description: paymentMethodForm.description,
        icon: paymentMethodForm.icon,
        color: paymentMethodForm.color,
    };
    
    return await updateData<MethodPayment>(`/${mutationRoute}/${method_id}`, data as any);
};

// Eliminar método de pago
const deletePaymentMethod = async (method_id: string) => {
    return await deleteData(`/${mutationRoute}/${method_id}`);
};

// Obtener métodos de pago predefinidos
const getDefaultPaymentMethods = (): Array<{ 
    value: PaymentMethodType; 
    label: string; 
    icon?: string; 
    color?: string;
}> => {
    return [
        { 
            value: PaymentMethodType.CASH, 
            label: 'Efectivo', 
            icon: '💵', 
            color: '#2ECC71' 
        },
        { 
            value: PaymentMethodType.DEBIT_CARD, 
            label: 'Tarjeta de Débito', 
            icon: '💳', 
            color: '#3498DB' 
        },
        { 
            value: PaymentMethodType.CREDIT_CARD, 
            label: 'Tarjeta de Crédito', 
            icon: '💳', 
            color: '#E74C3C' 
        },
        { 
            value: PaymentMethodType.BANK_TRANSFER, 
            label: 'Transferencia Bancaria', 
            icon: '🏦', 
            color: '#9B59B6' 
        },
        { 
            value: PaymentMethodType.DIGITAL_WALLET, 
            label: 'Billetera Digital', 
            icon: '📱', 
            color: '#F39C12' 
        },
        { 
            value: PaymentMethodType.OTHER, 
            label: 'Otros', 
            icon: '❓', 
            color: '#95A5A6' 
        },
    ];
};

export { 
    getAllPaymentMethods,
    getActivePaymentMethods,
    getPaymentMethodById,
    storePaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    getDefaultPaymentMethods
};
