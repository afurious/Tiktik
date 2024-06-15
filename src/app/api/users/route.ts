import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { allUsersQuery } from "../../../../utils/queries";
import { client } from "../../../../utils/client";
type Data = {
  name: string;
};

export async function GET(request: NextApiRequest) {
  const data = await client.fetch(allUsersQuery());

  if (data) {
    return Response.json(data);
  } else {
    return Response.json([]);
  }
  // console.log(data);
  // return NextResponse.json({ message: "Running user" });
}
