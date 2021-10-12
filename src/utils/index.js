export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({},object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 若直接判断！value，当value为0的时候也是true，这是不对的，
    // 很常见的情况，因此需要写一个函数来处理
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
