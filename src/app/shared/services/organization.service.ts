import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { Observable } from 'rxjs';
import { OrganizationInputModel } from 'src/app/shared/model/organization.model';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private serviceBase: ServiceBase) { }

    getOrganization(organizationID: string): Observable<any> {
        return this.serviceBase.invokeService('Organization/GetOrganization?orgnizationID=' + organizationID, null);
    }

    listOrganization(model: OrganizationInputModel): Observable<any> {
        return this.serviceBase.invokeService('Organization/ListOrganization', model);
    }

    createOrganization(model: OrganizationInputModel): Observable<any> {
        return this.serviceBase.invokeService('Organization/CreateOrganization', model);
    }

    modifyOrganization(model: OrganizationInputModel): Observable<any> {
        return this.serviceBase.invokeService('Organization/ModifyOrganization', model);
    }

    removeOrganization(organizationID: string): Observable<any> {
        return this.serviceBase.invokeService('Organization/RemoveOrganization?orgnizationID=' + organizationID, null);
    }

    synchronizeOrganization(): Observable<any> {
        return this.serviceBase.invokeService('Organization/SynchronizeOrganization', null);
    }

}
