interface IValidation {
    name: string,
    expression?: RegExp,
    value?: string | number
}

interface IAction {
    name: string
}

export interface IFormSchema {
    label: string,
    id: string,
    children?: IContainerSchema[]
}

export interface IContainerSchema {
    component: 'Container' | 'TabbedContainer',
    id: string,
    label: string,
    submitText?: string,
    children: any[] //fix this with proper type
}

// see if this needs more propoerties
export interface IWrapperComponentSchema {
    component: ICommonComponentList
    validations?: IValidation[]
    actions?: IAction[]
    otherProps?: Object
}

// this needs to be derived dynamically
type ICommonComponentList = 'Radio' | 'Checkbox' | 'Dropdown' | 'TextInput' | 'MobileInput'

