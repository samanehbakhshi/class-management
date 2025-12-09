"use client";
import React from "react";
import { useFilterOptions } from "../hooks/useFilterOptions";
import Select from "@/components/form/Select";

export default function StudentsFilters({ filters, onChange }) {
  const { classes, cities } = useFilterOptions();
  const classesOptions = classes.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const citiesOption = cities.map((city: { city: string }) => {
    return { label: city.city, value: city.city };
  });
  return (
    <div className="flex gap-3">
      {/* City */}
      <Select
        options={citiesOption}
        className=""
        defaultOPtion="شهر"
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
      />
      {/* Class */}
      <Select
        options={classesOptions}
        defaultOPtion="کلاس"
        className="min-w-16"
        value={filters.class_id}
        onChange={(e) => onChange({ ...filters, class_id: e.target.value })}
      />
    </div>
  );
}
