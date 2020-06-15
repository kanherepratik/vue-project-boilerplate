import { IFormSchema } from './shared/interfaces';

export const formStructure: IFormSchema = {
  label: 'Proposal Form',
  id: 'proposal-form',
  children: [
    {
      component: 'Container',
      label: 'Bike Owner Details',
      id: 'bike-owner-details',
      submitText: 'NEXT: Communication Address',
      isHidden: false,
      isSubmitted: false,
      isActive: true,
      children: [
        {
          component: 'TextInput',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            label: 'Owner name as RC',
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'ownerName',
        },
        {
          component: 'Radio',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            header: 'Gender',
            items: [
              {
                value: 'male',
                label: 'Male',
              },
              {
                value: 'female',
                label: 'Female',
              },
            ],
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'gender',
        },
        {
          component: 'DatePicker',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'dob',
        },
        {
          component: 'MobileInput',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            label: 'Mobile',
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'mobile',
        },
        {
          component: 'TextInput',
          isHidden: false,
          isDisabled: false,
          otherProps: {
            label: 'Email Address',
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'emailId',
        },
      ],
    },
    {
      component: 'Container',
      label: 'Communication Address',
      id: 'communication-address',
      submitText: 'NEXT: Vehicle Details',
      isHidden: false,
      isSubmitted: false,
      isActive: false,
      children: [
        {
          component: 'TextInput',
          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'Area Pincode',
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'pincode',
        },
        {
          component: 'TextInput',
          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'Postal Address',
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'address',
        },
        {
          component: 'Dropdown',
          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'State',
            items: [
              {
                label: 'Maharastra',
                value: 'mh',
              },
              {
                label: 'Delhi',
                value: 'delhi',
              },
              {
                label: 'Tamil Nadu',
                value: 'tn',
              },
            ],
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'state',
        },
        {
          component: 'Dropdown',
          isDisabled: false,
          isHidden: false,
          otherProps: {
            label: 'City',
            items: [
              {
                label: 'Mumbai',
                value: 'mumbai',
              },
              {
                label: 'Delhi',
                value: 'delhi',
              },
              {
                label: 'Pune',
                value: 'pune',
              },
            ],
            validations: [
              {
                name: 'required',
                message: 'This field is super important',
              },
            ],
          },
          id: 'city',
        },
      ],
    },
    {
      component: 'TabbedContainer',
      label: 'Vehicle Details',
      id: 'vehicle-policy-details',
      submitText: 'NEXT: Review and Pay',
      isHidden: false,
      isSubmitted: false,
      isActive: false,
      children: [
        {
          component: 'SubContainer',
          label: 'Vehicle Details',
          id: 'vehicle-details',
          isHidden: false,
          isSubmitted: false,
          isActive: true,
          children: [
            {
              component: 'TextInput',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Your Bike Number',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'registrationNumber',
            },
            {
              component: 'DatePicker',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'regDate',
            },
            {
              component: 'TextInput',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Engine Number',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'engineNumber',
            },
            {
              component: 'TextInput',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Chassis Number',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'chassisNumber',
            },
          ],
        },
        {
          component: 'SubContainer',
          label: 'Past Policy Details',
          id: 'policy-details',
          isHidden: false,
          isSubmitted: false,
          isActive: false,
          children: [
            {
              component: 'DatePicker',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'expiryDate',
            },
            {
              component: 'Dropdown',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Previous Policy Insurer',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'prevPolicyInsurer',
            },
            {
              component: 'TextInput',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Previous Policy Number',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'prevPolicyNumber',
            },
            {
              component: 'Radio',
              isHidden: false,
              isDisabled: false,
              otherProps: {
                header: 'Claimed in the past year?',
                items: [
                  {
                    value: 'true',
                    label: 'Yes',
                  },
                  {
                    value: 'false',
                    label: 'No',
                  },
                ],
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'claimInPastYear',
            },
            {
              component: 'Dropdown',
              isDisabled: false,
              isHidden: false,
              otherProps: {
                label: 'Previous No Claim bonus (NCB)',
                validations: [
                  {
                    name: 'required',
                    message: 'This field is super important',
                  },
                ],
              },
              id: 'prevNCB',
            },
          ],
        },
      ],
    },
  ],
};
