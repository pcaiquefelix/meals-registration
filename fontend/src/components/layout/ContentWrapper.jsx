const ContentWrapper = ({
  children,
  title,
  titleIcon,
  headerContent,
  addClassName,
  contentClassName,
  buttonHtmlContent,
}) => {
  return (
    <div
      className={`w-full bg-white shadow-md rounded-lg p-6 mb-6 ${addClassName}`}
    >
      {title ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              {titleIcon}
              {title}
            </h2>
            {headerContent}
          </div>
          <div className={contentClassName}>{children}</div>
          {buttonHtmlContent}
        </>
      ) : (
        <>
          {children}
          {buttonHtmlContent}
        </>
      )}
    </div>
  );
};

export default ContentWrapper;
