interface IValidation {
  name: string;
  expression?: RegExp;
  value?: string | number;
}

interface IAction {
  name: string;
}

export interface IFormSchema {
  label: string;
  id: string;
  children: IContainerSchema[];
}

export interface IContainerSchema {
  component: 'Container' | 'TabbedContainer';
  id: string;
  label: string;
  submitText?: string;
  children: any[]; //FIXME this with proper type
}

// see if this needs more properties
export interface IWrapperComponentSchema {
  id: string;
  component: ICommonComponentList;
  validations?: IValidation[];
  actions?: IAction[];
  value: string;
  otherProps?: Object;
  handler: any;
}

export interface IComponentMap {
  [key: string]: {
    component: any;
    valueProp: string;
    eventProp: string;
    componentPath?: string;
    propMap?: Object;
    eventMap?: Object;
  };
}

// this needs to be derived dynamically
type ICommonComponentList = 'Radio' | 'Checkbox' | 'Dropdown' | 'TextInput' | 'MobileInput' | 'DatePicker';
