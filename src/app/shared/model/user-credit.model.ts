import { BasePageModel } from './base-page.model';

export class UserCreditModel extends BasePageModel {
    public userID: string;
    public userCreditScore: number;
    public gmtCreateDate: Date;
    public gmtCreateUser: string;
    public gmtModifiedDate: Date;
    public gmtModifiedUser: string;
    public timestamp: string[];
    public userNO: string;
    public userName: string;
}

export class UserCreditOutputModel extends UserCreditModel {
    public PreApplyCount: number;
    public PreBackCount: number;
    public ReimbursementCount: number;
    public ReimbursementBackCount: number;
    public BackSum: number;
    public OrganizationName: string;
    public RoleName: string;
}

export class UserCreditInputModel extends UserCreditModel {
    public OrganizationCode: string;
    public RoleID: string;
    public UserCreditScore_Begin: number;
    public UserCreditScore_End: number;
}
