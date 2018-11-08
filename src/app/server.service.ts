import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServerService {
    server_backend = 'http://localhost:4300';

    constructor(private http: Http) { }

    login(email) {
        return this.http.get(this.server_backend + "/backend/authenticate/" + email)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw('Unable to authenticate user: ' + error); });
    }

    storeFingerprint(fingerprint) {
        return this.http.post(this.server_backend + "/backend/register", fingerprint)
            .map((response: Response) => { return response.json(); })
            .catch((error: Response) => { return Observable.throw('Unable to store fingerprint: ' + error); });
    }
}