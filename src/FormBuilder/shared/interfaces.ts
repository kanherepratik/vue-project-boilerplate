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
  isHidden: boolean;
  isSubmitted: boolean;
  isActive: boolean;
  children: any[]; //FIXME this with proper type
}

export interface ISubContainerSchema {
  component: 'SubContainer';
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
  isHidden: boolean;
  isDisabled?: boolean;
  otherProps?: Object;
  handler: any;
}

export interface IComponentMap {
  [key: string]: {
    component: any;
    valueProp: string;
    eventProp?: string[];
    componentPath?: string;
    propMap?: Object;
    eventMap: string[];
  };
}

export interface ISubContainer {
  isValid: (showError: boolean) => boolean;
  showSubContainer: () => void;
  hideSubContainer: () => void;
  disableFields: () => void;
}

// this needs to be derived dynamically
type ICommonComponentList = 'Radio' | 'Checkbox' | 'Dropdown' | 'TextInput' | 'MobileInput' | 'DatePicker';

export interface IEventMap {
  [key: string]: (event: any, value: any) => void;
}

export interface INavigateClickEvent {
  /** Unique identifier form */
  containerId: string;
  /** index position of the form within form array */
  containerIndex: number;
}
export interface IStepClickEvent extends INavigateClickEvent {
  /** Indicates if the form can be navigated or not. */
  canNavigate: boolean;
  event?: any;
}
