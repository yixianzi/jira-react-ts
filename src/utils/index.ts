import { useEffect, useState } from "react";
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 若直接判断！value，当value为0的时候也是true，这是不对的，
    // 很常见的情况，因此需要写一个函数来处理
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

//
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，和useCallback和useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDebounce = <V>(value: V, delay?: number) => {
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

interface Person {
  name: string;
  age: number;
}
export const useMyArray = (persons: Person[]) => {
  const [value, setValue] = useState(persons);
  const add = (p: Person) => {
    const newV = [...value, p];
    setValue(newV);
  };

  const removeIndex = (index: number) => {
    const newV = value.slice();
    newV.splice(index, 1);
    setValue(newV);
  };

  const clear = () => {
    setValue([]);
  };

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};

// 对比上面的方法，使用了泛型，传入的类型就可以灵活了，适用于多种数组
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
