export class PositionModel {
    public positionID: string;
    public positionName: string;
    public canDelete: boolean;
    public gmtCreateUser: string;
    public gmtCreateDate: Date;
    public gmtModifiedUser: string;
    public gmtModifiedDate: Date;
    public timeStamp: string[];
}

export class PositionInputModel extends PositionModel {

}

export class PositionOutputModel extends PositionModel {

}
