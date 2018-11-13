import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register-success',
    templateUrl: './register-success.component.html',
    styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
    fingerprintArray: any[] = [];

    constructor() { }

    ngOnInit() {
        let json = JSON.parse(localStorage.getItem("fingerprint"));
        // console.log(fingerprintArray);

        for (var x in json) {
            this.fingerprintArray.push(json[x]);
        }
    }

}
