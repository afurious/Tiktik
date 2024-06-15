import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse, NextRequest } from "next/server";
import { allPostsQuery } from "../../../../../../utils/queries";
import { client } from "../../../../../../utils/client";

import { postDetailQuery } from "../../../../../../utils/queries";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  const query = postDetailQuery(id);

  const data = await client.fetch(query);
  return Response.json(data, {
    status: 200,
  });
}
