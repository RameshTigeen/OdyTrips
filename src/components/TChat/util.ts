import React from 'react';
import dayjs from 'dayjs';

import type {MessageProps, UserProps} from './type';

export function GetTimeZone() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  return locale;
}

export function isSameDay(
  currentMessage: any,
  diffMessage: any | null | undefined,
) {
  if (!diffMessage || !diffMessage.createdAt) return false;

  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) return false;

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser({
  message,
  user,
}: {
  message: MessageProps;
  user: UserProps | null;
}) {
  if (!user || !message.user) return false;

  return !!(message.user?._id === user?._id);
}

export const FormatTime = (value: Date) => {
  const timeZone = GetTimeZone();
  const date = new Date(value);
  const options: any = {hour: 'numeric', minute: 'numeric', hour12: true};
  return new Intl.DateTimeFormat(timeZone, options).format(date);
};

export const GenerateRandomId = (value: string) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = value;

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

export function UpdateEffect(
  callback: () => void,
  dependencies: React.DependencyList,
) {
  const hasMountedRef = React.useRef(true);

  React.useEffect(() => {
    if (hasMountedRef.current) {
      hasMountedRef.current = false;
      return;
    }
    callback();
  }, [...dependencies]);
}
