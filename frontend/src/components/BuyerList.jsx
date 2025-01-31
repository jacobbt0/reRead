
const BuyerList = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800">Buyers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
     
          <div  className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            {/* Buyer Image */}
            <img
              src={"/avatar.png"}
            
              className="w-12 h-12 object-cover rounded-full"
            />
            <div>
              {/* Buyer Name */}
              <p className="text-lg font-medium text-gray-800">{"fdfdf"}</p>
            </div>
          </div>
    
      </div>
    </div>
  );
};

export default BuyerList
