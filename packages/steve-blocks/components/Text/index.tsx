import { FC } from 'react';

export interface TextProps {
  type: 'primary' | 'normal';
}

const Text: FC<TextProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Text;
