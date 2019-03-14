import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExtendService {

    constructor(private serviceBase: ServiceBase) { }

    listExtend(): Observable<any> {
        return this.serviceBase.invokeService('Extend/ListExtend', null);
    }
}
