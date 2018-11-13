import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register-success',
    templateUrl: './register-success.component.html',
    styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
    fingerprintArray: any[] = [];
    test: string;
    constructor() { }

    ngOnInit() {
        this.fingerprintArray = JSON.parse(localStorage.getItem("fingerprint"));
        console.log(this.fingerprintArray);
    }
}
