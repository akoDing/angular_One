import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { ResultModel } from '../model/result.model';
import { PageModel } from '../model/page.model';
import { UserCreditModel, UserCreditOutputModel, UserCreditInputModel } from 'src/app/shared/model/user-credit.model';

@Injectable({
    providedIn: 'root'
})
export class UserCreditService {

    constructor(private serviceBase: ServiceBase) { }

    Login(): Observable<any> {
        return this.serviceBase.invokeGetService('Login/login');
      }

    ListUserCredit(model: UserCreditInputModel): Observable<ResultModel<PageModel<UserCreditOutputModel>>> {
        return this.serviceBase.invokeService('UserCredit/ListUserCredit', model);
      }

}
