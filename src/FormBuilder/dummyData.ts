import { IFormSchema } from './interfaces/common';

export const formStructure: IFormSchema = {
  label: 'Proposal Form',
  id: 'proposal-form',
  children: [
    {
      component: 'Container',
      label: 'Personal Details',
      id: 'personal-details',
      isHidden: false,
      isSubmitted: false,
      isActive: false,
      children: [
        {
          component: 'Radio',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            header: 'Container Selection',
            items: [
              { value: 'c1', label: 'container 1' },
              { value: 'c2', label: 'container 2' },
            ],
          },
          id: 'containerRadio',
        },
        {
          component: 'subContainer',
          label: 'subContainer1',
          id: 'c1',
          isHidden: false,
          isDisabled: false,
          children: [
            {
              component: 'TextInput',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                label: 'Name',
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'name',
            },
            {
              component: 'Radio',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                header: 'Gender',
                items: [
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ],
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'gender',
            },
            {
              component: 'MobileInput',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                label: 'Mobile',
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'mobile',
            },
          ],
        },
        {
          component: 'subContainer',
          label: 'subContainer2',
          id: 'c2',
          isHidden: false,
          isDisabled: false,
          children: [
            {
              component: 'TextInput',
              isHidden: false,
              isDisabled: false,

              otherProps: {
                label: 'Name',
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'name',
            },
            {
              component: 'Radio',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                header: 'Gender',
                items: [
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ],
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'gender',
            },
            {
              component: 'MobileInput',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                label: 'Mobile',
                validations: [{ name: 'required', message: 'This field is super important' }],
              },
              id: 'mobile',

              actions: [],
            },
          ],
        },
      ],
    },
    {
      component: 'Container',
      label: 'Nominee Details',
      id: 'nominee-details',
      isHidden: false,
      isSubmitted: false,
      isActive: false,
      children: [
        {
          component: 'Checkbox',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            options: [{ label: 'terms and condition', value: 'tnc' }],
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'tnc',
        },
        {
          component: 'TextInput',

          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'address',
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'address',
        },
        {
          component: 'TextInput',

          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'Pan Card',
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'panCard',
          actions: ['onPanCardBlur'],
        },
        {
          component: 'Radio',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            header: 'Buyer Role',
            items: [
              { value: 'self', label: 'Self' },
              { value: 'proposer', label: 'Proposer' },
            ],
            validations: [{ name: 'required', message: 'This field is super important' }],
          },
          id: 'buyerRole',
        },
      ],
    },
  ],
};
