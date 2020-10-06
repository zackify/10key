import { useRef, useEffect } from 'react';

export const useScrollToBottom = (messages: any) => {
  let scrollContainer = useRef<HTMLDivElement | null | undefined>();

  useEffect(() => {
    if (!scrollContainer?.current) return;

    scrollContainer.current.scrollTo(0, scrollContainer.current.scrollHeight);
  }, [messages]);

  return scrollContainer;
};
