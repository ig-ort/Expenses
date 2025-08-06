import { ApiResponse, ApiResponseGet, ApiResponsePaginated } from "@/types";
import serverSideRequestsManager from "./auth/server-side-requests-manager";

export const getData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponseGet<T>>({
    url,
    method: "GET",
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }

  return { success: true, result: response.result.data };
};

export const getPaginatedData = async <T extends { data: any; meta: any; links: any }>(url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<T>({
    url,
    method: "GET",
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }

  return { success: true, result: response.result };
};