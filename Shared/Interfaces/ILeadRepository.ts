import { IDataLayerRepoModifier } from './IDataLayerRepoModifier';
import { IDataLayerRepoSearcher } from './IDataLayerRepoSearcher';
import { LeadModel } from '../Models/LeadModel';
import { LeadSearchCriteriaModel } from '../Models/LeadSearchCriteriaModel';
import { DictionarySearchResultModel } from '../Models/DictionarySearchResultModel';

export interface ILeadRepository extends IDataLayerRepoModifier<string, LeadModel>,
    IDataLayerRepoSearcher<LeadModel, LeadSearchCriteriaModel, DictionarySearchResultModel> {
    Get(leadId: string): Promise<LeadModel>
    Delete(leadId: string): Promise<string>
}
