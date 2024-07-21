import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiSubject } from "./api-subject";
import { Customer } from "./types";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public getCustomers(): ApiSubject<Customer[]> {
    return new ApiSubject<Customer[]>("GET_CUSTOMERS");
  }
}
