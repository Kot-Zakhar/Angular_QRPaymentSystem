import { ControlBase } from './ControlBase';


export class DropdownControl extends ControlBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string} [] = [];

  constructor(options: {
        values?: {key: string, value: string} [],
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
      } = {}) {
    super(options);
    this.options = options.values || [];
  }
}
