"use client";
import React, { useState, useEffect } from "react";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";

export const ExecutiveSummary = () => {
  const { iiqa, collegeData, setSSRID } = contextManager();
  const [formdata, setFormdata] = useState({
    bygender: "",
    byshift: "",
    religiousStatus: "",
    linguisticStatus: "",
    otherStatus: "",
    minorityStatus: "NO",
    autonomyConferment: "NO",
    autonomyApplication: "NO",
    govRecognized: "NO",
    agencyName: "",
    recognitionDate: "",
    location: "",
    campusArea: "",
    builtInArea: "",
    "doc-of-minority": "",
    "doc-of-autonomy": "",
  });
  const [universityList, setUniversityList] = useState("");
  const [sraList, setSraList] = useState([]);

  useEffect(() => {
    config.cookieAssign();
    (async () => {
      if (iiqa.iiqa_ID) {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/getAffiliation`
        );

        if (response) {
          if (response[0].AffiliatingUniversity.length > 0) {
            setUniversityList(response[0].AffiliatingUniversity);
          }
          if (response[1].SraList.length > 0) {
            setSraList(response[1].SraList);
          }
        }
      }
    })();
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `ssr-specifics/${collegeData.collegId}`
      );
      if (response) {
        setFormdata((prevState) => ({
          ...prevState,
          bygender: response.byGender,
          byshift: response.byShift,
          // Add other state properties based on your response
          religiousStatus:
            response.minorityByReligious === "null" ||
            !response.minorityByReligious
              ? ""
              : response.minorityByReligious,
          linguisticStatus:
            response.minorityByLinguistic === "null" ||
            !response.minorityByLinguistic
              ? ""
              : response.minorityByLinguistic,
          otherStatus:
            response.minorityByOther === "null" || !response.minorityByOther
              ? ""
              : response.minorityByOther,
          minorityStatus:
            response.recognizedMinorityInstitution === "null" ||
            !response.recognizedMinorityInstitution
              ? ""
              : response.recognizedMinorityInstitution,
          autonomyConferment:
            response.isAutonomyGranted === "null" || !response.isAutonomyGranted
              ? ""
              : response.isAutonomyGranted,
          autonomyApplication:
            response.collegeAutonomousApplicationStatus === "null" ||
            !response.collegeAutonomousApplicationStatus
              ? ""
              : response.collegeAutonomousApplicationStatus,
          govRecognized:
            response.isCollegeRecognizedByGovtAgency === "null" ||
            !response.isCollegeRecognizedByGovtAgency
              ? ""
              : response.isCollegeRecognizedByGovtAgency,
          agencyName:
            response.recognizedAgencyName === "null" ||
            !response.recognizedAgencyName
              ? ""
              : response.recognizedAgencyName,
          recognitionDate:
            response.dateOfRecognisation === "null" ||
            !response.dateOfRecognisation
              ? ""
              : response.dateOfRecognisation,
          location:
            response.campusLocation === "null" || !response.campusLocation
              ? ""
              : response.campusLocation,
          campusArea:
            response.campusAreaInAcres === "null" || !response.campusAreaInAcres
              ? ""
              : response.campusAreaInAcres,
          builtInArea:
            response.builtUpAreaInSqMt === "null" || !response.builtUpAreaInSqMt
              ? ""
              : response.builtUpAreaInSqMt,
          "doc-of-minority":
            response.documentOFMinorityInstitution === "null" ||
            !response.documentOFMinorityInstitution
              ? ""
              : response.documentOFMinorityInstitution,
          "doc-of-autonomy":
            response.isAutonomyGrantedDocumnet === "null" ||
            !response.isAutonomyGrantedDocumnet
              ? ""
              : response.isAutonomyGrantedDocumnet,
        }));
      }
    })();
  }, []);
  return (
    <div className="bg-white">
      {/*Name and Address of the College*/}
      <div className="border rounded-lg mb-4">
        <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
          Name and Address of the College
        </h3>
        <div className="container p-3">
          <table className="w-full">
            <tbody>
              <tr className="border">
                <td className="border-r text-left w-1/4 p-2">Name</td>
                <td>
                  <div className=" w-full p-2">
                    {iiqa.nameOfHigherEducationInstitution}
                  </div>
                </td>
              </tr>
              <tr className="border">
                <td className="border-r text-left w-1/4 p-2">Address</td>
                <td>
                  <div className=" w-3/4 p-2">{iiqa.collegeAddress}</div>
                </td>
              </tr>
              <tr className="border">
                <td className="border-r text-left w-1/4 p-2">City</td>
                <td className="border-r">
                  <div className=" w-3/4 p-2">{iiqa.city}</div>
                </td>
                <td className="border-r text-left w-1/4 p-2">Pin</td>
                <td>
                  <div className=" w-3/4 p-2">{iiqa.collegePincode}</div>
                </td>
              </tr>

              <tr className="border">
                <td className="border-r text-left w-1/4 p-2">State</td>
                <td className="border-r">
                  <div className=" w-3/4 p-2">{iiqa.stateOrUT}</div>
                </td>
                <td className="border-r text-left w-1/4 p-2">Website</td>
                <td>
                  <div className=" w-3/4 p-2">{iiqa.collegeWebsite}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*Contact For Communication*/}
      <div className="border rounded-lg mb-4">
        <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
          Contact For Communication
        </h3>
        <table className="p-3 pt-2 text-base w-full">
          <thead className="bg-gray-400">
            <tr className="border border-gray-400">
              <td className="p-2 border-r border-white text-left w-36">
                Designation
              </td>
              <td className="p-2 border-r border-white text-left w-40">Name</td>
              <td className="p-2 border-r border-white text-left">
                Telephone With STD code
              </td>
              <td className="p-2 border-r border-white text-left w-24">
                Mobile
              </td>
              <td className="p-2 border-r border-white text-left w-32">Fax</td>
              <td className="p-2 text-left w-44">Email</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400">
                <div className="w-full p-2">Principal</div>
              </td>
              <td className="border border-gray-400 p-1">
                <input type="text" className="w-full p-2 border border-black" />
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  <label className="w-full">
                    Office
                    <input
                      type="text"
                      className="border border-black mb-2 ml-1 w-3/5"
                    />
                  </label>
                  <label className="w-full">
                    Resident
                    <input
                      type="text"
                      className="border border-black ml-1 w-3/5 "
                    />
                  </label>
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">{collegeData.collegeMobileNo}</div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">{collegeData.collegeEmailID}</div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400">
                <div className="w-full p-2">Vice Principal</div>
              </td>
              <td className="border border-gray-400 p-1">
                <input type="text" className="w-full p-2 border border-black" />
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  <label className="w-full">
                    Office
                    <input
                      type="text"
                      className="border border-black mb-2 ml-1 w-3/5"
                    />
                  </label>
                  <label className="w-full">
                    Resident
                    <input
                      type="text"
                      className="border border-black ml-1 w-3/5 "
                    />
                  </label>
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">{iiqa.alternateFacultyMobile}</div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  {iiqa.alternateFacultyAltenateEmail}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400">
                <div className="w-full p-2">IQAC Co-ordinator</div>
              </td>
              <td className="border border-gray-400 p-1">
                <input type="text" className="w-full p-2 border border-black" />
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  <label className="w-full">
                    Office
                    <input
                      type="text"
                      className="border border-black mb-2 ml-1 w-3/5"
                    />
                  </label>
                  <label className="w-full">
                    Resident
                    <input
                      type="text"
                      className="border border-black ml-1 w-3/5 "
                    />
                  </label>
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">{iiqa.alternateFacultyMobile}</div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                </div>
              </td>
              <td className="border border-gray-400">
                <div className="w-full p-2">
                  {iiqa.alternateFacultyAltenateEmail}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border rounded-lg mb-4">
        <div>
          Status of the Institution: Affiliated College Constituent College Any
          other (specify)
        </div>
      </div>
      {/* Type Of the Institution */}
      <div className="border rounded-lg mb-4">
        <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
          Type Of the Institution
        </h3>
        <div className="container p-3">
          <table className="w-full">
            <tbody>
              <tr className="border">
                <td className="border-r w-1/2 p-2">By Gender</td>
                <td className="w-1/2 p-1">
                  <select
                    className="w-full p-1 border border-gray-400"
                    value={formdata.bygender || "-Select"}
                    name="bygender"
                  >
                    <option defaultValue disabled>
                      -Select-
                    </option>
                    <option value="1">For Men</option>
                    <option value="2">For Women</option>
                    <option value="3">Co-education</option>
                  </select>
                </td>
              </tr>
              <tr className="border">
                <td className="border-r w-1/2 p-2">By Shift</td>
                <td className="w-1/2 p-1">
                  <div className="flex items-center">
                    <label htmlFor="myCheckbox1" className="text-gray-700">
                      <input
                        type="checkbox"
                        id="myCheckbox1"
                        name="byshift"
                        value="Regular"
                        className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                        checked={formdata.byshift === "Regular"}
                      />
                      Regular
                    </label>

                    <label htmlFor="myCheckbox2" className="ml-2 text-gray-700">
                      <input
                        type="checkbox"
                        id="myCheckbox2"
                        name="byshift"
                        value="Day"
                        className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                        checked={formdata.byshift === "Day"}
                      />
                      Day
                    </label>

                    <label htmlFor="myCheckbox3" className="ml-2 text-gray-700">
                      <input
                        type="checkbox"
                        id="myCheckbox3"
                        name="byshift"
                        value="Evening"
                        className="form-checkbox mr-2 h-4 w-4 text-blue-600"
                        checked={formdata.byshift === "Evening"}
                      />
                      Evening
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="border">
                <td className="border-r w-1/2 p-2">
                  If it is a recognized Minority Institution
                </td>
                <td className="w-1/2 p-1">
                  <select
                    className="w-full p-1 border border-gray-400"
                    name="minorityStatus"
                    value={formdata.minorityStatus || "NO"}
                  >
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                  <>
                    {formdata.minorityStatus === "YES" && (
                      <div className="m-2 mt-3">
                        {formdata["doc-of-minority"] === "" ? (
                          <label className="custom-file-upload border  bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer p-2">
                            <input
                              className="hidden"
                              type="file"
                              name="doc-of-minority"
                              accept=".pdf"
                            />
                            Upload File
                          </label>
                        ) : (
                          <div className="flex">
                            <a
                              target="blank"
                              href={
                                config.RESOURCE_URL +
                                formdata["doc-of-minority"]
                              }
                            >
                              View Document
                            </a>
                            <div
                              className="ml-2 my-auto cursor-pointer"
                              name="doc-of-minority-detach"
                              onClick={() =>
                                handleDocDelete(
                                  "doc-of-minority-detach",
                                  "doc-of-minority"
                                )
                              }
                            >
                              <ImBin2 />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Nature of college */}
      <div className="card border flex flex-row mt-2 p-3">
        <div>
          Nature of the College
          <span
            data-placement="right"
            title="(Classified based on financial management)"
          ></span>
        </div>
        <div className="ml-auto mr-80">
          <div className="mr-40">
            <label>
              <input
                className=""
                name="Government"
                type="checkbox"
                value="Government"
              />
              Government
            </label>
          </div>
          <div>
            <label>
              <input
                className=""
                name="Private"
                type="checkbox"
                value="Private"
              />
              Private
            </label>
          </div>
          <div>
            <label>
              <input
                className=""
                name="GrantInAid"
                type="checkbox"
                value="GrantInAid"
              />
              Grant-in-aid
            </label>
          </div>
          <div>
            <label>
              <input
                className=""
                name="SelfFinancing"
                type="checkbox"
                value="SelfFinancing"
              />
              Self Financing
            </label>
          </div>
          <div>
            <label>
              <input
                className=""
                type="checkbox"
                name="Constituent"
                value="Constituent"
              />
              Constituent
            </label>
          </div>
          <div id="nature_msg" style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="card border flex flex-row mt-2 p-3">
        <div></div>
      </div>
    </div>
  );
};
