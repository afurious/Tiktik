// import SanityClient from "next-sanity-client";

// import sanityClient from "@sanity/client";
import { createClient } from "next-sanity";

// export const client = sanityClient({
//   projectId: "7p47yfch",
//   dataset: "production",
//   apiVersion: "2022-03-10",
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
// });

export const client = createClient({
  projectId: "ss2yskfa",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
