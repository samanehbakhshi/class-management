"use client";

import { useQuery } from "@tanstack/react-query";
import { getClasses, getDistinctCities } from "../api/getFilterOptions";

export function useFilterOptions() {
  const classQuery = useQuery({
    queryKey: ["filterOptions", "classes"],
    queryFn: getClasses,
    staleTime: 1000 * 60 * 5,
  });

  const citiesQuery = useQuery({
    queryKey: ["filterOptions", "cities"],
    queryFn: getDistinctCities,
    staleTime: 1000 * 60 * 5,
  });
  console.log(classQuery)

  return {
    classes: classQuery.data ?? [],
    clasLoading: classQuery.isLoading,
    cities: citiesQuery.data ?? [],
    citiesLoading: citiesQuery.isLoading,
    isLoading: classQuery.isLoading || citiesQuery.isLoading,
    isError: classQuery.isError || citiesQuery.isError,
  };
}
