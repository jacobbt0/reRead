import { Link } from "react-router-dom";
import { MessageCircle, Trash, FilePenLine, Edit } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const MyBooks = ({ product }) => {
  
  const { deleteProduct, } = useProductStore()
  
  return (
    <div className="flex px-4 py-4 w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg cursor-pointer">
      <div className="flex ">
        <button
          // onClick={handleEdit}
          className="flex items-center  text-white transition duration-20 m-3 ml-5"
        >
          <Edit className="mr-2" size={20} />
          Edit
        </button>

        {/* Delete Button */}
        <button
          //onClick={handleDelete}
          className="flex items-center text-white transition duration-200 m-3 ml-20"
        >
          <Trash className="mr-2" size={20} />
          Delete
        </button>
      </div>
      <img className="w-full h-64 object-cover" src={product.bookImage} alt={product.name} />

      <div className="px-6 py-4">

        <h2 className="text-xl font-semibold text-green-600">{product.title}</h2>

        <p className="text-green-600 font-semibold text-lg mt-2">₹{product.price}</p>

        <Link
          to={"/chat"}

          className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 mt-2 '

        >

          < MessageCircle size={22} className='mr-2' />
          Chat

        </Link>


        <button
          // onClick={handleEdit}
          className="flex items-center  text-white transition duration-20 m-3"
        >
          <Edit className="mr-2" size={20} />
          Edit
        </button>

        <button
       
          //onClick={ () => deleteProduct(product?._id)}
          className="flex items-center text-white transition duration-200 m-3 "
        >
          <Trash className="mr-2" size={20} />
          
          Delete
        </button>

      </div>
    </div>
  );
};

export default MyBooks
