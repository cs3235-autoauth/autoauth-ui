import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerService } from '../server.service';
import * as $ from "jquery";
declare var Fingerprint: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    formType;
    public form: FormGroup;
    fingerprintArray: any[] = [];

    constructor(
        private serverService: ServerService,
        private _fb: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService) {
        this.form = this._fb.group({
            formInputEmail: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit() {
        localStorage.clear();
    }

    async registerBtn() {
        if (this.form.controls.formInputEmail.status == "VALID") {

            // Display loading indicator
            this.spinner.show();

            // Construct data
            this.fingerprintArray = await Fingerprint.get();
            console.log(this.fingerprintArray);

            let securityLevel = ($("input:radio[name ='securityLevel']:checked") as any).val();

            let data = {
                level: securityLevel,
                email: this.form.controls.formInputEmail.value,
                fingerprint: this.fingerprintArray
            };

            await this.serverService.storeFingerprint(data)
                .subscribe(
                    (response: any) => {
                        console.log(response.data);
                        localStorage.setItem('fingerprint', JSON.stringify(this.fingerprintArray));
                        this.router.navigate(['../register-success']);
                    },
                    (error) => console.log(error)
                );
        }
    }

}
