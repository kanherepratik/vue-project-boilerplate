import { RadioButton, AppTextbox, AppButton, AppCheckbox } from '@/common/components';
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
};
export default componentMap;
