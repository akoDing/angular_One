import { BasePageModel } from './base-page.model';
export class ExtendModel extends BasePageModel  {
    public extendID: string;
    public roleID: string;
    public extendNo: string;
    public extendName: string;
    public isEnable: boolean;
    public gmtCreateUser: string;
    public gmtCreateDate: Date;
    public gmtModifiedUser: string;
    public gmtModifiedDate: Date;
    public timeStamp: string[];
    public roleName: string;
    public extendData: string;
    public extendSourceModels: Array<ExtendSourceModel>;
}
export class ExtendOutputModel extends ExtendModel {

}
export class ExtendInputModel extends ExtendModel {

}

export class ExtendSourceModel extends BasePageModel  {
    public id: string;
    public name: string;
}
export class ExtendSourceOutputModel extends ExtendSourceModel {

}
export class ExtendSourceInputModel extends ExtendSourceModel {

}

