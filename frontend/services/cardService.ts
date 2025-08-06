import {
    GetAllDataProps,
    Query,
    SearchParams,
    Card
} from "@/types";
import qs from "qs";
import { getPaginatedData, saveData, updateData } from "@/lib/fetch-data";
import { getData } from "@/lib/data-fetching";

const formCardsApiQuery = (searchParams: SearchParams) => {
    const query: Query = {
        page: searchParams.page || "1",
    };

    return qs.stringify(query, {
        encodeValuesOnly: true,
    });
};

const formCard = (bank: Card) => {

    const query: Card = {
        card_id: bank.card_id,
        name: bank.name,
        last_four_digits: bank.last_four_digits,
        expiration_date: bank.expiration_date,
        credit_limit: bank.credit_limit?.replaceAll(",","") || "",
        cutoff_day: Number(bank.cutoff_day).toString() || "",
        payment_day: Number(bank.payment_day).toString() || "",
        payment_due_days: Number(bank.payment_due_days).toString() || "",
        bank_account_id: bank.bank_account_id,
        card_type_id: bank.card_type_id,
    };

    return query;
}

const getCardById = async ( card_id : String) => {

    return await getData<Card[]>(`/card/${card_id}`);
};

const getAllCards = async ({ searchParams }: GetAllDataProps) => {
    const query = formCardsApiQuery(searchParams);

    return await getPaginatedData<Card[]>(`/cards?${query}`);
};

const storeCard = async ({ card }: { card: Card }) => {
    
    const data = formCard(card);

    return await saveData<Card>(`/card`, data);
};

const updateCard = async ({ card }: { card: Card }) => {
    
    const data = formCard(card);

    return await updateData<Card>(`/card/${data.card_id}`, data);
};

export { getAllCards, storeCard, updateCard, getCardById };