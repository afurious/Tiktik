import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { client } from "./client";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const projectId = "7p47yfch";
  const apiVersion = "2022-03-10";
  const dataset = "production";
  const decoded: { name: string; picture: string; sub: string } = jwtDecode(
    response.credential
  );

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    username: name,
    image: picture,
  };

  addUser(user);

  const mutation = [
    {
      mutations: [
        {
          createIfNotExists: {
            ...user,
          },
        },
      ],
    },
  ];
  await client.createIfNotExists(user);

  // await axios.post("http://localhost:3000/api/auth", user);
};
