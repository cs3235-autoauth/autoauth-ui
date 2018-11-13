import { Component, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
declare var Fingerprint2: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

    constructor(private serverService: ServerService) { }

    ngAfterViewInit() {
        Fingerprint2.get(function (components) {
            var values = components.map(function (component) { return component.value })
            var hash = Fingerprint2.x64hash128(values.join(''), 31)
            console.log("");
            console.log();
            console.log("");
            console.log("Your fingerprint hash:", hash);
        })
    }

    loginBtn() {
        console.log("=== Login button pressed ===");

        let data = {
            fingerprint: "1234"
        };
        this.serverService.storeFingerprint(data)
            .subscribe(
                (response: any) => {
                    console.log(response.data);
                },
                (error) => console.log(error)
            );
    }

}
