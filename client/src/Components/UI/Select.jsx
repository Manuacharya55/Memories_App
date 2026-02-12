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

const Select = ({ label, name, register, error }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mt-3">
        {label}
      </label>

      <select
        {...register(name)}
        className="w-full p-2.5 border border-zinc-300 rounded mt-2"
      >
        <option value="">Select tag</option>
        {tag.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-red-500 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;