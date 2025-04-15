const SubmitButtonForm = ({
  divWrapClassName,
  buttonClassName,
  handleOnClick,
  iconComponent,
  buttonText,
}) => {
  return (
    <div className={divWrapClassName ? divWrapClassName : "pt-4"}>
      <button
        type="submit"
        className={
          buttonClassName
            ? buttonClassName
            : "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        }
        onClick={handleOnClick}
      >
        {iconComponent}
        {buttonText}
      </button>
    </div>
  );
};

export default SubmitButtonForm;
