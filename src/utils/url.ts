import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "utils";
/**
 * 返回页面url中，指定建的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator 遍历器
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
