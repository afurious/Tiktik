import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { allPostsQuery } from "../../../../../utils/queries";
import { client } from "../../../../../utils/client";

export async function GET(request: NextApiRequest, response: NextResponse) {
  const query = allPostsQuery();

  const data = await client.fetch(query);
  return Response.json(data, {
    status: 200,
  });
}
