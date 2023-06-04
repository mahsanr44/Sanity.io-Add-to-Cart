"use client"
import React, { FC } from 'react'
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"



const ProductCard: FC<{ item: any }> = ({ item }) => {

  const handleAddtoCart = async () => {
    const res = await fetch("/api/cart",
      {
        method: "POST",
        body: JSON.stringify({
          product_id: item._id
        })

      })

    const result = await res.json()
    console.log(result)
  }

  return (
    <div>
      <p className="text-pink-400">{item.category.name}</p>
      <h1 className="font-bold text-xl">
        {item.title}:
      </h1>
      <p>
        {item.description}
      </p>
      <Image
        className="rounded-lg my-2"
        src={urlForImage(item.image).url()} width={200} height={200} alt="product" />
      <button
        onClick={handleAddtoCart}
        className="bg-blue-500 rounded-lg p-2 max-w-fit px-4 text-white ">${item.price}</button>
    </div>

  )
}

export default ProductCard
