import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { ServerError } from './server-error';
import { Exception } from '../exception/exception';
import { PermissonException } from '../exception/permission.exception';
import { ValidationException } from '../exception/validation.exception';
import { ConcurrencyException } from '../exception/concurrency.exception';
import { ServerTimeoutException } from '../exception/server-timeout.exception';
import { UnhandledException } from '../exception/unhandled.exception';
import { contentHeaders } from './headers';

const servicePath = '/WebApi/';


@Injectable()
export class ServiceBase {
    retryCount = 1; // Get this data from client configuration file
    retriedCount = 0;
    timeout = 60000; // Get this data from client configuration file

    constructor(private http: Http, private router: Router) {
    }

    invokeService(url: string, data: any): Observable<any> {
        const invokeUrl = servicePath + url;
        const jsondata = data == null ? null : JSON.stringify(data);

        return this.http.post(invokeUrl, jsondata, { headers: contentHeaders })
            .map(this.extractData)
            .catch((error) => {
                return this.handleError(error);
            });
    }

    invokeGetService(url: string): Observable<any> {
        const invokeUrl = servicePath + url;

        return this.http.get(invokeUrl, { headers: contentHeaders })
            .map(this.extractData)
            .catch(this.handleError);
    }

    invokeResouces(url: string, data: any): Observable<any> {
        const invokeUrl = servicePath + url;
        const jsondata = data == null ? null : JSON.stringify(data);
        return this.http.post(invokeUrl, jsondata, { headers: contentHeaders, responseType: 3 })
            .map(res => res.json())
            .catch(this.handleError);
    }

    invokeGetResouces(url: string): Observable<any> {
        return this.http.get(url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    invokErrorTestService(url: string, data: any): Observable<any> {
        const invokeUrl = servicePath + url;
        const jsondata = data == null ? null : JSON.stringify(data);

        // console.log(jsondata);
        return this.http.post(invokeUrl, jsondata, { headers: contentHeaders })
            // .retryWhen(this.retry)
            // .timeout(this.timeout)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private retry(errors) {
        if (this.retriedCount > this.retryCount) {
            return Observable.throw('Network error...');
        } else {

            this.retriedCount++;
            return errors.delay(500);
        }
    }

    private extractData(res: Response) {
        const resJson = res.json();

        // check if there is any server error ocurred.
        if (resJson.errorType) {
            console.log('resJson=' + JSON.stringify(res.json()));
            const serverError: ServerError = new ServerError();
            serverError.faultCode = resJson.faultCode;
            serverError.errorType = resJson.errorType;
            serverError.reason = resJson.reason;

            // error throw for each errorType
            let exception: Exception;
            switch (serverError.errorType) {
                case 'CosmosPrivilegePermissionFault':
                    exception = new PermissonException();
                    break;
                case 'ValidationFault':
                    exception = new ValidationException();
                    break;
                case 'ConcurrencyFault':
                    exception = new ConcurrencyException();
                    break;
                case 'UnhandledFault':
                    exception = new ServerTimeoutException();
                    break;
                case 'E01':
                    exception = new UnhandledException();
                    break;
                default:
                    exception = new UnhandledException();
                    break;

            }

            exception.errorCode = serverError.faultCode;
            exception.reason = serverError.reason;
            throw exception;

        }

        return resJson;
    }

    /**
   * Handle HTTP error
   */
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        // let errMsg = (error.message) ? error.message :
        //    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error('error=' + JSON.stringify(error)); // log to console instead
        $('#loading').hide();
        const body = JSON.parse(error._body) as any;
        if (body.errorCode === 1) {
            if (this.router.url.includes('/order')) {
                window.location.href = 'to do';
            } else {
                this.router.navigateByUrl('login4portal'); // to do
            }
        } else if (body.errorCode === 2) {
            this.router.navigateByUrl('nopermission');
        }
        return Observable.throw(error).toPromise();
    }
}
