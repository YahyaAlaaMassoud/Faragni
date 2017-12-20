import { BaseRequestOptions } from '@angular/http';

export class MyCustomRequestOptions extends BaseRequestOptions {

    constructor (customOptions?: any) {
        super();
        let token = localStorage.getItem('jwt');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', 'Bearer ' + token ); 
    }

}
