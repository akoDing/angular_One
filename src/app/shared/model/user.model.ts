import { BasePageModel } from './base-page.model';
import { UserRoleOutputModel } from './userRole.model';

export class UserModel extends BasePageModel {
    public userID: string;
    public organizationID: string;
    public positionID: string;
    public userNO: string;
    public userPassword: string;
    public userName: string;
    public userType: string;
    public isSystemAdmin: boolean;
    public isSynchronization: boolean;
    public gmtCreateUser: string;
    public gmtCreateDate: Date;
    public gmtModifiedUser: string;
    public gmtModifiedDate: Date;
    public timeStamp: string[];
    public extend1: string;
    public extend2: string;
    public extend3: string;
    public extend4: string;
    public extend5: string;
    public extend6: string;
    public extend7: string;
    public extend8: string;
    public extend9: string;
    public extend10: string;

}

export class UserInputModel extends UserModel {
    public userRoleModel: Array<UserRoleOutputModel>;
    public positionName: string;
    public confirmPassword: string;

}

export class UserOutputModel extends UserModel {
    public userRoleModel: Array<UserRoleOutputModel>;
    public positionName: string;
    public organizationName: string;
}

