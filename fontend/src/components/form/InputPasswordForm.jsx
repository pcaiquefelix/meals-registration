import { Eye, EyeOff, Lock } from "lucide-react";
import InputForm from "./InputForm";
import { useState } from "react";

const InputPasswordForm = ({
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputForm
      type={showPassword ? "text" : "password"}
      min={min}
      max={max}
      name={name}
      id={id}
      labelText={labelText}
      placeholder={placeholder}
      handleOnChange={handleOnChange}
      value={value}
      disabled={disabled}
      required={required}
      handleOnBlur={handleOnBlur}
      divWrapClassName={divWrapClassName}
      className={inputClassName}
      customInnerInput={
        <>
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2  transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {value && (showPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
          </button>
        </>
      }
    />
  );
};

export default InputPasswordForm;
