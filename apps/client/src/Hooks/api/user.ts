import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/Hooks/user";

export const useGetUserProfile = (userId) => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId },
    fetchPolicy: "cache-and-network",
    skip: !userId,
  });

  return { data, loading, error };
};
