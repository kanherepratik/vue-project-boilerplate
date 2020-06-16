import { IComponentMap } from '../shared/interfaces';

const componentMap: IComponentMap = {
  Radio: {
    component: 'RadioButton',
    eventMap: ['input'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  TextInput: {
    component: 'AppTextbox',
    eventMap: ['onBlur', 'onFocus', 'onChange'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  MobileInput: {
    component: 'MobileInput',
    eventMap: ['onBlur'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  Checkbox: {
    component: 'AppCheckbox',
    eventMap: ['onChange'],
    valueProp: 'selectedItems',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  Dropdown: {
    component: 'SingleSelect',
    eventMap: ['onChange'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  DatePicker: {
    component: 'DatePicker',
    eventMap: ['change'],
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
};
export default componentMap;
