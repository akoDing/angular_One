import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { UserInputModel } from 'src/app/shared/model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private serviceBase: ServiceBase) { }

    getUser(userID: string): Observable<any> {
        return this.serviceBase.invokeService('User/GetUser?userID=' + userID, null);
    }

    listUser(model: UserInputModel): Observable<any> {
        return this.serviceBase.invokeService('User/ListUser', model);
    }

    createUser(model: UserInputModel): Observable<any> {
        return this.serviceBase.invokeService('User/CreateUser', model);
    }

    modifyUser(model: UserInputModel): Observable<any> {
        return this.serviceBase.invokeService('User/ModifyUser', model);
    }

    removeUser(userID: string): Observable<any> {
        return this.serviceBase.invokeService('User/RemoveUser?userID=' + userID, null);
    }

    synchronizationUser(): Observable<any> {
        return this.serviceBase.invokeService('User/SynchronizationUser', null);
    }

    resetUserPassword(userID: string): Observable<any> {
        return this.serviceBase.invokeService('User/ResetUserPassword?userID=' + userID, null);
    }

    changePassword(model: UserInputModel): Observable<any> {
        return this.serviceBase.invokeService('User/ChangePassword', model);
    }

    validatePassword(model: UserInputModel): Observable<any> {
        return this.serviceBase.invokeService('User/ValidatePassword', model);
    }

}
