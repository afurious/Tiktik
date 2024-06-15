"use client";

import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified, GoVideo } from "react-icons/go";

import { Video } from "../type";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }: { post: Video }) => {
  const loader = (url: string) => url;

  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  // return <div>HEllo</div>;

  return (
    <div className=" flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className=" md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  loader={() => loader(post?.postedBy.image)}
                  width={32}
                  height={32}
                  className=" rounded-full"
                  src={post?.postedBy.image}
                  alt="profile shot"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className=" flex items-center gap-2">
                <p className=" flex gap-2 items-center md:text-md font-bold text-primary">
                  {post?.postedBy.username}{" "}
                  {`

                `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className=" capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post?.postedBy.username}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl "
        >
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className=" lg:w-[600px] h-[400px] md:h-[400px] lg:h-[400px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post?.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div className=" absolute bottom-[4rem] cursor-pointer flex gap-6 justify-center w-full">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className=" text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className=" text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className=" text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className=" text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
