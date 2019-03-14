export class RoleModel {
    public roleID: string;
    public roleName: string;
    public isPim: boolean;
    public isDelete: boolean;
    public canDelete: boolean;
    public gmtCreateUser: string;
    public gmtCreateDate: Date;
    public gmtModifiedUser: string;
    public gmtModifiedDate: Date;
    public timeStamp: string[];
}
export class RoleOutputModel extends RoleModel {

}
export class RoleInputModel extends RoleModel {

}