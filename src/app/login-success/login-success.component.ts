import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-success',
    templateUrl: 'login-success.component.html'
})
export class LoginSuccessComponent implements OnInit {
    fingerprintArray: any[] = [];
    fingerprintStoredArray: any[] = [];

    pageTitle = "Logged in";
    constructor() { }

    ngOnInit() {
        this.fingerprintArray = JSON.parse(localStorage.getItem("fingerprint"));
        this.fingerprintStoredArray = JSON.parse(localStorage.getItem("fingerprint_stored"));
        console.log(this.fingerprintArray);
    }
}
