const tag = [
  "milestone",
  "small-wins",
  "travel",
  "reflection",
  "social",
  "family",
  "work",
  "wellness",
  "creativity",
  "grateful",
];

import { RiSearchLine } from "react-icons/ri";
const SearchBar = ({setSearch,setTag}) => {
    return (
        <div id="filter-bar" className="py-4 flex justify-between w-3/4 mx-auto">
            <div className="relative w-2/3">
                <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search memory"
                    className="pl-10 w-full p-2.5 border border-zinc-300 rounded"
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>

            <select
                name=""
                id=""
                className="w-1/4 border border-zinc-200 rounded-md p-2"
                onChange={(e)=>setTag(e.target.value)}
            >
                <option value="">All</option>
                {tag.map((t, i) => (
                    <option key={i} value={t}>
                        {t}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SearchBar