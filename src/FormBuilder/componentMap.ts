type IComponentMap = {
    [key: string] : {
        component: string,
        componentPath: string,
        propMap?: Object,
        eventMap?: Object,
        eventProp?: string,
        valueProp?: string
    }
}

const componentMap: IComponentMap = {
    Radio: {
        component: 'RadioComponent',
        componentPath: '',
        eventProp: 'onChange',
        valueProp: 'value',
        propMap: {
            disabled: 'isDisabled',
        }
    },
    TextInput: {
        component: 'TextInput',
        componentPath: '',
        eventProp: 'onChange',
        valueProp: 'value',
        propMap: {
            disabled: 'isDisabled',
        }  
    }
}
export default componentMap