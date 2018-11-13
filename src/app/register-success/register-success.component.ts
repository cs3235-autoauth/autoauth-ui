import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register-success',
    templateUrl: '../shared/fingerprint-table.html'
})
export class RegisterSuccessComponent implements OnInit {
    fingerprintArray: any[] = [];
    pageTitle = "Registered";

    constructor() { }

    ngOnInit() {
        this.fingerprintArray = JSON.parse(localStorage.getItem("fingerprint"));
        console.log(this.fingerprintArray);
    }
}
