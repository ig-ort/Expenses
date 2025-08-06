import {
    GetAllDataProps,
    Query,
    SearchParams,
    Card
} from "@/types";
import qs from "qs";
import { getPaginatedData } from "@/lib/fetch-data";
import { getData } from "@/lib/data-fetching";

const formApiQuery = (searchParams: SearchParams) => {
    const query: Query = {
        page: searchParams.page || "1",
    };

    return qs.stringify(query, {
        encodeValuesOnly: true,
    });
};

const getCardTypeById = async ( card_type_id : String) => {

    return await getData<Card[]>(`/card/${card_type_id}`);
};

const getAllCardTypes = async ({ searchParams }: GetAllDataProps) => {
    const query = formApiQuery(searchParams);

    return await getPaginatedData<Card[]>(`/card-types?${query}`);
};

export { getAllCardTypes, getCardTypeById };