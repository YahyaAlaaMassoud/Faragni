import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from '../services/custom-http-service/custom-http-service.service';
import { httpServiceFactory } from '../modules/http-service.factory';
// import { RequestOptions } from './angular-redux-request.options';
import { LoaderComponent } from '../components/common/loader/loader.component';
import { LoaderService } from '../services/loader/loader.service';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
    imports: [
        CommonModule,
        SuiModule
    ],
    exports: [
        LoaderComponent
    ],
    declarations: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderService]    
        }
    ]
})
export class CoreModule { }