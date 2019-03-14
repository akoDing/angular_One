import { Injectable } from '@angular/core';

@Injectable()
export class ServerError {
    errorType: string;
    faultCode: string;
    reason: string;
    // mappings: Mappings;

    constructor() { }



}

export class Mappings {

    message: string;
    reason: string;
    logIdentifyId: string;
    validationResults: ValidationResult;

}

export class ValidationResult {
    code: string;
    data: Array<any>;
    type: ValidationLevel;
    key: string;
}

export enum ValidationLevel {
    /// <summary>
    /// Information.
    /// </summary>
    Information,

    /// <summary>
    /// Warning.
    /// </summary>
    Warning,

    /// <summary>
    /// Error.
    /// </summary>
    Error,
}
