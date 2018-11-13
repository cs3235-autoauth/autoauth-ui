import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
declare var Fingerprint: any;
declare var Fingerprint2: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
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

    ngAfterViewInit() {
        this.fingerprintArray = Fingerprint.get();
        console.log(this.fingerprintArray);
    }

    loginBtn() {
        if (this.form.controls.formInputEmail.status == "VALID") {
            let data = {
                email: this.form.controls.formInputEmail.value,
                fingerprint: this.fingerprintArray
            };
            this.serverService.login(data)
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
