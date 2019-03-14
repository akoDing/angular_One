export class ResultModel<T> {
    public isSuccess: boolean;
    public data: T;
    public errorCode: string;
    public errorMessage: string;
}