import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
declare var Fingerprint: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    formType;
    public form: FormGroup;
    fingerprintArray: any[] = [];

    constructor(
        private serverService: ServerService,
        private _fb: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.form = this._fb.group({
            formInputEmail: ['', [Validators.required, Validators.email]]
        });
    }

    async loginBtn() {
        if (this.form.controls.formInputEmail.status == "VALID") {
            this.fingerprintArray = await Fingerprint.get();
            console.log(this.fingerprintArray);

            let data = {
                email: this.form.controls.formInputEmail.value,
                fingerprint: this.fingerprintArray
            };

            await this.serverService.login(data)
                .subscribe(
                    (response: any) => {
                        if (response.data.status == 200) {
                            console.log(response.data);
                            this.router.navigate(['../login-success']);
                        } else {
                            this.router.navigate(['../login-failure']);
                        }
                    },
                    (error) => {
                        console.log(error);
                        this.router.navigate(['../login-failure']);
                    }
                );
        }
    }

}
