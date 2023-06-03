import { client } from "@/sanity/lib/client"

export const getData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    title,
    description,
   
  }`)
  return res
}

interface IProducts {
  title: string,
  description: string

}

export default async function Home() {
  const data: IProducts[] = await getData();
  console.log(data)
  return (

    <>
      {
        data.map((item) => (
          <div className="m-5">
            <h1 className="font-bold text-xl">
              {item.title}:
            </h1>
            <p>
              {item.description}
            </p>
          </div>
        )
        )
      }     </>
  )
}
