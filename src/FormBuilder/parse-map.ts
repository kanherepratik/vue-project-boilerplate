type IParseMap = {
    [key: string] : {
        component: string,
        componentPath: string,
        propMap?: Object,
        eventMap?: Object,
        eventProp?: string,
        valueProp?: string
    }
}

const parseMap: IParseMap = {
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
export default parseMap