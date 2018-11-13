import { Component } from '@angular/core';
import { ServerService } from './server.service';

declare var Fingerprint: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(private serverService: ServerService) { }
}
