// import { IFormSchema } from "./interfaces/common";

// interface IFormParser {
//     jsonForm: IFormSchema
//     formSchema: any
//     parseData: (data: IFormSchema) => any
// }

// export default class FormParser implements IFormParser{
//     private jsonForm: IFormSchema
//     private formSchema: any

//     constructor(jsonForm: IFormSchema){
//         this.jsonForm = jsonForm
//         this.formSchema = this.parseData(this.jsonForm)
//     }
//     public parseData = (data: IFormSchema): any => {
//         // this.formSchema = this.jsonForm.children?.map((container) => {

//         // })
//         return data
//     }
//     public getSchema = () => this.formSchema
// }
/**
 * Determines if a form is accessible and can be navigated to.
 * A form is accessible when it is placed before the active form.
 * @param index Index position of a form which is within a form array
 * @param activeIndex Index position of the active form which is within a form array
 */
export const canNavigate = (index: number, activeIndex: number, isFormHidden: boolean): boolean => {
  return !isFormHidden && index < activeIndex;
};
