import { RadioButton, AppTextbox, AppCheckbox, MobileInput } from '@/common/components';
import { IComponentMap } from './interfaces/common';

const componentMap: IComponentMap = {
  Radio: {
    component: RadioButton,
    eventProp: 'onValueChange',
    valueProp: 'selectedItem',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  TextInput: {
    component: AppTextbox,
    eventProp: 'onBlur',
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  MobileInput: {
    component: MobileInput,
    eventProp: 'onBlur',
    valueProp: 'value',
    propMap: {
      disabled: 'isDisabled',
    },
  },
  Checkbox: {
    component: AppCheckbox,
    eventProp: 'onChange',
    valueProp: 'checked',
    propMap: {
      disabled: 'isDisabled',
    },
  },
};
export default componentMap;
