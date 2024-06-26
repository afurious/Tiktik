"use client";

import React, { useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import Discover from "./Discover";
import Suggested from "./Suggested";
import Footer from "./Footer";


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  const normalLink =
    " flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded";

  return (
    <div>
      {/* Begin Toggle */}
      <div
        className=" block xl:hidden m-2 ml-4 mt-3 text=xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}

        {/* End Toggle */}
      </div>
      {/* Beginning if sidebar is true  */}
      {showSidebar && (
        <div className=" flex flex-col justify-start md-10 borber-r-2 border-grey-100 xl:border-0 p-3 w-[20rem]">
          <div className=" xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className=" text-2xl">
                  <AiFillHome />
                </p>
                <span className=" text-xl hidden xl:block">For you</span>
              </div>
            </Link>
          </div>

          <Discover />
          <Suggested />
          <Footer />
        </div>
      )}
      {/* End of sidebar  */}
    </div>
  );
};

export default Sidebar;
