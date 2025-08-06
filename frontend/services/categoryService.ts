import { Category } from "@/types/domains/categories/types/category";
import { ExpenseCategory } from "@/types/domains/expenses/types/expense";
import { CreateCategoryForm } from "@/types/forms";
import { getData, saveData, updateData, deleteData } from "@/lib/fetch-data";

const collectionRoute = "categories";
const mutationRoute = "category";

// Obtener todas las categorías
const getAllCategories = async () => {
    return await getData<Category[]>(`/${collectionRoute}`);
};

// Obtener categorías activas solamente
const getActiveCategories = async () => {
    return await getData<Category[]>(`/${collectionRoute}/active`);
};

// Obtener categoría por ID
const getCategoryById = async (category_id: string) => {
    return await getData<Category>(`/${mutationRoute}/${category_id}`);
};

// Crear nueva categoría personalizada
const storeCategory = async ({ categoryForm }: { categoryForm: CreateCategoryForm }) => {
    const data = {
        name: categoryForm.name,
        description: categoryForm.description,
        color: categoryForm.color,
        icon: categoryForm.icon,
        is_active: true,
    };
    
    return await saveData<Category>(`/${mutationRoute}`, data as any);
};

// Actualizar categoría
const updateCategory = async ({ 
    category_id, 
    categoryForm 
}: { 
    category_id: string;
    categoryForm: CreateCategoryForm;
}) => {
    const data = {
        name: categoryForm.name,
        description: categoryForm.description,
        color: categoryForm.color,
        icon: categoryForm.icon,
    };
    
    return await updateData<Category>(`/${mutationRoute}/${category_id}`, data as any);
};

// Eliminar categoría
const deleteCategory = async (category_id: string) => {
    return await deleteData(`/${mutationRoute}/${category_id}`);
};

// Obtener categorías predefinidas (enum)
const getDefaultCategories = (): Array<{ value: ExpenseCategory; label: string; icon?: string; color?: string }> => {
    return [
        { 
            value: ExpenseCategory.FOOD, 
            label: 'Alimentación', 
            icon: '🍽️', 
            color: '#FF6B6B' 
        },
        { 
            value: ExpenseCategory.TRANSPORTATION, 
            label: 'Transporte', 
            icon: '🚗', 
            color: '#4ECDC4' 
        },
        { 
            value: ExpenseCategory.ENTERTAINMENT, 
            label: 'Entretenimiento', 
            icon: '🎬', 
            color: '#45B7D1' 
        },
        { 
            value: ExpenseCategory.SHOPPING, 
            label: 'Compras', 
            icon: '🛍️', 
            color: '#96CEB4' 
        },
        { 
            value: ExpenseCategory.HEALTH, 
            label: 'Salud', 
            icon: '🏥', 
            color: '#FECA57' 
        },
        { 
            value: ExpenseCategory.EDUCATION, 
            label: 'Educación', 
            icon: '📚', 
            color: '#FF9FF3' 
        },
        { 
            value: ExpenseCategory.BILLS, 
            label: 'Facturas', 
            icon: '💡', 
            color: '#54A0FF' 
        },
        { 
            value: ExpenseCategory.OTHER, 
            label: 'Otros', 
            icon: '📦', 
            color: '#5F27CD' 
        },
    ];
};

export { 
    getAllCategories,
    getActiveCategories,
    getCategoryById,
    storeCategory,
    updateCategory,
    deleteCategory,
    getDefaultCategories
};
