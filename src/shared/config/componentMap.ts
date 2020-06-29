import { IComponentMap } from '../../FormBuilder/shared/interfaces';
import { WrapperComponentType } from '../enums';

const componentMap: { [key: string]: IComponentMap } = {
  [WrapperComponentType.Radio]: {
    component: 'RadioButton',
    eventMap: ['input'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.TextInput]: {
    component: 'AppTextbox',
    eventMap: ['onBlur', 'onFocus'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.MobileInput]: {
    component: 'MobileInput',
    eventMap: ['onBlur'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.Checkbox]: {
    component: 'AppCheckbox',
    eventMap: ['onChange'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.Dropdown]: {
    component: 'SingleSelect',
    eventMap: ['onChange'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.DatePicker]: {
    component: 'DatePicker',
    eventMap: ['input'],
    propMap: {
      disabled: 'isDisabled',
    },
  },
};
export default componentMap;
