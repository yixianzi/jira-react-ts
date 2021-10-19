import React from "react";

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

  // 当子组件抛出异常，这里会接受到并且调用,有这个周期函数，就代表是个错误抛出处理组件，即错误边界
  static getDerivedStateFromError(error: Error) {
    return { error }; // 相当于改变了state里的error，缩写{error: error}
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
