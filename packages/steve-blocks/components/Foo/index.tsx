import { FC } from 'react';

export interface FooProps {
  /** 大小 */
  size: number;
}

const Foo: FC<FooProps> = ({ size }) => {
  return <div>{size}</div>;
};

export default Foo;