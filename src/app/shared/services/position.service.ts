import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { PositionModel } from 'src/app/shared/model/position.model';

@Injectable({
    providedIn: 'root'
})

export class PositionService {

    constructor(private serviceBase: ServiceBase) { }

    listPosition(): Observable<any> {
        return this.serviceBase.invokeService('Position/ListPosition', null);
    }
}
