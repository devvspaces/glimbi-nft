import Navbar from "@/components/nav";
import React, { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
