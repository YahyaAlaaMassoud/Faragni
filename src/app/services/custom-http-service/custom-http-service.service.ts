import { Injectable } from '@angular/core';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MyCustomRequestOptions } from '../../helpers/custom-reqeuest-options/custom-request-options';

import { LoaderService } from '../../services/loader/loader.service';
import { RequestArgs } from '@angular/http/src/interfaces';

export class HttpService extends Http {
    public token: string;
    apiUrl = 'https://faragni-api.herokuapp.com/api/';

    constructor(backend: XHRBackend,
                defaultOptions: MyCustomRequestOptions,
                private loaderService: LoaderService) {                    
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        // debugger;
        return super.get(this.getFullUrl(url), this.requestOptions(options))
                    .catch(this.handleError) // Catch exception here
                    .do((res: Response) => {
                        // console.log('hamadaaaaaaaaaaaaaaaaaa')
                    }, (error: any) => {
                        // Handle errors
                    })
                    .finally(() => {
                        // console.log('hide loader')
                        this.hideLoader();
                        // Request completed
                    });
    }

    post(url: string, entity: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return super.post(this.getFullUrl(url), entity, this.requestOptions(options))
                    .catch(this.handleError)
                    .do((res: Response) => {
                        // console.log('hamadaaaaaaaaaaaaaaaaaa')
                    }, (error: any) => {
                        // Handle errors
                    })
                    .finally(() => {
                        // console.log('hide loader')
                        this.hideLoader();
                        // Request completed
                    });
    }

    put(url: string, entity: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return super.put(this.getFullUrl(url), entity, this.requestOptions(options))
                    .catch(this.handleError)
                    .do((res: Response) => {
                        // console.log('hamadaaaaaaaaaaaaaaaaaa')
                    }, (error: any) => {
                        // Handle errors
                    })
                    .finally(() => {
                        // console.log('hide loader')
                        this.hideLoader();
                        // Request completed
                    });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return super.delete(this.getFullUrl(url), this.requestOptions(options))
                    .catch(this.handleError)
                    .do((res: Response) => {
                        // console.log('hamadaaaaaaaaaaaaaaaaaa')
                    }, (error: any) => {
                        // Handle errors
                    })
                    .finally(() => {
                        // console.log('hide loader')
                        this.hideLoader();
                        // Request completed
                    });
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) 
            options = new MyCustomRequestOptions();
        if (options.headers == null) 
            options.headers = new Headers();
        return options;
    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    private showLoader(): void {
        this.loaderService.show()
    }

    private hideLoader(): void {
        this.loaderService.hide()
    }
}

