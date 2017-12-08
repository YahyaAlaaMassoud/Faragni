import { XHRBackend, RequestOptions } from '@angular/http';
// import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { HttpService } from '../services/custom-http-service/custom-http-service.service';
import { MyCustomRequestOptions } from '../helpers/custom-reqeuest-options/custom-request-options';
import { LoaderService } from '../services/loader/loader.service';

function httpServiceFactory(backend: XHRBackend, options: MyCustomRequestOptions, loaderService: LoaderService) {
    return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };