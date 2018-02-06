export interface IDataLayerRepoSearcher<TModel, TSearchCriteria, TSearchResult> {
    Get(leadId: number): Promise<TModel>
    Search(searchCriteria: TSearchCriteria): Promise<TSearchResult>;
}
