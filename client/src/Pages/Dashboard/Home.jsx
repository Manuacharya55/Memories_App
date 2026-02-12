import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../Components/UI/Card";
import Pagination from "../../Components/Shared/Pagination";
import SearchBar from "../../Components/Shared/SearchBar";
import Shimmer from "../../Components/Loaders/Shimmer";
import { useMemory } from "../../Hooks/useMemory";
import { useAuthContext } from "../../Context/AuthContext";


const Home = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const { memories, loading, fetchMemories, deleteMemory } = useMemory();
  const { token } = useAuthContext();

  const fetchData = async () => {
    if (!token) return;
    const res = await fetchMemories("memories", page, tag, search, token)
  }

  useEffect(() => {
    fetchData()
  }, [token, page, tag, search])

  const handleDelete = async (id) => {
    const res = await deleteMemory(`memories/${id}`, token)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 w-full h-screen overflow-hidden overflow-y-scroll bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SearchBar setSearch={setSearch} setTag={setTag} />

        <div id="memory-container" className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {loading ?
            Array.from({ length: 8 }).map((_, index) => (
              <Shimmer key={index} />
            ))
            :
            memories?.data?.length > 0 ? (
              memories.data.map((memory, index) => (
                <Card
                  key={index}
                  image={memory.image}
                  title={memory.title}
                  date={memory.date.split("T")[0]}
                  tag={memory.tag}
                  _id={memory._id}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                <p className="text-lg font-medium">No memories found</p>
                <p className="text-sm">Create some new memories to see them here!</p>
              </div>
            )
          }
        </div>

        {memories?.data?.length > 0 && <Pagination pagination={memories.pagination} />}
      </div>
    </div>
  );
};

export default Home;
