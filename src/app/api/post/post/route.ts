import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse, NextRequest } from "next/server";
import { allPostsQuery } from "../../../../../utils/queries";
import { client } from "../../../../../utils/client";

export async function POST(request: NextRequest, response: NextResponse) {
  const document = await request.json();

  try {
    await client.create(document);
    return NextResponse.json({ res: "successful" }, { status: 201 });
  } catch (error) {
    return Response.json(error);
  }
}
