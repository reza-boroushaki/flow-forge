"use client";

import React from "react";
import { categoryFilters } from "../constant";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Categories = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleTags = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", cat);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
