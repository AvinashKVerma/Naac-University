import { config } from "apiCalls/Configuration";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <section className="container h-4/5 mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="dashbox">
            <div className="flexbox halfsec whitebox flex-col">
              <BiBell className="fonticon self-baseline" />
              <div className="innerbox self-baseline">
                <div className="appstatus">Application Status</div>
                <h4>IIQA PENDING</h4>
                <div className="updated">updated on 11 Sep 2023</div>
              </div>
            </div>
            <div className="flexbox halfsec whitebox flex-col">
              <RiLogoutCircleRLine className="fonticon self-baseline" />
              <div className="innerbox self-baseline">
                <div className="appstatus">LAST LOGIN DETAILS</div>
                <h4>12 Sep 2023</h4>
                <div className="updated">From: 103.189.81.105</div>
              </div>
            </div>
          </div>

          <div className="dashbox">
            <div className="flexbox listbox halfsec whitebox">
              <div className="innerbox">
                <h3>Important Dates</h3>
                <ul className="list-group">
                  <li className="dashbox">
                    <span>IIQA Submission Date</span>
                    <span>1/7/2017</span>
                  </li>
                  <li className="dashbox">
                    <span>Payment Date</span>
                    <span>2/7/2017</span>
                  </li>
                  <li className="dashbox">
                    <span>SSR Submission Date</span>
                    <span>3/7/2017</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flexbox halfsec whitebox">
              <h3>Notification</h3>
              <div className="lcbox">
                All the institutions are hereby informed that an OTP
                verification method will be introduced for the students who are
                taking up Student Satisfaction Survey (SSS) on their institution
                teaching learning process. All the institutions have to submit
                the mobile numbers of the students mandatorily while uploading
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="flexbox listbox whitebox">
            <div className="innerbox">
              <h3>Institution Details</h3>
              <ul className="list-group">
                <li className="dashbox">
                  <span>
                    <b>Institution Type</b>
                  </span>
                  <span>College</span>
                </li>
                <li className="dashbox">
                  <span>
                    <b>Current Cycle</b>
                  </span>
                  <span>Cycle 1</span>
                </li>
                <li className="dashbox">
                  <span>
                    <b>Previous Cycle</b>
                  </span>
                  <span>Nil</span>
                </li>
                <li className="dashbox">
                  <span>
                    <b>Previous Grade</b>
                  </span>
                  <span>Nil</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-4 mt-4">
            <div className="flexbox listbox whitebox">
              <div className="innerbox">
                <h3>Your Score </h3>
                {/* <ul className="list-group">
                <li className="list-group-item flex justify-between">
                  <b>Issues Raised</b>
                  <span>0</span>
                </li>
                <li className="list-group-item flex justify-between">
                  <b>Issues Closed</b>
                  <span>0</span>
                </li>
              </ul>
              <Link href="" className="btn btn-warning mt-4">
                Report New Issue
              </Link> */}
                <Criterias />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

const Criterias = () => {
  const [criteMarks, setCriteMarks] = useState({
    Criteria1: 0,
    Criteria2: 0,
    Criteria3: 0,
    Criteria4: 0,
    Criteria5: 0,
    Criteria6: 0,
    Criteria7: 0,
  });
  const itemCount = 7;
  const items = [];

  for (let i = 1; i <= itemCount; i++) {
    items.push(
      <li className="dashbox" key={i}>
        <span>
          <b>Criteria {i}</b>
        </span>
        <span>0</span>
      </li>
    );
  }

  // useEffect(() => {
  //   (async () => {
  //     const response = await config.criteriaMarks();
  //     console.log(response);
  //   })();
  // }, []);

  return <ul>{items}</ul>;
};
