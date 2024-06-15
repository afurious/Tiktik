import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse, NextRequest } from "next/server";
import { uuid } from "uuidv4";
import { client } from "../../../../utils/client";

export async function PUT(request: NextRequest, response: NextResponse) {
  const { userId, postId, like } = await request.json();

  // console.log(body);

  try {
    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    return NextResponse.json(data);
  } catch (error) {
    return Response.json({ message: error });
  }
}
