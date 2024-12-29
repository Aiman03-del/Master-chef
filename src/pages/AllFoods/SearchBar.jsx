/* eslint-disable react/prop-types */
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <div className="relative w-full h-14 sm:h-16 overflow-hidden rounded-2xl bg-black z-10 shadow-md">
          <RiSearch2Line className="size-6 sm:size-8 text-[#D3CCD4] absolute left-4 top-3 sm:top-4 z-[2]" />
          <div className="absolute flex items-center justify-center text-white z-[1] inset-0.5 bg-black rounded-2xl">
            <input
              type="text"
              name="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="placeholder:text-[#D3CCD4] focus:outline-none h-full w-full px-12 sm:px-16 text-sm sm:text-base lg:text-xl placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-lg rounded-2xl bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
