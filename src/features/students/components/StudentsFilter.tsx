"use client";
import React from "react";
import { useFilterOptions } from "../hooks/useFilterOptions";

export default function StudentsFilters({ filters, onChange }) {
  const { classes, cities } = useFilterOptions();
  console.log(cities, classes);
  return (
    <div className="flex gap-3">
      {/* City */}
      <select
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
        className="border p-2 rounded"
      >
        <option value={"All cities"}>All Cities</option>
        {cities.map((city) => {
          return (
            <>
              <option value={city.city}>{city.city}</option>
            </>
          );
        })}
      </select>
      {/* Class Id */}
      <select
        value={filters.class_id}
        onChange={(e) => onChange({ ...filters, class_id: e.target.value })}
        className="border p-2 rounded"
      >
      
        <option value={"All Classes"}>All Calsses</option>
        {classes.map((item) => {
          return (
            <>
              <option value={item.class_id}>{item.name}</option>
            </>
          );
        })}
      </select>
    </div>
  );
}
