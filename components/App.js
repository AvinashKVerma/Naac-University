"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";
import { contextManager } from "context/store";

export default function App() {
  const { setBaseURL } = contextManager();
  const environ = process.env.BASE_URL;

  useEffect(() => {
    setBaseURL(environ);
    const token = getCookie("token");
    const colledata = getCookie("collegeData");
    const studentData = getCookie("studentData");
    if (token && colledata) {
      redirect("/components");
    } else if (token && studentData) {
      redirect("/student-portal/feedback-form");
    } else {
      redirect("/login");
    }
  }, []);

  return <div className="maindiv">{/* <LandingPage /> */}</div>;
}
