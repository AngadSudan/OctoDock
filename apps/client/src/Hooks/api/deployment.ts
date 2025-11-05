import { useQuery } from "@apollo/client";
import { GET_ALL_DEPLOYMENT } from "../deployment";

export const useGetAllDeploymentData = (userId) => {
  const { data, loading, error } = useQuery(GET_ALL_DEPLOYMENT, {
    variables: { id: userId },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !userId,
  });
  console.log(data);
  return { data, loading, error };
};
