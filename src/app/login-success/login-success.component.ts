import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-success',
    templateUrl: '../shared/fingerprint-table-login.html'
})
export class LoginSuccessComponent implements OnInit {
    fingerprintArray: any[] = [];
    pageTitle = "Logged in";
    constructor() { }

    ngOnInit() {
        this.fingerprintArray = JSON.parse(localStorage.getItem("fingerprint"));
        console.log(this.fingerprintArray);
    }
}
