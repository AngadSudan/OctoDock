type AsyncFunction<T = any> = () => Promise<T>;

const asyncHandler = async <T>(fn: AsyncFunction<T>): Promise<T | void> => {
  try {
    const response = await fn();
    return response;
  } catch (error) {
    console.log(fn.name, "caused an error, the error raised is \n", error);
  }
};

export default asyncHandler;
