import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LeadService {
    private _apiUrl = `${environment.baseApiUrl}/Leads`;

    constructor(private _httpClient: HttpClient) {
    }

    public search(searchModel: any): Observable<any> {
        return this._httpClient.post(`${this._apiUrl}/Search`, searchModel);
    }

    public get(leadId: number): Observable<any> {
        return this._httpClient.get(`${this._apiUrl}/${leadId}`);
    }

    public delete(leadId: number): Observable<any> {
        return this._httpClient.delete(`${this._apiUrl}/${leadId}`);
    }

    public save(model: any): Observable<any> {
        return this._httpClient.post(this._apiUrl, model);
    }
}
