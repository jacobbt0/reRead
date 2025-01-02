

const ProductPage = ({book}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-emerald-600  min-h-screen flex items-center justify-center">
    <div className="max-w-4xl mx-auto bg-gray-200  rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center p-8 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full h-full">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="w-full  text-center lg:text-left">
          <h1 className="text-4xl font-semibold text-gray-800 hover:text-emerald-600 transition-all duration-300">{book.name}</h1>
          <h2 className="text-xl text-emerald-600 mt-2">{book.author}</h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Department:</span>
              <span>{book.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Semester:</span>
              <span>{book.semester}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Condition:</span>
              <span>{book.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Price:</span>
              <span className="text-emerald-600 text-2xl font-bold">{book.price}</span>
            </div>
          </div>
          <button className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition duration-300 ease-in-out transform hover:scale-105">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductPage