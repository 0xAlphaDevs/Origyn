import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  const { productId }: { productId: string } = await req.json();

  console.log("Getting ratings for: ", productId);
  try {
    const result = await prisma.ratings.findMany({
      where: {
        productId: productId,
      },
    });
    return NextResponse.json(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
