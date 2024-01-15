import React, { useState } from "react";
import { config } from "apiCalls/Configuration";
import { AiFillCloseCircle } from "react-icons/ai";
import CountdownTimer from "../forgot-password/CountdownTimer";

const VerifyEmail = ({ closeModel, email, handleSubmit, shortEmail }) => {
  const [otp, setOtp] = useState("");
  const [invalidOtp, setInvalidOtp] = useState(false);

  const handleVerify = async () => {
    const otpForm = new FormData();
    otpForm.append("otp", otp);
    otpForm.append("email", email);
    otpForm.append("role", "ROLE_COLLEGE");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/otp/verify-otp`,
      {
        method: "POST",
        body: otpForm,
      }
    );

    // Check if the response status is OK (200)
    if (response.status === 200) {
      handleSubmit();
      config.notify("Email Verified", "success");
    } else {
      setInvalidOtp(true);
      config.notify("Incorrect otp", "error");
    }
    if (!response) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  };

  const sendOtp = async () => {
    const otpForm = new FormData();
    otpForm.append("email", email);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/repas`, {
      method: "POST",
      body: otpForm,
    }).then((response) => {
      if (response.ok) {
        const [username, domain] = email.split("@");
        const len = username.length;
        const maskedUsername =
          username.charAt(0) + "*****" + username.charAt(len - 1);
        setShortEmail(`${maskedUsername}@${domain}`);
      }
      if (!response.ok) {
        // setOtpProcessing(false);
      }
      return response.text();
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between mb-4">
          <div></div> {/* This empty div will push the button to the right */}
          <div className="flex">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 ">
              OTP - Verification
            </h1>
            <span
              type="button"
              className="text-black hover:text-gray-700 text-lg p-2 pl-4 cursor-pointer"
              onClick={closeModel}
            >
              <AiFillCloseCircle color="red" size={20} />{" "}
            </span>
          </div>
        </div>

        <>
          <div className="mb-4 text-center">
            OTP has been sent to {shortEmail}.
          </div>
          <div className={`flex items-center ${!invalidOtp && "mb-4 "}`}>
            <input
              className={`flex-1 bg-gray-100 rounded-l p-2 focus:outline-none ${
                invalidOtp && "border border-red-600"
              }`}
              type="text"
              placeholder="Please enter OTP"
              onChange={(e) => {
                setOtp(e.target.value);
                setInvalidOtp(false);
              }}
            />

            <button
              className="bg-blue-500 rounded-r text-white px-4 py-2 hover:bg-blue-700 focus:outline-none"
              onClick={handleVerify}
            >
              Verify
            </button>
          </div>
          {invalidOtp && <div className="text-red-600">Invalid Otp</div>}
          <div className="flex justify-end">
            <CountdownTimer sendOtp={sendOtp} />
            <button
              className="bg-red-400 rounded text-white px-6 py-2 hover:bg-blue-700 focus:outline-none"
              onClick={() => {
                // setOtpStatus(false);
              }}
            >
              Back
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default VerifyEmail;
