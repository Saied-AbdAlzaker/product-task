import React from "react";
import Link from "next/link";

export default async function HomePage() {
  let response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  let products = await response.json();

  return (
    <>
      <div className="p-5">
        <div className="grid grid-col gap-8 lg:grid-cols-4 lg:gap-6">
          {products.slice(0, 4).map((product) => (
            <div className="p-3 shadow">
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
            </div>
          ))}
        </div>
        <div className="text-center my-3">
          <Link
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            href={"/dashboard/product"}
          >
            Get all products
          </Link>
        </div>
      </div>
    </>
  );
}
