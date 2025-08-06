'use server';

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

export const getPaginatedData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponsePaginated<T>>({
    url,
    method: "GET",
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }
  
  // Return only the data property for consistency with other methods
  return { success: true, result: response.result.data };
};

export const saveData = async <T>(url: string, data: T): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponse<T>>({
    url,
    method: "POST",
    data,
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }

  return response as ApiResponse<T>;
  // return { success: true, result: response.result };
};

export const updateData = async <T>(url: string, data: T): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponse<T>>({
    url,
    method: "PUT",
    data,
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }

  return response as ApiResponse<T>;
  // return { success: true, result: response.result };
};

export const deleteData = async<T> (url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponse<T>>({
    url,
    method: "DELETE",
  });

  if (!response.success) {
    return response as ApiResponse<T>;
  }

  return response as ApiResponse<T>;
  // return { success: true, result: null };
};