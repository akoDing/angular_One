import { BasePageModel } from './base-page.model';

export class OrganizationModel extends BasePageModel {
  public organizationID: string;
  public organizationCode: string;
  public organizationName: string;
  public isEnabled: boolean;
  public isSynchronous: boolean;
  public gmtCreateDate: Date;
  public gmtCreateUser: string;
  public gmtModifiedDate: Date;
  public gmtModifiedUser: string;
  public timestamp: string[];
}

export class OrganizationOutputModel extends OrganizationModel {

}

export class OrganizationInputModel extends OrganizationModel {

}