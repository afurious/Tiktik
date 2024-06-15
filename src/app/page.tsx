"use client";

import type { NextPage } from "next";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Video } from "../../type";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { BASE_URL } from "../../utils";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Video[]> => {
      const data = await axios.get(`${BASE_URL}/api/post/get`);
      const res: Video[] = data.data;
      return res;
    },
    staleTime: 10,
  });

  if (isLoading) {
    return "Loading";
  }
  console.log(data);

  return (
    <div className=" flex flex-col gap-10 videos h-full">
      {data?.length ? (
        data?.map((item) => {
          return <VideoCard post={item} key={item._id} />;
        })
      ) : (
        <NoResult text={"No Result"} />
      )}
    </div>
  );
};

export default Home;
