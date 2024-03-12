"use client";

import React from "react";
import { categoryFilters } from "../constant";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleTags = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", cat);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="container max-w-[980px] mb-12">
      <h2 className="text-[24px] md:text-[82px] my-20 md:mb-20 md:mt-0 md:leading-tight text-center font-bold">
        We support you <br /> with any background
      </h2>
      <ul className="flex flex-wrap justify-center items-center gap-2">
        {categoryFilters.map((filter) => (
          <Button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            variant="outline"
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
