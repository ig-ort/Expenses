import {
    GetAllDataProps,
    Query,
    SearchParams,
    Bank
} from "@/types";
import qs from "qs";
import { getPaginatedData, saveData, updateData } from "@/lib/fetch-data";
import { getData } from "@/lib/data-fetching";

const formBanksApiQuery = (searchParams: SearchParams) => {
    const query: Query = {
        page: searchParams.page || "1",
    };

    return qs.stringify(query, {
        encodeValuesOnly: true,
    });
};

const formBank = (bank: Bank) => {

    const query: Bank = {
        bank_id: bank.bank_id,
        name: bank.name,
        code: bank.code,
        description: bank.description,
    };

    return query;
}

const getBankById = async ( bank_id : String) => {

    return await getData<Bank>(`/bank/${bank_id}`);
};

const getAllBanks = async ({ searchParams }: GetAllDataProps) => {
    const query = formBanksApiQuery(searchParams);

    return await getPaginatedData<Bank[]>(`/banks?${query}`);
};

const storeBank = async ({ bank }: { bank: Bank }) => {
    
    const data = formBank(bank);

    return await saveData<Bank>(`/bank`, data);
};

const updateBank = async ({ bank }: { bank: Bank }) => {
    
    const data = formBank(bank);

    return await updateData<Bank>(`/bank/${data.bank_id}`, data);
};

export { getAllBanks, storeBank, updateBank, getBankById };