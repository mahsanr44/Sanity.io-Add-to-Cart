import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import { Image as IImage } from "sanity"
export const getData = async () => {
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

interface IProducts {
  title: string,
  description: string,
  image:IImage,
  price:number,
  _id:string,
  category:{
    name:String
  }

}

export default async function Home() {
  const data: IProducts[] = await getData();
  console.log(data)
  return (

    <div className="grid grid-cols-3">
      {
        data.map((item) => (
          <div key={item._id} className=" m-5 border-2 rounded-lg border-red-500 p-3 max-w-xs bg-gray-200">
            <p className="text-pink-400">{item.category.name}</p>
            <h1 className="font-bold text-xl">
              {item.title}:
            </h1>
            <p>
              {item.description}
            </p>
            <Image
            className="rounded-lg my-2"
            src={urlForImage(item.image).url()} width={200} height={200} alt="product"/>
            <button className="bg-blue-500 rounded-lg p-2 max-w-fit px-4 text-white ">${item.price}</button>
            
          </div>
        )
        )
      }     </div>
  )
}
