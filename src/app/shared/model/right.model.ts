import { BasePageModel } from './base-page.model';

export class RightModel extends BasePageModel {
  public rightID: string;
  public rightName: string;
  public moduleID: string;
  public moduleName: string;
  public menuID: string;
  public menuName: string;
  public menuUrl: string;
  public gmtCreateDate: Date;
  public gmtCreateUser: string;
  public gmtModifiedDate: Date;
  public gmtModifiedUser: string;
  public timestamp: string[];
}

export class RightOutputModel extends RightModel {
public isChecked: boolean;
}

export class RightInputModel extends RightModel {

}