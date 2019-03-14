import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { RoleInputModel } from 'src/app/shared/model/role.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private serviceBase: ServiceBase) { }

    getRole(roleID: string): Observable<any> {
        return this.serviceBase.invokeService('Role/GetRole?roleID=' + roleID, null);
    }

    listRole(model: RoleInputModel): Observable<any> {
        return this.serviceBase.invokeService('Role/ListRole', model);
    }

    createRole(model: RoleInputModel): Observable<any> {
        return this.serviceBase.invokeService('Role/CreateRole', model);
    }

    modifyRole(model: RoleInputModel): Observable<any> {
        return this.serviceBase.invokeService('Role/ModifyRole', model);
    }

    removeRole(model: Array<string>): Observable<any> {
        return this.serviceBase.invokeService('Role/RemoveRole', model);
    }

}