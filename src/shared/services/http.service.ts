import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Globals } from "../global-constants";
import { User } from "../interfaces";


@Injectable({
    providedIn: 'root',
})
export class HttpService {
    headers = new HttpHeaders({
        'X-GitHub-Api-Version': '2022-11-28'
    });

    constructor(
        private http: HttpClient
    ) { }

    getUsers(name: string) {
        return this.http.get<User>(`${Globals.GITHUB_URL}/users/${name}`, {
            headers: this.headers
        });
    }

}