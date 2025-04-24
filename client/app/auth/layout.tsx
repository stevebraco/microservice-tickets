import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1>AUTH</h1>
      <div>{children}</div>
    </div>
  );
}
