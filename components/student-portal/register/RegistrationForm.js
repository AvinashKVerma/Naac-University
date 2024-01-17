"use client";
import React, { useState } from "react";
import { config } from "apiCalls/Configuration";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VerifyStuEmail from "../verify-email/VerifyEmail";

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    stdRegNo: "",
    department: "",
    emailID: "",
    conf_email: "",
    mobileNo: "",
    password: "",
  });
  const [shortEmail, setShortEmail] = useState("");
  const [emailVerifyModal, setEmailVerifyModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === "mobileNo") {
    //   const mobileNumberPattern = /^[6-9]\d{9}$/;

    //   if (
    //     isNaN(value) ||
    //     parseFloat(value[0]) < 6 ||
    //     value.length !== 10 ||
    //     !/^[0-9]+$/.test(value)
    //   ) {
    //     console.log("Invalid mobile number");
    //     // You can handle the error state or message here
    //     // For example, set an error state or display a message to the user
    //     return;
    //   }
    // }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formsData = new FormData();
    formsData.append("stdName", formData.name);
    formsData.append("stdRegNo", formData.stdRegNo);
    formsData.append("stdEmail", formData.emailID);
    formsData.append("stdMobile", formData.mobileNo);
    formsData.append("stdDep", formData.department);
    formsData.append("password", formData.password);

    try {
      const response = await fetch(`${config.BASE_URL}/api/auth/std/register`, {
        method: "POST",
        body: formsData,
      });
      const responseTxt = await response.text();

      if (responseTxt === "Student with the given details already exists") {
        config.notify("User already exist", "error");
        closeModel();
        return;
      } else if (response.ok) {
        router.push("/student-portal/login");
      } else {
        config.notify("Something Went Wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModel = () => {
    setEmailVerifyModal(false);
  };

  const openModal = async () => {
    if (formData.emailID === formData.conf_email) {
      const otpForm = new FormData();
      otpForm.append("email", formData.emailID);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send-otp`,
        {
          method: "POST",
          body: otpForm,
        }
      );

      const data = await response.text();
      if (
        data === "Email Already Register" ||
        data === "Invalid email address"
      ) {
        window.alert(data);
        closeModel();
        return;
      }

      if (!response) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      // Check if the response status is OK (200)
      if (response.status === 200 || response.status === 201) {
        const [username, domain] = formData.emailID.split("@");
        const len = username.length;
        const maskedUsername =
          username.charAt(0) + "*****" + username.charAt(len - 1);
        setShortEmail(`${maskedUsername}@${domain}`);
      }
      setEmailVerifyModal(true);
    } else {
      alert("Please enter same email");
    }
  };

  return (
    <div className="bg-white border border-cyan-600 items-center justify-center mt-6 p-6 shadow-[0_0_0_15px_rgba(0,0,0,0.4)] w-1/2">
      <h2 className="items-center text-2xl text-center text-[#3c8dbc] pb-2">
        Student Portal
      </h2>
      <h3 className="items-center text-xl text-center text-[#804952]">
        Registration for Student Feedback
      </h3>
      <form className="mt-6">
        {/* Name */}
        <div className="mb-4 flex">
          <label
            htmlFor="name"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* University Registration number */}
        <div className="mb-4 flex">
          <label
            htmlFor="stdRegNo"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            University Registration Number
          </label>
          <input
            type="text"
            id="stdRegNo"
            name="stdRegNo"
            value={formData.stdRegNo}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter your University Registration Number"
            required
          />
        </div>

        {/* Department */}
        <div className="mb-4 flex">
          <label
            htmlFor="department"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter your Department"
            required
          />
        </div>

        {/* Email Id */}
        <div className="mb-4 flex">
          <label
            htmlFor="emailID"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Email Id
          </label>
          <input
            type="email"
            id="emailID"
            name="emailID"
            value={formData.emailID}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Re-enter email Id */}
        <div className="mb-4 flex">
          <label
            htmlFor="conf_email"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Re-enter Email Id
          </label>
          <input
            type="email"
            id="conf_email"
            name="conf_email"
            value={formData.conf_email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Re-enter email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex">
          <label
            htmlFor="password"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            placeholder="Enter a secure password"
            required
          />
        </div>

        {/* Mobile number for communication */}
        <div className="mb-4 flex">
          <label
            htmlFor="mobileNo"
            className="flex text-base items-center font-semibold text-gray-900 w-2/5"
          >
            Mobile number for communication
          </label>
          <input
            type="number"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-3/5 border-slate-500"
            // pattern="[6-9]\d*" // This pattern ensures the number starts with 6-9 and has a total of 10 digits.
            placeholder="Enter Mobile number"
            required
          />
        </div>
      </form>
      <div className="flex justify-end items-center">
        <button
          onClick={openModal}
          className="mr-4 bg-blue-500 py-1 px-6 rounded-lg"
        >
          Submit
        </button>

        <button className="mr-4 bg-blue-500 py-1 px-6 rounded-lg">
          <Link href={"/student-portal/login"}>Cancel</Link>
        </button>
      </div>
      {emailVerifyModal && (
        <VerifyStuEmail
          closeModel={closeModel}
          email={formData.emailID}
          handleSubmit={handleSubmit}
          shortEmail={shortEmail}
        />
      )}
    </div>
  );
}
