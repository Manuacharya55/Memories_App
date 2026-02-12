import React from 'react'
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ pagination = {} }) => {
    const { currentPage = 1, hasNextPage = false, hasPreviousPage = false, totalPage = 1 } = pagination;
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("page", newPage);
        setSearchParams(current);
    };

    if (totalPage <= 1) return null;

    return (
        <div id="pagination" className='w-full flex justify-center items-center gap-4 py-8 mt-4 border-t border-gray-100'>
            <button
                className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${hasPreviousPage
                        ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-black shadow-sm'
                        : 'bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed'}`}
                onClick={() => hasPreviousPage && handlePageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
            >
                <TbChevronLeft className="text-lg" />
                <span>Previous</span>
            </button>

            <div className="flex items-center gap-1 font-medium text-sm text-zinc-600 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-100">
                <span className="text-zinc-900 font-bold">{currentPage}</span>
                <span className="text-zinc-400">/</span>
                <span>{totalPage}</span>
            </div>

            <button
                className={`px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${hasNextPage
                        ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-black shadow-sm'
                        : 'bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed'}`}
                onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                <span>Next</span>
                <TbChevronRight className="text-lg" />
            </button>
        </div>
    )
}

export default Pagination;