const MyBooks = ({ product }) => {
 
  return (
    <div className="flex px-4 py-4 w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg cursor-pointer">
    
      <img className="w-full h-64 object-cover" src={product.bookImage} alt={product.name} />
      
      <div className="px-6 py-4">
     
        <h2 className="text-xl font-semibold text-green-600">{product.title}</h2>

       
        <p className="text-green-600 font-semibold text-lg mt-2">₹{product.price}</p>
      </div>
    </div>
  );
};

export default MyBooks
