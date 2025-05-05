import type {TextInputProps} from 'react-native/types';

export interface UserProps {
  _id: number | null;
  image: string;
}

export interface MessageProps {
  _id: number;
  text: string;
  createdAt: Date;
  user: UserProps | null;
  audio: string;
}

export interface TChatProps extends TextInputProps {
  inverted?: boolean;
  user: UserProps | null;
  data: any[];
  showAvatarForEveryMessage?: boolean;
  alwaysShowSend?: boolean;
  HandleSendMessage: ({text, audio}: {text: string; audio: string}) => void;
  HandleLoadMore: () => void;
  HandleRefresh: () => void;
  loading: boolean;
  loadingMore: boolean;
}

export type ConversationListType = {
  _id: string;
  text: string;
  createdAt: Date;
  user: any;
  sent: boolean;
  received: boolean;
};

export type ConversionMessageType = {
  message_id: string;
  message: string;
  message_from: number;
  message_to: number;
  message_type: string;
  is_read: string;
  is_received: string;
  send_on: string;
};
