export class SearchDataRegistry {
    public constructor() {
        this._isClear = true;
    }
    public static Instance: SearchDataRegistry = new SearchDataRegistry();
    private _searchCriteria: any;
    private _isClear: boolean;
    public get isClear(): boolean {
        return this._isClear;
    }
    public set isClear(val: boolean) {
        this._isClear = val;
    }
    public GetSearchCriteria(): any {
        return this._searchCriteria;
    }
    public RegisterSearchCriteria(searchCriteria: any): void {
        this._searchCriteria = searchCriteria;
    }
    public ClearSearchCriteria(): void {
        this._searchCriteria = undefined;
        this._isClear = true;
    }
}
