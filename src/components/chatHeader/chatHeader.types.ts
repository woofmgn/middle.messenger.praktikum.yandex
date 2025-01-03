import { TGetChatListResponse } from '../../api/ChatApi/types';
import { ChatDropdown } from '../chatDropdown';
import { UserModal } from '../userModal';
import { HeaderButton } from './ChatHeader';

export type THeaderButtonProps = {
  className?: string;
  events?: Record<string, () => void>;
};

export type TChatHeaderProps = {
  avatar: string;
  name?: string;
  isShownDropdown?: boolean;
  currentChat?: TGetChatListResponse;
  className?: string;
  isOpenedModal?: boolean;
  modalTypeAdd?: boolean;
  HeaderButton?: HeaderButton;
  ChatDropdown?: ChatDropdown;
  UserModal?: UserModal;
};
