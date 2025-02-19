import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import  Button  from "../components/Button";

const books = {
  cs: [
    { id: 1, title: "Introduction to Algorithms", author: "Cormen", price: "$20" },
    { id: 2, title: "Operating Systems Concepts", author: "Silberschatz", price: "$18" },
  ],
  mech: [
    { id: 3, title: "Engineering Mechanics", author: "Hibbeler", price: "$15" },
    { id: 4, title: "Thermodynamics", author: "Cengel", price: "$22" },
  ],
  ee: [
    { id: 5, title: "Electrical Circuits", author: "Nilsson", price: "$17" },
    { id: 6, title: "Power Systems Analysis", author: "Grainger", price: "$25" },
  ],
  civil: [
    { id: 7, title: "Structural Analysis", author: "Hibbeler", price: "$19" },
    { id: 8, title: "Concrete Technology", author: "Shetty", price: "$21" },
  ],
};

const Test = () => {
  const { department } = useParams();
  const Test = books[department] || [];

  return (
    <div className="container mx-auto pt-10 text-yellow-300">
      <h1 className="text-3xl font-bold mb-6 capitalize">{department} Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Test.map((book) => (
          <Card key={book.id} className="bg-white shadow-lg rounded-lg p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-800 font-bold">{book.price}</p>
              <Button variant="primary" className="mt-4">Buy Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Test
