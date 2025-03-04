import { useState, useEffect, useRef } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { fetchSearchBook, searchResult, fetchBooksByTitle } = useProductStore()
    const [query, setQuery] = useState("")
    const [click, setClick] = useState(true)
    const navigate = useNavigate()
    const searchRef = useRef(null)

    useEffect(() => {
        fetchSearchBook(query) 
        setClick(true)
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
             setClick(false)
            }
          };
      
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside)
        

    }, [query]);

    return (
        <div ref={searchRef} className="relative w-full max-w-lg mx-auto text-black">
            <input
                type="text"
                placeholder="Search books by title or author..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {searchResult.length > 0 && query && click && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                    {searchResult.map((book) => (
                        <li key={book._id}
                         className="p-3 hover:bg-gray-100 cursor-pointer"
                         onClick={() => {
                            fetchBooksByTitle(book.title) 
                            navigate("/books-by-title")
                             }}
                        
                        >
                            <span className="font-semibold">{book.title}</span> - <span className="text-gray-500">{book.author}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
