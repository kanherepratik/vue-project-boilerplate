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
                    id: 'name',
                    validations: [

                    ]
                },
                {  
                    component: 'MobileInput',
                    label: 'Mobile',
                    id: 'mobile', 
                    validations: [

                    ],
                    actions: [

                    ]
                },
                {
                    component: 'Radio',
                    label: 'Gender',
                    id: 'Gender'
                }
            ]
        },

        {
            component: 'Container',
            label: 'Nominee Details',
            id: 'nominee-details',
            children: [
                {
                    component: 'TextInput',
                    label: 'Name',
                    id: 'name',
                    validations: [

                    ]
                },
                {  
                    component: 'MobileInput',
                    label: 'Mobile',
                    id: 'mobile', 
                    validations: [

                    ],
                    actions: [

                    ]
                },
                {
                    component: 'Radio',
                    label: 'Gender',
                    id: 'Gender'
                }
            ]
        },

        {
            component: 'Container',
            label: 'Address Details',
            id: 'address-details',
            children: [
                {
                    component: 'TextInput',
                    label: 'Name',
                    id: 'name',
                    validations: [

                    ]
                },
            ]
        }
    ]
}