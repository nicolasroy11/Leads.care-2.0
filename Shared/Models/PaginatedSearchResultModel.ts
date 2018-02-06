import { BasePaginationModel } from './BasePaginationModel';

export class PaginatedSearchResultModel extends BasePaginationModel {
    public TotalElements: number;
    public Content: any[];
}
