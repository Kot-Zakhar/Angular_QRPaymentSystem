import { ControlBase } from './ControlBase';


export class TextboxControl extends ControlBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {
        value?: string,
        type?: string,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
      } = {}) {
    super(options);
    this.type = options.type || '';
  }
}
