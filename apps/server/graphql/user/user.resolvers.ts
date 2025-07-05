const queries = {};
const mutation = {
  createUser: (
    _: any,
    { email, password }: { email: string; password: string }
  ) => {
    console.log({ email, password });
  },
};

export const userResolver = { queries, mutation };
