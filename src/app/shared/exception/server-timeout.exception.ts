import { Injectable } from '@angular/core';
import { Exception } from './exception';

@Injectable()
export class ServerTimeoutException extends Exception {
}
