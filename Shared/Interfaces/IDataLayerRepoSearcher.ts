export interface IDataLayerRepoSearcher<TModel, TSearchCriteria, TSearchResult> {
    Get(leadId: string): Promise<TModel>
    Search(searchCriteria: TSearchCriteria): Promise<TSearchResult>;
}
