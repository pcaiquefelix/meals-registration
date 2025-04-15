const InputForm = ({
  type,
  labelText,
  id,
  name,
  placeholder,
  handleOnChange,
  value,
  min,
  max,
  disabled,
  required,
  handleOnBlur,
  divWrapClassName,
  inputClassName,
  iconComponent,
  customInnerInput,
}) => {
  return (
    <div className={divWrapClassName}>
      {labelText && <label
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText}
        {required && <span className="text-red-400">*</span>}
      </label>}
      {iconComponent || customInnerInput ? (
        <div className="relative">
          <input
            type={type}
            min={min}
            max={max}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            disabled={disabled}
            required={required}
            onBlur={handleOnBlur}
            className={
              inputClassName
                ? inputClassName
                : `w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    customInnerInput ? "px-10" : "pl-10 pr-3"
                  }`
            }
          />
          {customInnerInput ? (
            customInnerInput
          ) : (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {iconComponent}
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          min={min}
          max={max}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          disabled={disabled}
          required={required}
          onBlur={handleOnBlur}
          className={
            inputClassName
              ? inputClassName
              : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
          }
        />
      )}
    </div>
  );
};

export default InputForm;
