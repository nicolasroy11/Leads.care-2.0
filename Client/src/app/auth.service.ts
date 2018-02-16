import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserBaseRequestModel } from '../../../Shared/Models/UserBaseRequestModel';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
    private EndpointBaseUrl = `${environment.baseApiUrl}/User`;

    constructor(public _httpClient: HttpClient) { }

    public Login(credentials: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Login`, credentials);
    }

    public Logout(request: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Logout`, request);
    }

    public Signup(request: UserBaseRequestModel): Observable<any> {
        return this._httpClient.post(`${this.EndpointBaseUrl}/Signup`, request);
    }

    public IsLoggedIn(): boolean {
        return localStorage.getItem('Token') !== null;
    }
}
