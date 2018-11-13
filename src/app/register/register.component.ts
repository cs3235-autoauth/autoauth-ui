import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';
declare var Fingerprint: any;
declare var Fingerprint2: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
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

    ngAfterViewInit() {
        this.fingerprintArray = Fingerprint.get();
        console.log(this.fingerprintArray);

        // var _this = this;
        // Fingerprint2.get(function (components) {
        //     _this.fingerprintArray = components.map(function (component) { return component.value })
        //     var hash = Fingerprint2.x64hash128(_this.fingerprintArray.join(''), 31)
        //     console.log(_this.fingerprintArray);
        //     console.log("");
        //     console.log("Your fingerprint hash:", hash);
        // })
    }

    registerBtn() {
        if (this.form.controls.formInputEmail.status == "VALID") {
            let data = {
                email: this.form.controls.formInputEmail.value,
                fingerprint: this.fingerprintArray
            };
            this.serverService.storeFingerprint(data)
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
