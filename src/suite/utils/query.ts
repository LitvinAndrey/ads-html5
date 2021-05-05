import axios, { AxiosResponse } from 'axios';

interface CustomQuery {
  get?: <T>(url: string) => Promise<AxiosResponse<T>>;
  post?: <T>(url: string, data?: unknown) => Promise<AxiosResponse<T>>;
  put?: <T>(url: string, data?: unknown) => Promise<AxiosResponse<T>>;
  delete?: <T>(url: string) => Promise<AxiosResponse<T>>;
}

export const getQuery = (): CustomQuery => {
  const token = localStorage.getItem('token');
  const config = token
    ? {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    : null;
  return {
    get: <T>(url) => axios.get<T>(url, config),
    post: <T>(url, data) => axios.post<T>(url, data, config),
    put: <T>(url, data) => axios.put<T>(url, data, config),
    delete: <T>(url) => axios.delete<T>(url, config),
  };
};
