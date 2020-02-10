import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlBase } from '../models/controls';
import { ApiFormModel } from '../models';
import { Observable, observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debug } from 'debug';
import { Exception } from '@zxing/library';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private log = debug('app-form-service');
    private apiFormModel: ApiFormModel;

    constructor(
        private http: HttpClient
    ) {}

    toFormGroup(controls: ControlBase<any>[]): FormGroup {
        const group: any = {};

        controls.forEach(control => {
            group[control.key] = control.required ? new FormControl(control.value || '', Validators.required)
                                                  : new FormControl(control.value || '');
        });

        return new FormGroup(group);
    }

    getNewTransferFormModel(): Observable<ApiFormModel> {
        const observableResult = this.http.get<ApiFormModel>('/api/form/transfer');
        observableResult.subscribe(
            value => {
                this.apiFormModel = value;
            },
            error => {
                this.log(error);
            }
        );
        return observableResult;
    }

    submitNewTransaferForm(formValue: any, type: 'transfer' | 'replenishment' = 'transfer'): Observable<any> {
        try {
            let parsedForm = this.parseFormValue(formValue, this.apiFormModel);
            this.log(parsedForm);
            return this.http.post('/api/transaction/' + type, parsedForm);
        } catch (ex) {
            return throwError(ex);
        }
    }

    private parseFormValue(formValue: any, formModel: ApiFormModel): any {
        if (!formModel) {
            throw new Exception('Form model is invalid');
        }
        const result = {};
        for (const field of formModel.fields) {
            if (field.required && formValue[field.key] === '') {
                throw new Exception(field.key + ' is required');
            }
            switch (field.type.name) {
                case 'number':
                    const parsedNumber = Number.parseFloat(formValue[field.key]);
                    if (parsedNumber) {
                        result[field.key] = parsedNumber;
                    }
                    break;
                case 'date':
                case 'datetime-local':
                case 'time':
                    const parsedDate = Date.parse(formValue[field.key]);
                    if (parsedDate) {
                        result[field.key] = new Date(parsedDate);
                    }
                    break;
                default :
                    if (formValue[field.key]) {
                        result[field.key] = formValue[field.key];
                    }
            }
        }

        return result;
    }
}
