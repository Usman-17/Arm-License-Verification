import { useQuery } from "@tanstack/react-query";

const useGetAllLicense = () => {
  const {
    data: licenses,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["licenses"],
    queryFn: async () => {
      const response = await fetch("/api/license/all");

      if (!response.ok) {
        throw new Error("Failed to fetch licenses");
      }

      return response.json();
    },
    retry: false,
  });

  return { licenses, isLoading, error, refetch, isRefetching };
};

export { useGetAllLicense };
