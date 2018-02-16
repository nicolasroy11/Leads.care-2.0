import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './app-settings';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppSettingsService {
    // private url: string = environment.baseApiUrl;
    // private _apiUrl = 'http://localhost:3000/api/' + 'AppSettings';
    private _apiUrl = `${environment.baseApiUrl}/AppSettings`;
    public constructor(private _httpClient: HttpClient, public appSettings: AppSettings) { }

    public get(): Observable<any> {
        const appSettings = this.appSettings;
        return this._httpClient.get(this._apiUrl)
            .do((response: any) => {
                appSettings.setAll(response);
                appSettings.isInitialized = true;
                return true;
            });
    }
}
