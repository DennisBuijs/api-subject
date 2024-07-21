import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, delay, finalize, map } from "rxjs";

export class ApiSubject<T> extends BehaviorSubject<ApiResponse<T>> {
    private endpoints: Map<string, Endpoint> = new Map([
        [
            "GET_CUSTOMERS",
            {
                url: "http://localhost:3344/customers",
                method: "GET",
            },
        ],
    ]);

    private http: HttpClient;

    constructor(private readonly endpointId: string) {
        super({ state: "LOADING", body: undefined });
        this.http = inject(HttpClient);

        this.initialize(endpointId);
    }

    private initialize(endpointId: string): void {
        this.next({
            state: "LOADING",
            body: undefined,
        });

        const endpoint = this.endpoints.get(endpointId);

        if (!endpoint) {
            this.next({
                state: "ERROR",
                body: undefined,
            });

            return;
        }

        this.http.get<T>(endpoint.url).subscribe({
            next: (response) => {
                this.next({
                    state: this.getState(response),
                    body: response,
                });
            },
            error: () => {
                this.next({
                    state: "ERROR",
                    body: undefined,
                });
            },
        });
    }

    private getState(response: T): any {
        if (Array.isArray(response) && response.length === 0) {
            return "EMPTY";
        }

        return "COMPLETE";
    }
}

export type ApiResponse<T> = {
    state: "LOADING" | "EMPTY" | "COMPLETE" | "ERROR";
    body: T | undefined;
};

export type Endpoint = {
    url: string;
    method: "GET" | "POST";
};
