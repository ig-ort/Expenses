import {
    GetAllDataProps,
    Query,
    SearchParams,
    Bank,
    BankAccount
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

const formBank = (bankAccount: BankAccount) => {

    const query: BankAccount = {
        bank_account_id: bankAccount.bank_account_id,
        bank_id: bankAccount.bank_id,
        name: bankAccount.name,
        code: bankAccount.code,
        clabe: bankAccount.clabe,
        account_number: bankAccount.account_number,
        description: bankAccount.description,
    };

    return query;
}

const getBankAccountById = async ( bank_id : String) => {

    return await getData<BankAccount[]>(`/bank-account/${bank_id}`);
};

const getAllBankAccounts = async ({ searchParams }: GetAllDataProps) => {
    const query = formBanksApiQuery(searchParams);

    return await getPaginatedData<BankAccount[]>(`/bank-accounts?${query}`);
};

const storeBankAccount = async ({ bankAccount }: { bankAccount: BankAccount }) => {
    
    const data = formBank(bankAccount);

    return await saveData<BankAccount>(`/bank-account`, data);
};

const updateBankAccount = async ({ bankAccount }: { bankAccount: BankAccount }) => {
    
    const data = formBank(bankAccount);

    return await updateData<BankAccount>(`/bank-account/${data.bank_account_id}`, data);
};

export { getAllBankAccounts, storeBankAccount, updateBankAccount, getBankAccountById };