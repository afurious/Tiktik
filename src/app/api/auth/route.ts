import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { client } from "../../../../utils/client";

export async function POST(request: NextApiRequest, response: NextResponse) {
  const user = request.body;

  const mutate = {
    mutations: [
      {
        createIfNotExists: {
          ...user,
        },
      },
    ],
  };
  // await client.createIfNotExists(user);

  return NextResponse.json({ message: "asdsdf" });
  // await client;
}
