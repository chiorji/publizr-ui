import { useMemo } from 'react';
import { useGetAllCategoriesQuery } from "./category-slice";
import { OptionContract } from "../types";

export const useGetAllCategories = () => {
  const { data, isLoading, error, refetch } = useGetAllCategoriesQuery();

  const options: OptionContract[] = useMemo(() => {
    if (!data) return [];
    return data.data.map((category) => ({ value: category.id, label: category.name }));
  }, [data]);

  return {
    data: options,
    isLoading,
    error,
    refetch
  };
}