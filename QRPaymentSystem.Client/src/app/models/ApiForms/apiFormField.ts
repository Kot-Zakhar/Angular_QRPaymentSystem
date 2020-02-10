import { ApiFormFieldType } from './apiFormFieldType';

export class ApiFormField {
    key: string;
    label: string;
    required: boolean;
    editable: boolean;
    display: boolean;

    type: ApiFormFieldType;
}
