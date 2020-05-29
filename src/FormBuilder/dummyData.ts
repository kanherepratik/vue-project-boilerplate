import { IFormSchema } from './interfaces/common';

export const formStructure: IFormSchema = {
  label: 'Proposal Form',
  id: 'proposal-form',
  children: [
    {
      component: 'Container',
      label: 'Personal Details',
      id: 'personal-details',
      children: [
        {
          component: 'TextInput',
          label: 'Name',
          value: '',
          handler: 'handleBlur',
          otherProps: {
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'name',
        },
        {
          component: 'Radio',
          selectedItem: '',
          otherProps: {
            items: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ],
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          label: 'Gender',
          id: 'gender',
          handler: 'handleChange',
        },
        {
          component: 'MobileInput',
          label: 'Mobile',
          id: 'mobile',
          otherProps: {
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          actions: [],
        },
      ],
    },
    {
      component: 'Container',
      label: 'Nominee Details',
      id: 'nominee-details',
      children: [
        {
          component: 'TextInput',
          label: 'address',
          value: '',
          handler: 'handleBlur',
          otherProps: {
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'address',
        },
        {
          component: 'Radio',
          selectedItem: '',
          otherProps: {
            items: [
              { value: 'self', label: 'Self' },
              { value: 'proposer', label: 'Proposer' },
            ],
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          label: 'Buyer Role',
          id: 'buyerRole',
          handler: 'handleChange',
        },
        {
          component: 'Checkbox',
          selectedItem: '',
          otherProps: {
            label: 'I accept terms and conditions',
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'tnc',
          handler: 'handleChange',
        },
      ],
    },
  ],
};
