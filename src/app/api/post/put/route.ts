import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse, NextRequest } from "next/server";
import { allPostsQuery } from "../../../../../utils/queries";
import { client } from "../../../../../utils/client";
import { uuid } from "uuidv4";

export async function PUT(request: NextRequest, response: NextResponse) {
  const { comment, userId, id } = await request.json();

  // const { id }: any = request.json();

  console.log(comment, userId, id);
  try {
    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: "postedBy", _ref: userId },
        },
      ])
      .commit();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
