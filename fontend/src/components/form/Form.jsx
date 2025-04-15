const Form = ({
  children,
  formTitle,
  formTitleIcon,
  handleSubmit,
  isSomeComponentRequired,
}) => {
  return (
    <div className="w-form-default bg-white shadow-md rounded-lg p-8">
      {isSomeComponentRequired ? (
        <div className="flex flex-col gap-3 items-center justify-center mb-8">
          <div className="flex items-center justify-center">
            {formTitleIcon}
            <h2 className="text-2xl font-bold text-gray-800">{formTitle}</h2>
          </div>
          <div className="w-full flex items-center justify-end">
            <h4 className="opacity-70 text-red-400">
              Fields marked with * are required
            </h4>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-6">
          {formTitleIcon}
          <h2 className="text-2xl font-bold text-gray-800">{formTitle}</h2>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  );
};

export default Form;
