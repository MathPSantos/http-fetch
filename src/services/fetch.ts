import { API_URL, API_HEADERS } from "../constants";
import { objToQueryString } from "./utils";

interface Config extends RequestInit {
  params?: {
    [key: string]: string | number | boolean;
  };
}

async function http<T>(endpoint: string, config: Config): Promise<T> {
  const init = { ...config, headers: API_HEADERS };

  const queryParams = objToQueryString(config?.params);

  const URL = API_URL + endpoint + queryParams;

  const request = new Request(URL, init);
  const response = await fetch(request);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json().catch(() => ({}));
}

export async function get<T>(endpoint: string, config?: Config): Promise<T> {
  const init = { method: "GET", ...config };
  return await http<T>(endpoint, init);
}

export async function post<T, U>(
  endpoint: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "POST", body: JSON.stringify(body), ...config };
  return await http<U>(endpoint, init);
}

export async function put<T, U>(
  endpoint: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "PUT", body: JSON.stringify(body), ...config };
  return await http<U>(endpoint, init);
}

export async function del<U>(
  endpoint: string,
  config?: RequestInit
): Promise<U> {
  const init = { method: "DELETE", ...config };
  return await http<U>(endpoint, init);
}
