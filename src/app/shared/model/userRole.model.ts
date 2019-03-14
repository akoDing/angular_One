import { ExtendModel } from './extend.model';
export class UserRoleModel {
    public userRoleID: string;
    public userID: string;
    public roleID: string;
    public gmtCreateUser: string;
    public gmtCreateDate: Date;
    public gmtModifiedUser: string;
    public gmtModifiedDate: Date;
    public timeStamp: string[];
    public roleName: string;
    public extendModels: Array<ExtendModel>;
}
export class UserRoleOutputModel extends UserRoleModel {
}
export class UserRoleInputModel extends UserRoleModel {
}
