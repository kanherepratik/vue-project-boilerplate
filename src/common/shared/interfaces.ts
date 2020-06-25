export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface IValidationRules {
  integer: (integer: any) => boolean;
  email: (email: string) => boolean;
  mobile: (mobile: any) => boolean;
  required: (value: any) => boolean;
  regex: (regexString: string, value: any) => boolean;
  inverseRegex: (regexString: string, value: any) => boolean;
  maxValue: (maxValue: any, value: any) => boolean;
  minValue: (minValue: any, value: any) => boolean;
  minLength: (minLength: number, value: any) => boolean;
  maxLength: (maxLength: number, value: any) => boolean;
  pan: (value: any) => boolean;
  aadhar: (value: any) => boolean;
  gstin: (value: any) => boolean;
  alphaNumeric: (value: any) => boolean;
  alphaNumericWithSpace: (value: any) => boolean;
  multipleOf: (multiple: number, value: number) => boolean;
}

export interface IValidationMessages {
  required: string;
  email: string;
  mobile: string;
  integer: string;
  regex: string;
  inverseRegex: string;
  maxValue: string;
  minValue: string;
  maxLength: string;
  minLength: string;
  pan: string;
  aadhar: string;
  gstin: string;
  pincode: string;
  alphaNumeric: string;
  alphaNumericWithSpace: string;
  multipleOf: string;
}

export interface IValidationRule {
  name: string;
  message?: string;
  minValue?: number;
  maxValue?: number;
  expression?: string;
}

export interface ISuffixDivisorMap {
  thousand: number;
  lakh: number;
  crore: number;
}
export interface IUnitLabel {
  full: string;
  short: string;
}

// Interfaces related to AppTabs components
export interface IAppTab {
  title: string;
  component: any;
  active?: boolean;
}
// Stepper component interfaces
export interface IStepperStep {
  name: string;
  component: any;
  icon?: string;
  title?: string;
  subtitle?: string;
  completed?: boolean;
}

export interface IInitStepperStep {
  name: string;
  completed: boolean;
}
// AppCheckbox Component Interface

export interface IOption {
  label: string;
  value: any;
}

export interface ICheckboxOption extends IOption {
  disabled?: boolean;
}

// SingleSingle Component Interfaces
export interface ISelectItem {
  label: string;
  value: string;
}

export interface ISelectItemProps {
  [value: string]: string;
}

export interface ISingleSelectData {
  selectedItem: string;
  queryValue: string;
  filteredItems: ISelectItem[];
  searchIndex: number;
  showDropdown: boolean;
  mappedItems: ISelectItem[];
  validation: IValidation;
}

// Textbox Component interfaces
export interface IAppTextboxData {
  inputValue: string;
  validation: IValidation; // To store the validation object
}

// Registration Component interfaces
export interface IRegistrationInputData {
  registrationValidations: Array<IValidationRule>;
  value: string;
  validation: IValidation;
}

// Date picker interfaces
export interface IDatePicker {
  selectedDate: Date | string;
  errorMessage: string;
  validation: IValidation;
}

// ToolTip interfaces
export interface IToolTipData {
  hover: boolean;
}
