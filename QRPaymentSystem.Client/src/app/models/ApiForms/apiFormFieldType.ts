export class ApiFormFieldType {
    name: 'number' | 'date' | 'datetime-local' | 'email' | 'password' | 'range' | 'time' | 'tel';
    allowedValues?: string[];
}
