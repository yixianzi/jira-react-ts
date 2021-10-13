import { useEffect, useState } from "react";
export const isFalsy = (value: any) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    // 若直接判断！value，当value为0的时候也是true，这是不对的，
    // 很常见的情况，因此需要写一个函数来处理
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

//
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const useDebounce = (value, delay) => {
// 会出现多次创建，未知？？
//   const [debounceParam, setDebounceParam] = useState(value);
//  let timer
//   useEffect(() => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       setDebounceParam(value);
//     }, delay);
//   }, [value]);
//   return debounceParam;
// };

export const useDebounce = (value: any, delay?: number) => {
  const [debounceParam, setDebounceParam] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => {
      setDebounceParam(value);
    }, delay);
    // 每次在上一个useEffect处理完之后再运行
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceParam;
};
