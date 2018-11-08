import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private serverService: ServerService) { }

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
