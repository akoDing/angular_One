import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { UserRoleInputModel } from 'src/app/shared/model/userRole.model';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {

    constructor(private serviceBase: ServiceBase) { }

    removeUserRole(userID: Array<string>): Observable<any> {
        return this.serviceBase.invokeService('UserRole/RemoveUserRole', userID);
    }

    createUserRole(model: Array<UserRoleInputModel>): Observable<any> {
        return this.serviceBase.invokeService('UserRole/CreateUserRole', model);
    }

    modifyUserRole(model: UserRoleInputModel): Observable<any> {
        return this.serviceBase.invokeService('UserRole/ModifyUserRole', model);
    }

}
