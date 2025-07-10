type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

const asyncHandler = async <T>(
  fn: AsyncFunction<T>,
  ...args: any[]
): Promise<T | void> => {
  try {
    const response = await fn(...args);
    return response;
  } catch (error) {
    console.log(fn.name, "caused an error, the error raised is \n", error);
  }
};

export default asyncHandler;
