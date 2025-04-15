const Input = ({
  labelText,
  id,
  name,
  placeholder,
  handleOnChange,
  value,
  minLength,
  maxLength,
  disabled,
  required,
  handleOnBlur,
  textareaClassName,
  isResizeNone,
  rows,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="flex flex-col items-end">
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          disabled={disabled}
          onBlur={handleOnBlur}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          rows={rows}
          className={
            textareaClassName
              ? textareaClassName
              : `mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                  isResizeNone && "resize-none"
                }`
          }
        />
        <p className="text-gray-400">{value.length}/{maxLength}</p>
      </div>
    </div>
  );
};

export default Input;
