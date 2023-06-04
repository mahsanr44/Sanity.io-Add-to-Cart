import { client } from "@/sanity/lib/client"
import { Image as IImage } from "sanity"

import ProductCard from "./components/ProductCard"

interface IProducts {
  title: string,
  description: string,
  image: IImage,
  price: number,
  _id: string,
  category: {
    name: string
  }

}
const getData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    title,
    description,
    price,
    _id,
    image,
    category->{
      name
    }
   
  }`)
  return res
}

export default async function Home() {
  const data: IProducts[] = await getData();

  return (

    <div className="grid grid-cols-3">
      {
        data.map((item) => (
          <div key={item._id} className=" m-5 border-2 rounded-lg border-red-500 p-3 max-w-xs bg-gray-200">

            <ProductCard item={item} />
            
          </div>
        )
        )
      }
    </div>
  )
}
