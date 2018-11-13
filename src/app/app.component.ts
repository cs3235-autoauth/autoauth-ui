import { Component, AfterViewInit } from '@angular/core';
import { ServerService } from './server.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
declare var Fingerprint2: any;

declare var Fingerprint: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private serverService: ServerService) { }

    ngAfterViewInit() {
        Fingerprint2.get(function (components) {
            var values = components.map(function (component) { return component.value })
            var hash = Fingerprint2.x64hash128(values.join(''), 31)
            console.log("");
            console.log("Your fingerprint hash:", hash);
            
            console.log(Fingerprint.get());
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
