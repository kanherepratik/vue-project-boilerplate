import { IComponentMap } from '../shared/interfaces';
import { WrapperComponentType } from '../shared/enums';

const componentMap: { [key: string]: IComponentMap } = { // {[key: stringEnum] : IComponentMap}
  [WrapperComponentType.Radio]: {
    component: 'RadioButton',
    eventMap: ['input'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled', // is this common with all components?
    },
  },
  [WrapperComponentType.TextInput]: {
    component: 'AppTextbox',
    eventMap: ['onBlur', 'onFocus', 'onChange'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.MobileInput]: {
    component: 'MobileInput',
    eventMap: ['onBlur'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.Checkbox]: {
    component: 'AppCheckbox',
    eventMap: ['onChange'],
    valueProp: 'selectedItems',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.Dropdown]: {
    component: 'SingleSelect',
    eventMap: ['onChange'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  [WrapperComponentType.DatePicker]: {
    component: 'DatePicker',
    eventMap: ['change'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
};
export default componentMap;
