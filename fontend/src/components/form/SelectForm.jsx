const SelectForm = ({
  labelText,
  id,
  name,
  placeholder,
  handleOnChange,
  value,
  disabled,
  required,
  handleOnBlur,
  selectClassName,
  icon,
  list,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
        {required && <span className="text-red-400">*</span>}
      </label>
      {icon ? (
        <div className="relative">
          <select
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            disabled={disabled}
            required={required}
            onBlur={handleOnBlur}
            className={
              selectClassName
                ? selectClassName
                : "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          >
            {list.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        </div>
      ) : (
        <select
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          disabled={disabled}
          required={required}
          onBlur={handleOnBlur}
          className={
            selectClassName
              ? selectClassName
              : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        >
          {list.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectForm;
