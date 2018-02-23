import {
    Component,
    Input,
    ViewChild,
    ElementRef
} from '@angular/core';
import { PhoneNumberModel } from '../../../../../../Shared/Models/PhoneNumberModel';

@Component({
    moduleId: module.id,
    selector: 'pm-phone-form',
    templateUrl: 'phone-form.component.html',
    styleUrls: ['phone-form.component.scss']
})
export class PhoneFormComponent {
    @Input() PhoneNumber: PhoneNumberModel;
    // @Output() private NumberChange = new EventEmitter<any>();
    @ViewChild('field1') public field1: ElementRef;
    @ViewChild('field2') public field2: ElementRef;
    @ViewChild('field3') public field3: ElementRef;

    public OnNewDigitEntered(e: any, position: number): void {
        if (e && e.length > 2) {
            if (position === 1) {
                this.field2.nativeElement.focus();
            }
            if (position === 2) {
                this.field3.nativeElement.focus();
            }
        }
    }
}
