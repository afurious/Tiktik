"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/Md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../../../utils";
import { useQuery } from "@tanstack/react-query";
import { Video } from "../../../../type";
import useAuthStore from "../../../../store/authstore";
import LikeButton from "../../../../components/LikeButton";
import Comments from "../../../../components/Comments";

const Details = ({ params }: any) => {
  const { id } = params;

  const [video, setVideo] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["single post"],
    queryFn: async (): Promise<Video[]> => {
      const data = await axios.get(`${BASE_URL}/api/post/singlePost/${id}`);
      const res: Video[] = data.data;
      setVideo(res);
      return res;
    },
  });

  const [post, setPost] = useState(id);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { userProfile } = useAuthStore();
  console.log(userProfile);

  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  if (!post) return null;

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (data && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [data, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: video[0]?.userId,
        postId: video[0]?._id,
        like,
      });
      console.log(data);
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/put`, {
        id,
        userId: userProfile._id,
        comment,
      });
      console.log(data);
      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (isLoading) {
    return "Loading";
  }

  return (
    <div className=" flex w-full  absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black ">
        <div className=" absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className=" text-white text-[35px]" />
          </p>
        </div>
        <div className=" relative">
          <div className=" lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={data[0]?.video?.asset.url}
              height={600}
              width={600}
              className="h-full cursor-pointer "
            ></video>
          </div>
          <div className=" absolute top-[45%] left-[45%] cursor-pointer ">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className=" text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className=" absolute bottom-5  lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className=" text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className=" text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>

      <div className=" relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className=" ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    loader={() => data[0]?.postedBy.image}
                    width={32}
                    height={32}
                    className=" rounded-full"
                    src={data[0]?.postedBy.image}
                    alt="profile shot"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className=" mt-3 flex flex-col gap-2">
                  <p className=" flex gap-2 items-center md:text-md font-bold text-primary">
                    {data[0]?.postedBy.username}{" "}
                    {`

                `}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className=" capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {data[0]?.postedBy.username}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className=" px-10 text-lg text-gray-600">{data[0].caption}</p>

          <div className=" mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handledisLike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={data[0]?.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
