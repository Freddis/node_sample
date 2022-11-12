import {Response} from "../types/Response";
// @ts-ignore
import cookie from "cookie-cutter";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function apiPost<T extends Response>(endpoint: string, data: any): Promise<T> {
    return fetchApi<T>(endpoint, data);
}

export function apiGet<T extends Response>(endpoint: string): Promise<T> {
    return fetchApi<T>(endpoint);
}

async function parseErrorMessage(response: globalThis.Response) : Promise<string | null> {
    const json = await response.json().catch( e => e);
    if(json instanceof Error){
        return null;
    }
    const apiResponse = json as Response;
    if(apiResponse.error?.message){
        return apiResponse.error?.message;
    }
    return null;
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
    // It doesn't need necessarily to work this way
    // Maybe we would want to invert checking and treat anything except 200+ status as error
    const badStatuses = [401,403,500];
    return fetch(url, options)
        .then(async response => {
            if(badStatuses.find( el => el === response.status)) {
                let message = "Bad response";
                const parsedMessage = await parseErrorMessage(response);

                if(parsedMessage) {
                    message = parsedMessage;
                }
                throw new Error(message);
            }
            return response.json()
        });
}
