import React from "react";
import { CiImageOn } from "react-icons/ci";

const CustomImage = ({
  label = "please select an image",
  url,
  error,
  handleImageChange,
  register
}) => {
  return (
    <div className="w-full mt-3">
      <label htmlFor="image" className="cursor-pointer block">
        <span className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </span>

        <div className="w-full h-[150px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg overflow-hidden">
          {url ? (
            <img
              src={url}
              alt="preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <CiImageOn className="w-10 h-10 text-gray-300" />
          )}
        </div>
      </label>

      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
        className="hidden"
      />

      {error && (
        <span className="text-red-500 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomImage;

