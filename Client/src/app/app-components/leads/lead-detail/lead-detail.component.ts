import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { LeadService } from '../Lead.Service';
import { LeadModel } from '../../../../../../Shared/Models/LeadModel';
// import { Neighborhoods } from '../../../../../../Shared/Constants/Neighborhoods';
import { LeadFormComponent } from '../../common/lead-form-component/lead-form.component';
import { AppSettings } from '../../../framework-components/settings/app-settings';

@Component({
    moduleId: module.id,
    selector: 'pm-lead-detail',
    templateUrl: 'lead-detail.component.html'
})
export class LeadDetailComponent implements OnInit {
    @ViewChild(LeadFormComponent) public LeadForm: LeadFormComponent;
    public Title: string;
    public EditingContext: any = new LeadModel();
    public IsNew: boolean;
    public Lead: LeadModel;
    public IsEditable: boolean;
    public KeyId: number;
    // public Neighborhoods = Neighborhoods;
    public Neighborhoods = this._appSettings.constants.Neighborhoods;
    public RequestInProgress = false;
    public NeighborhoodsCheckboxObject: { [key: string]: boolean } = {};

    public constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location,
        private _appSettings: AppSettings,
        public Service: LeadService) { }

    public OnBackClicked() {
        this._location.back();
    }

    public ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.KeyId = +params['leadId'];
            this.IsNew = this.KeyId === 0;
            if (!this.IsNew) {
                this.Service.get(this.KeyId).subscribe(
                    (res) => {
                        this.EditingContext = res;
                        this.LeadForm.LeadModel = this.EditingContext;
                        this.LeadForm.AsyncInit();
                        this.Lead = res;
                        this.RequestInProgress = false;
                    });
            }
        });
    }

    public SaveLead() {
        this.RequestInProgress = true;
        this.LeadForm.LeadModel.UserId = +localStorage.getItem('UserId');
        this.EditingContext = this.LeadForm.LeadModel;
        this.Service.save(this.EditingContext).subscribe(() => {
            this.RequestInProgress = false;
            this._router.navigate(['./leads']);
        });
    }

    public SearchCriteriaChange(): void {}
}
