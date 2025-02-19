
export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`border rounded-lg shadow-md bg-white ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
