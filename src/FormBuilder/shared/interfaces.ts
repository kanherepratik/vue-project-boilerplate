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

export interface IWrapperComponentSchema extends IContainerComponentParentSchema {
  component: WrapperComponentType;
  label: string;
  validations?: IValidation[];
  isDisabled?: boolean;
  otherProps?: Object;
}

export interface IComponentMap {
  component: string;
  propMap?: Object;
  eventMap: string[];
}

export interface IEventMap {
  [key: string]: (event: any, value: any) => void;
}

export interface INavigateClickEvent {
  containerId: string;
  containerIndex: number;
}
export interface IStepClickEvent extends INavigateClickEvent {
  canNavigate: boolean;
  event?: any;
}

export type IStepContainer = IContainerSchema | ISubContainerSchema;
