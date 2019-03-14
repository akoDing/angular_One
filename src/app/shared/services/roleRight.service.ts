import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { RoleRightInputModel } from 'src/app/shared/model/roleRight.model';

@Injectable({
    providedIn: 'root'
})
export class RoleRightService {

    constructor(private serviceBase: ServiceBase) { }

    setRoleRight(listModel: Array<RoleRightInputModel>): Observable<any> {
        return this.serviceBase.invokeService('RoleRight/SetRoleRight', listModel);
    }
    listRight(roleids: Array<string>): Observable<any> {
        return this.serviceBase.invokeService('RoleRight/ListRight', roleids);
    }

}