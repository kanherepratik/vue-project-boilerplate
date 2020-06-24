import { IContainerSchema, IContainerComponentParentSchema, IStepContainer } from './interfaces';

/**
 * Determines if a form is accessible and can be navigated to.
 * A form is accessible when it is placed before the active form.
 * @param {number} index Index position of a form which is within a form array
 * @param {boolean} isFormHidden
 * @param activeIndex Index position of the active form which is within a form array
 */
export const canNavigate = (index: number, activeIndex: number, isFormHidden: boolean): boolean => {
  return !isFormHidden && index < activeIndex;
};

/**
 * returns First visible Container in the given schema
 * @param {IStepContainer[]} schema
 * @returns {number}
 */
export const getFirstVisibleContainerIndex = (schema: IStepContainer[]): number => {
  const index: number = schema.findIndex((container: IStepContainer) => !container.isHidden);
  return index === -1 ? 0 : index;
};

/**
 * returns Last visible Container in the given schema
 * @param {IStepContainer[]} schema
 * @returns {number}
 */
export const getLastVisibleContainerIndex = (schema: IStepContainer[]): number => {
  const reverseContainers: IStepContainer[] = [...schema].reverse();
  const reverseContainerIndex: number = reverseContainers.findIndex((container: IStepContainer) => !container.isHidden);
  return reverseContainerIndex === -1 ? schema.length - 1 : Math.abs(reverseContainerIndex - (schema.length - 1));
};

/**
 * returns index of previous container in the given schema
 *
 * @param {IStepContainer[]} schema
 * @param {number} formIndex
 * @returns {number}
 */
export const getPreviousContainerIndex = (schema: IStepContainer[], formIndex: number): number => {
  const reverseContainers: IStepContainer[] = [...schema].reverse();
  const reverseContainerIndex: number = Math.abs(formIndex - (schema.length - 1));
  const reverseNextFormIndex: number = reverseContainers.findIndex(
    (container: IStepContainer, index: number) => index > reverseContainerIndex && !container.isHidden
  );
  return reverseNextFormIndex === -1 ? formIndex : Math.abs(reverseNextFormIndex - (schema.length - 1));
};

/**
 * returns index of active container in the given schema
 *
 * @param {IStepContainer[]} schema
 * @param {string} activeContainerId
 * @returns {number}
 */
export const getActiveContainerIndex = (schema: IStepContainer[], activeContainerId: string): number => {
  return schema.findIndex((container: IStepContainer) => container.id === activeContainerId && !container.isHidden);
};
