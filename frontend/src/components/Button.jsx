 const Button = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-400 text-gray-600 hover:bg-gray-200",
    chat: "bg-green-600 text-white hover:bg-green-700", 
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button
