import {
    GetAllDataProps,
    Query,
    SearchParams,
    MethodPayment
} from "@/types";
import qs from "qs";
import { getPaginatedData, saveData, updateData } from "@/lib/fetch-data";
import { getData } from "@/lib/data-fetching";

const collectionRoute = "method-payments"; // Revertido para coincidir con la API del backend
const mutationRoute = "method-payment";

const formApiQuery = (searchParams: SearchParams) => {
    const query: Query = {
        page: searchParams.page || "1",
    };

    return qs.stringify(query, {
        encodeValuesOnly: true,
    });
};

const formObject = (expense: MethodPayment) => {

    const query: MethodPayment = {
        method_payment_id: expense.method_payment_id,
        name: expense.name,
        description: expense.description,
        is_active: expense.is_active,
        type: expense.type, // Agregado el campo type que es requerido
        icon: expense.icon,
        color: expense.color, // Cambiado de image a color según la interfaz
        order: expense.order,
        created_at: expense.created_at,
        updated_at: expense.updated_at,
        deleted_at: expense.deleted_at,
    };

    return query;
}

const getMethodPaymentById = async ( method_payment_id : String) => {

    return await getData<MethodPayment[]>(`/${mutationRoute}/${method_payment_id}`);
};

const getAllMethodPayments = async ({ searchParams }: GetAllDataProps) => {
    const query = formApiQuery(searchParams);

    return await getPaginatedData<MethodPayment[]>(`/${collectionRoute}?${query}`);
};

const storeMethodPayment = async ({ expense }: { expense: MethodPayment }) => {
    
    const data = formObject(expense);

    return await saveData<MethodPayment>(`/${mutationRoute}`, data);
};

const updateMethodPayment = async ({ expense }: { expense: MethodPayment }) => {
    
    const data = formObject(expense);

    return await updateData<MethodPayment>(`/${mutationRoute}/${data.method_payment_id}`, data);
};

export { getAllMethodPayments, storeMethodPayment, updateMethodPayment, getMethodPaymentById };