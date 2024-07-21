import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ApiSubject } from "./api-subject";
import { ApiService } from "./api.service";
import { Customer } from "./types";
import { AsyncPipe, JsonPipe } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  public customers$: ApiSubject<Customer[]> = this.api.getCustomers();

  constructor(private readonly api: ApiService) {}
}
