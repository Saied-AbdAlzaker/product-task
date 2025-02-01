import React, { Suspense } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default async function ProductDetailsPage({ params }) {
  let { id } = await params;

  let response = await fetch(`https://fakestoreapi.com/products/${id}`);
  let product = await response.json();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center ">
          <AiOutlineLoading3Quarters size={50} />
        </div>
      }
    >
      <div className="text-center flex justify-center items-center p-4">
        <div className="w-1/3">
          <img
            alt
            src={product.image}
            className="h-40 w-100 object-cover sm:h-80 lg:h-96 rounded"
          />
        </div>
        <div className="w-1/3">
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
            <span className="text-blue-800">Title: </span> {product.title}
          </h3>
          <p className="mt-2 max-w-sm text-gray-700">
            <span className="text-blue-800">Category: </span>
            {product.category}
          </p>
          <p className="mt-2 max-w-sm text-gray-700">
            <span className="text-blue-800">Description: </span>
            {product.description}
          </p>
          <div className="flex justify-between">
            <p>
              <span className="text-blue-800">Rate: </span>{" "}
              {product.rating.rate}
            </p>
            <p>
              <span className="text-blue-800">Count: </span>
              {product.rating.count}
            </p>
          </div>
          <p>
            <span className="text-blue-800">Price: </span> {product.price}
          </p>
        </div>
      </div>
    </Suspense>
  );
}
