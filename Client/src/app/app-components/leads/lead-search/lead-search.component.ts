import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { Location } from '@angular/common';
import { LeadService } from '../Lead.Service';

import { LeadSearchCriteriaModel } from '../../../../../../Shared/Models/LeadSearchCriteriaModel';
import { Subscription } from 'rxjs/Subscription';
import { SearchDataRegistry } from '../../../framework-components/services/SearchDataRegistry';
import { LeadFormComponent } from '../../common/lead-form-component/lead-form.component';
import {
    MatSnackBarRef,
    MatSnackBar,
    MatExpansionPanel
} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'pm-lead-search',
    templateUrl: 'lead-search.component.html',
    styleUrls: ['lead-search.component.scss'],
    providers: [LeadService]
})
export class LeadSearchComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(LeadFormComponent) public LeadForm: LeadFormComponent;
    @ViewChild('expansionPanel') public ExpansionPanel: MatExpansionPanel;
    private _modelChange: Subscription;
    public ResultsCount = 0;
    public Letters: any[];
    public SearchResults: any[] = [];
    public TotalElements = 0;
    public SearchCriteria: LeadSearchCriteriaModel = new LeadSearchCriteriaModel();
    public snackBarRef: MatSnackBarRef<any>;

    constructor(
        private _location: Location,
        public Service: LeadService,
        public snackBar: MatSnackBar
    ) {
    }

    public ngOnInit() {
        this._modelChange = this.LeadForm.Form.valueChanges.debounceTime(1000).subscribe(() => {
            this.Search();
        });
        if (SearchDataRegistry.Instance.GetSearchCriteria()) {
            this.LeadForm.LeadModel = SearchDataRegistry.Instance.GetSearchCriteria();
            this.LeadForm.AsyncInit();
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.ExpansionPanel.expanded = false;
        });
    }

    public ngOnDestroy() {
        this._modelChange.unsubscribe();
        if (this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
    }

    public SearchCriteriaChange(): void {
        this.Search();
    }

    public OnBackClicked() {
        this._location.back();
    }

    private Search(): void {
        this.SearchCriteria = this.LeadForm.LeadModel;
        this.SearchCriteria.UserId = localStorage.getItem('UserId');
        this.Service.search(this.SearchCriteria).subscribe(
            (res) => {
                this.SearchResults = res.Content;
                this.TotalElements = res.TotalElements;
                this.Letters = Object.keys(this.SearchResults);
            },
            undefined,
            () => {
                SearchDataRegistry.Instance.RegisterSearchCriteria(this.LeadForm.LeadModel);
                const isFormDirty = this.LeadForm.IsDirty();
                if (isFormDirty) {
                    this.snackBarRef = this.snackBar.open('Clear all filters?', 'yes');
                    this.snackBarRef.onAction().subscribe(() => {
                        this.LeadForm.ClearAll();
                    });
                } else {
                    if (this.snackBarRef) {
                        this.snackBarRef.dismiss();
                    }
                }
            }
        );
    }

    public OnSearchClicked() {
        this.Search();
    }

    public OnClearSearchCriteria(): void {
        this.LeadForm.ClearAll();
        this.Search();
    }

    public toggleExpansion() {
        this.ExpansionPanel.expanded = !this.ExpansionPanel.expanded;
    }

}
