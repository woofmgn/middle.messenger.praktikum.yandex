import Block from '../../utils/Block';
import Input from './Input';

export type TAuthInputProps = {
  className?: string;
  name: string;
  id: string;
  label: string;
  optionalClass?: string;
  error?: string;
  type?: string;
  onBlur: (e: Event) => void;
  onChange: (e: Event) => void;
  Input?: Input;
};

export type TInputProps = {
  optionalClass?: string;
  className?: string;
  name: string;
  id: string;
  type?: string;
  attrs?: Record<string, string>;
  events?: Record<string, (e: Event) => void>;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export type TAuthInputError = Block<Pick<TAuthInputProps, 'error'>>;
