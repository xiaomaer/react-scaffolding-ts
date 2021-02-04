import { useEffect } from 'react';

export interface IuseLifecyclesProps {
  mount?: Function;
  unmount?: Function;
}
/**
 * 处理mount和unmount回调函数，相当于模拟componentDidMount和componentWillUnmount中的逻辑执行
 * @param props
 */
export default function useLifecycles(props: IuseLifecyclesProps) {
  useEffect(() => {
    const { mount, unmount } = props;
    if (typeof mount === 'function') {
      mount();
    }
    return () => {
      if (typeof unmount === 'function') {
        unmount();
      }
    };
  }, [props]);
}
