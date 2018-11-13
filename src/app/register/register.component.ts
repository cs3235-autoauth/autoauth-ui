import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
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
        private router: Router) { }

    ngOnInit() {
        localStorage.clear();
        this.form = this._fb.group({
            formInputEmail: ['', [Validators.required, Validators.email]]
        });
    }

    async registerBtn() {
        if (this.form.controls.formInputEmail.status == "VALID") {
            this.fingerprintArray = await Fingerprint.get();
            console.log(this.fingerprintArray);

            let data = {
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
