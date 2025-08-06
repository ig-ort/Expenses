import {
    GetAllDataProps,
    Query,
    SearchParams,
} from "@/types";
import { Expense } from "@/types/domains/expenses/types/expense";
import { CreateExpenseForm, EditExpenseForm, ExpenseFiltersForm } from "@/types/forms";
import { CreateExpenseRequest, UpdateExpenseRequest } from "@/types/api";
import qs from "qs";
import { getPaginatedData, saveData, updateData, deleteData } from "@/lib/fetch-data";
import { getData } from "@/lib/data-fetching";

const collectionRoute = "expenses"; // Corregido de "espenses"
const mutationRoute = "expense"; // Corregido de "espense"

// Formar query para búsquedas y filtros
const formApiQuery = (searchParams: SearchParams, filters?: ExpenseFiltersForm) => {
    const query: Query = {
        page: searchParams.page || "1",
        per_page: searchParams.per_page || "10",
        ...filters && {
            date_from: filters.date_from,
            date_to: filters.date_to,
            categories: filters.categories?.join(','),
            payment_methods: filters.payment_methods?.join(','),
            min_amount: filters.min_amount,
            max_amount: filters.max_amount,
            search: filters.search,
        }
    };

    // Filtrar valores undefined/null
    Object.keys(query).forEach(key => {
        if (query[key] === undefined || query[key] === null || query[key] === '') {
            delete query[key];
        }
    });

    return qs.stringify(query, {
        encodeValuesOnly: true,
    });
};

// Formar objeto para crear gasto desde formulario
const formCreateObject = (expenseForm: CreateExpenseForm): CreateExpenseRequest => {
    const expense: CreateExpenseRequest = {
        amount: parseFloat(expenseForm.amount),
        description: expenseForm.description,
        expense_date: expenseForm.expense_date,
        category: expenseForm.category,
        method_payment_id: expenseForm.method_payment_id,
        tags: expenseForm.tags?.join(','),
        location: expenseForm.location,
        is_recurring: expenseForm.is_recurring || false,
        recurring_frequency: expenseForm.recurring_frequency,
    };

    return expense;
};

// Formar objeto para actualizar gasto
const formUpdateObject = (expenseForm: EditExpenseForm): UpdateExpenseRequest => {
    const expense: UpdateExpenseRequest = {
        expense_id: expenseForm.expense_id,
        amount: parseFloat(expenseForm.amount),
        description: expenseForm.description,
        expense_date: expenseForm.expense_date,
        category: expenseForm.category,
        method_payment_id: expenseForm.method_payment_id,
        tags: expenseForm.tags?.join(','),
        location: expenseForm.location,
        is_recurring: expenseForm.is_recurring || false,
        recurring_frequency: expenseForm.recurring_frequency,
    };

    return expense;
};

// === FUNCIONES PRINCIPALES ===

// Obtener gasto por ID
const getExpenseById = async (expense_id: string) => {
    return await getData<Expense>(`/${mutationRoute}/${expense_id}`);
};

// Obtener todos los gastos con filtros
const getAllExpenses = async ({ searchParams, filters }: GetAllDataProps & { filters?: ExpenseFiltersForm }) => {
    const query = formApiQuery(searchParams, filters);
    return await getPaginatedData<Expense[]>(`/${collectionRoute}?${query}`);
};

// Crear nuevo gasto
const storeExpense = async ({ expenseForm }: { expenseForm: CreateExpenseForm }) => {
    const data = formCreateObject(expenseForm);
    return await saveData<Expense>(`/${mutationRoute}`, data as any); // El API devuelve un Expense completo
};

// Actualizar gasto existente
const updateExpense = async ({ expenseForm }: { expenseForm: EditExpenseForm }) => {
    const data = formUpdateObject(expenseForm);
    return await updateData<Expense>(`/${mutationRoute}/${data.expense_id}`, data as any);
};

// Eliminar gasto
const deleteExpense = async (expense_id: string) => {
    return await deleteData(`/${mutationRoute}/${expense_id}`);
};

// === FUNCIONES PARA DASHBOARD Y ESTADÍSTICAS ===

// Obtener datos del dashboard
const getDashboardData = async (filters?: ExpenseFiltersForm) => {
    const query = filters ? qs.stringify(filters, { encodeValuesOnly: true }) : '';
    return await getData<any>(`/dashboard?${query}`); // Temporal: usamos any hasta definir los tipos correctos
};

// Obtener estadísticas mensuales
const getMonthlyStats = async (year: number, month?: number) => {
    const params = { year, ...(month && { month }) };
    const query = qs.stringify(params, { encodeValuesOnly: true });
    return await getData<any[]>(`/expenses/monthly-stats?${query}`); // Temporal: usamos any
};

// Obtener gastos recientes
const getRecentExpenses = async (limit: number = 5) => {
    return await getData<Expense[]>(`/expenses/recent?limit=${limit}`);
};

// Obtener gastos por categoría
const getExpensesByCategory = async (category: string, filters?: ExpenseFiltersForm) => {
    const params = { category, ...filters };
    const query = qs.stringify(params, { encodeValuesOnly: true });
    return await getData<Expense[]>(`/expenses/by-category?${query}`);
};

// Exportar todas las funciones
export { 
    // Funciones básicas CRUD
    getAllExpenses, 
    getExpenseById,
    storeExpense, 
    updateExpense, 
    deleteExpense,
    
    // Funciones de dashboard y estadísticas
    getDashboardData,
    getMonthlyStats,
    getRecentExpenses,
    getExpensesByCategory
};