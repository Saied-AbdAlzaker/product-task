"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Product() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setFilteredProducts(response.data); // Initially show all products
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Filter products based on search query
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-5">
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
         type="text"
         placeholder="Search products..."
         value={searchQuery}
         onChange={handleSearch}
          className="w-full rounded-md border-gray-700 py-2.5 p-5 shadow-xs sm:text-sm my-3"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>

      <div className="grid grid-col gap-8 lg:grid-cols-4 lg:gap-6">
        {filteredProducts.map((product) => (
          <Link
            href={`/productDetails/${product.id}`}
            className="block relative shadow p-3"
            key={product.id}
          >
            <img
              alt
              src={product.image}
              className="h-40  sm:h-80 lg:h-96 rounded"
            />
            <p className="text-teal-800">{product.category}</p>
            <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
              {product.title}
            </h3>
            <p className="mt-2 max-w-sm text-gray-700">
              {product.description.split(" ").slice(0, 10).join(" ")}
            </p>
            <div className="flex justify-between text-green-900">
              <p>{product.rating.rate}</p>
              <p>{product.rating.count}</p>
            </div>
            <span className="absolute top-0 right-0 bg-teal-800 rounded-full p-2 text-white">
              {product.price}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
