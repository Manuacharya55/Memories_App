import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Shimmer = () => {
  return (
    <div className="relative w-56 h-80 rounded-2xl overflow-hidden bg-zinc-300 animate-pulse">

      {/* Tag Skeleton */}
      <div className="absolute top-4 left-4 w-16 h-6 rounded-full bg-zinc-200"></div>

      {/* Three Dot Skeleton */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-200"></div>

      {/* Content Skeleton */}
      <div className="absolute bottom-0 p-4 w-full">
        <div className="h-5 w-full bg-zinc-200 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-zinc-200 mt-3 rounded-lg"></div>
      </div>

    </div>
  );
};

export default Shimmer;
