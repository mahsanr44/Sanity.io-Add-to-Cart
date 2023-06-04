import { cartTable, db } from "@/sanity/lib/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";


// const url =fetch(`http://localhost:3000/api/cart?user_id=${cookies().get("user_id")?.value}`)

export const GET = async (request: NextRequest) => {
  // const req= request.nextUrl 
  // const uid=req.searchParams.get("user_id") as string
  try {
    const res = await db.select().from(cartTable);
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  const uid = uuid();
  const user_id = cookies().get("user_id");

  const setCookies = cookies();
  if (!user_id) {
    setCookies.set("user_id", uid);
  }

  try {
    const res = await db
      .insert(cartTable)
      .values({
        product_id: req.product_id,
        quantity: 1,
        user_id: cookies().get("user_id")?.value as string,
      })
      .returning();
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
};
