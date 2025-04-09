import type { InputHTMLAttributes, Ref } from 'react';

type TVerifyInputHandler = {
  focus: ()=> void;
};

type TInputVerificationCodeProps = {
  ref: Ref<TVerifyInputHandler>;
  autoFocus?: boolean;
  inputSlotProps?: InputHTMLAttributes<HTMLInputElement>;
  invalid?: boolean;
  length?: number;
  onChange?: (data: string)=> void;
  onCompleted?: (code: string)=> unknown;
  placeholder?: string;
  valid?: boolean;
  value?: string;
  variant?: 'alphanumeric' | 'number';
};

export { type TInputVerificationCodeProps, type TVerifyInputHandler };
