import { Input, InputButton } from './ChatInput';

export type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  attrs?: Record<string, string>;
  events?: Record<string, (e: Event) => void>;
  onChange: (e: Event) => void;
  onBlur: (e: Event) => void;
};

export type TInputButtonProps = {
  className?: string;
  attrs?: Record<string, string>;
  events?: Record<string, (e: MouseEvent) => void>;
  onClick: (e: MouseEvent) => void;
};

export type TChatInputProps = {
  className?: string;
  formData: {
    data: Record<string, string>;
  };
  Input: Input;
  Button: InputButton;
};
