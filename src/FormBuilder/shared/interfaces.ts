import { ContainerType, WrapperComponentType } from './enums';

interface IValidation {
  name: string;
  expression?: RegExp;
  value?: string | number;
}

export interface IFormSchema {
  label: string;
  id: string;
  children: IContainerSchema[];
}

export interface IContainerSchema {
  component: ContainerType;
  id: string;
  label: string;
  submitText?: string;
  isHidden: boolean;
  isSubmitted: boolean;
  isActive: boolean;
  children: IContainerComponentParentSchema[];
}

export interface IContainerComponentParentSchema {
  id: string;
  isHidden: boolean;
  component: string;
}

export interface ISubContainerSchema extends IContainerComponentParentSchema {
  component: 'SubContainer';
  label: string;
  isSubmitted: boolean;
  isActive: boolean;
  children: IWrapperComponentSchema[];
}

// see if this needs more properties
export interface IWrapperComponentSchema extends IContainerComponentParentSchema {
  component: WrapperComponentType;
  validations?: IValidation[];
  value: string;
  isDisabled?: boolean;
  otherProps?: Object;
}

export interface IComponentMap {
  component: string;
  valueProp: string;
  propMap?: Object;
  eventMap: string[];
}

// where is this used?
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
