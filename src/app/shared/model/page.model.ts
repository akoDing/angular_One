import { BasePageModel } from './base-page.model';

export class PageModel<T> extends BasePageModel {
  public listData: Array<T>;
  public totalPages: number;
  public dataCount: number;
}
