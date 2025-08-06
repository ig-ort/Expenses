export interface SearchParams {
  [query: string]: string | string[] | undefined;
  page?: string;
  per_page?: string;
  view?: string;
  start_date?: string;
  end_date?: string;
}

export interface SearchParamsProps {
  searchParams: SearchParams;
}
