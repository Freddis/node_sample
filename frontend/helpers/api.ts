import {Response} from "../types/Response";
// @ts-ignore
import cookie from "cookie-cutter";

// @todo: figure out why public ENV doesn't work
// const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID;
const baseUrl = "http://127.0.0.1:3001"

export function apiPost<T extends Response>(endpoint: string, data: any): Promise<T> {
    return fetchApi<T>(endpoint, data);
}

export function apiGet<T extends Response>(endpoint: string): Promise<T> {
    return fetchApi<T>(endpoint);
}

function fetchApi<T extends Response>(endpoint: string, data?: any): Promise<T> {
    const url = baseUrl + endpoint;

    const options: RequestInit = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };

    if (data) {
        options.body = JSON.stringify(data);
        options.method = "POST"
    }
    const jwtCookie: string = cookie.get("jwt");
    if (jwtCookie) {
        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtCookie,
        }
    }

    return fetch(url, options)
        .then(response => {
            return response.json()
        });
}
