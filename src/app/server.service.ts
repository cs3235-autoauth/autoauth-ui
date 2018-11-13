import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { throwError } from 'rxjs';

@Injectable()
export class ServerService {
    server_backend = 'http://localhost:4300';

    constructor(private http: Http) { }

    login(data) {
        return this.http.post(this.server_backend + "/backend/authenticate/", data)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return throwError(error); })
    }

    storeFingerprint(data) {
        return this.http.post(this.server_backend + "/backend/register", data)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return throwError(error); })
    }
}