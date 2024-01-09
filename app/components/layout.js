"use client";
import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import Sidebar from "components//Sidebar";
import { getCookie } from "cookies-next";
import { contextManager } from "context/store";
const IndexLayout = ({ children }) => {
  const [processing, setProcessing] = useState(false);
  const { setCollegeData } = contextManager();

  let token = getCookie("token");
  let collegeData = getCookie("collegeData");

  useEffect(() => {
    setCollegeData(JSON.parse(collegeData));

    if (!token) {
      redirect("/");
    } else {
      setProcessing(true);
    }
  }, []);

  return (
    processing && (
      <div className="mainsection">
        <Navbar />
        <main className="mainbody">
          <Sidebar />
          <section className="pagesection scrollbar">{children}</section>
        </main>
      </div>
    )
  );
};

export default IndexLayout;
