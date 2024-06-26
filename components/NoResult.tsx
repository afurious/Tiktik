import React from "react";
import { MdOutlineVideocamOff } from "react-icons/Md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
  text: string;
}

const NoResult = ({ text }: IProps) => {
  return (
    <div className=" flex flex-col justify-center items-center h-full w-full">
      <p className=" text-8xl">
        {text == "No comment yet" ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
