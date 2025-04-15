const Button = ({
  type,
  handleOnClick,
  divWrapClassName,
  buttonClassName,
  buttonText,
  iconComponent,
}) => {
  return (
    <div className={divWrapClassName && divWrapClassName}>
      <button
        type={type}
        onClick={handleOnClick}
        className={`rounded-lg transition-colors duration-200 font-medium ${
          buttonClassName
            ? buttonClassName
            : "px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {iconComponent}
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
