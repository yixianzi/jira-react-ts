import React, { ReactNode } from "react";

type FallBackRender = (props: { error: Error | null }) => React.ReactElement; // 类型别名
// export class ErrorBoundary extends React.Component<
// { children: ReactNode; fallbackRender: FallBackRender },
//   any
// > {}

// PropsWithChildren相当于一个merge和上面等同,错误边界处理只能用class组件形式
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接受到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
