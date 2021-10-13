import React from "react";
import { useMount, useArray } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "yixianzi", age: 18 },
    { name: "xiaoliuya", age: 18 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    // 下面几个需要报错
    // console.log(value.notExist);
    // add({ name: "gg" });
    // removeIndex("123");
  });

  return (
    <div>
      <button onClick={() => add({ name: "ggg", age: 22 })}>add</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { age: number; name: string }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
