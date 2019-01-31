import { BasePageModel } from './base-page.model';

export class LogModel extends BasePageModel {
    public iD: string;
    public date: string;
    public thread: string;
    public level: string;
    public logger: string;
    public operator: number;
    public message: string;
    public actionType: number;
    public operand: string;
    public iP: string;
    public machineName: string;
    public browser: string;
    public location: string;
    public exception: string;
}

export class LogInputModel extends LogModel {

}

export class LogOutputModel extends LogModel {
    public info: number ;
    public debug: number ;
    public warn: number ;
    public error: number ;
    public fatal: number ;
}