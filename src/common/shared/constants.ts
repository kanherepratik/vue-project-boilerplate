// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ISuffixDivisorMap } from './interfaces';

export const SUFFIX_DIVISOR_MAP: ISuffixDivisorMap = {
  thousand: 1000,
  lakh: 100000,
  crore: 10000000,
};

export const MOTOR_REGISTRATION_REGEX = '^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$';
