"use client";
import React, { useState, useEffect } from "react";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";

const BasicInformation = ({ setActiveButton }) => {
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
    "doc-of-minority": "",
    "doc-of-autonomy": "",
  });

  const [sraList, setSraList] = useState([]);
  const [campusList, setCampusList] = useState([]);

  // if (state === "formdata") {
  //   setFormdata({
  //     ...formdata,
  //     [e.target.name]: e.target.value,
  //   });
  // } else

  const handleChange = (e, state, i) => {
    const { name, value } = e.target;
    if (state === "campusList") {
      setCampusList((prevCampusList) => {
        const updatedData = [...prevCampusList];
        updatedData[i] = {
          ...updatedData[i],
          [name]: value,
        };
        return updatedData;
      });
    }
  };

  useEffect(() => {
    config.cookieAssign();
    (async () => {
      if (iiqa.iiqa_ID) {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/recongnised-univ`
        );

        if (response) {
          if (response[1].SraList.length > 0) {
            setSraList(response[1].SraList);
          }
        }
      }
    })();
    (async () => {
      if (iiqa.iiqa_ID) {
        const response = await config.apiRequest(
          "GET",
          `${iiqa.iiqa_ID}/recongnised-univ`
        );

        if (response) {
          if (response[0].recognisedUniv.length > 0) {
            setCampusList(response[0].recognisedUniv);
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
  }, [iiqa]);

  const handleSave = async () => {
    const finalData = new FormData();
    finalData.append("byGender", formdata.bygender);
    finalData.append("byShift", formdata.byshift);
    finalData.append("recognizedMinorityInstitution", formdata.minorityStatus);
    finalData.append("minorityByReligious", formdata.religiousStatus);
    finalData.append("minorityByLinguistic", formdata.linguisticStatus);
    finalData.append("minorityByOther", formdata.otherStatus);
    finalData.append("isAutonomyGranted", formdata.autonomyApplication);
    finalData.append(
      "collegeAutonomousApplicationStatus",
      formdata.autonomyConferment
    );
    finalData.append("isCollegeRecognizedByGovtAgency", formdata.govRecognized);
    finalData.append("recognizedAgencyName", formdata.agencyName);
    finalData.append("dateOfRecognisation", formdata.recognitionDate);
    finalData.append("campusLocation", formdata.location);
    finalData.append("campusAreaInAcres", formdata.campusArea);
    finalData.append("builtUpAreaInSqMt", formdata.builtInArea);

    const response = await config.ssrAPIRequest(
      "POST",
      `${collegeData.collegId}/basic-information`,
      finalData
    );
    setSSRID(response.ssrID);
    setActiveButton("Academic Information");
  };

  // const handleFileUpload = async (e) => {
  //   if (e.target.files !== null) {
  //     const file = e.target.files[0];
  //     const fileExtension = file.name.split(".").pop().toLowerCase();

  //     if (fileExtension !== "pdf") {
  //       config.notify("File must be in PDF format.", "info");
  //       e.target.value = "";
  //       return;
  //     }
  //     config.notify("File Uploaded", "success");
  //   }

  //   const docToUpload = new FormData();
  //   docToUpload.append("pdf", e.target.files[0]);

  //   const response = await config.ssrAPIRequest(
  //     "POST",
  //     `${collegeData.collegId}/${e.target.name}`,
  //     docToUpload
  //   );
  //   if (response) {
  //     setFormdata((pervState) => ({
  //       ...pervState,
  //       [e.target.name]: response,
  //     }));
  //   }
  // };

  // const handleDocDelete = async (url, variable) => {
  //   const response = await config.ssrAPIRequest(
  //     "POST",
  //     `${collegeData.collegId}/${url}`
  //   );
  //   if (response === "Deleted Successfully") {
  //     setFormdata((pervState) => ({
  //       ...pervState,
  //       [variable]: "",
  //     }));
  //   }
  // };

  return (
    <div className="p-2 ">
      <h1 className="bg-[#337ab7] p-2 border border-cyan-700 rounded-b-none rounded-lg text-white">
        Basic Information
      </h1>
      <div className="border border-[#337ab7] rounded-b-lg bg-white">
        <div className="p-3 pt-2 rounded-lg">
          {/*Name and Address of the College*/}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Name and Address of the University
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
                    <td className="border-r text-left w-1/4 p-2">Pin Code</td>
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
                  <td className="p-2 border-r border-white text-left w-40">
                    Name
                  </td>
                  <td className="p-2 border-r border-white text-left">
                    Telephone With STD code
                  </td>
                  <td className="p-2 border-r border-white text-left w-24">
                    Mobile
                  </td>
                  <td className="p-2 border-r border-white text-left w-32">
                    Fax
                  </td>
                  <td className="p-2 text-left w-44">Email</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">{iiqa.designation}</div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.headOfTheInstitution}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.collegePhoneAreaCode} ${iiqa.collegePhone}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {collegeData.collegeMobileNo}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.alternateFacultyFaxAreaCode} ${iiqa.alternateFacultyFax}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {collegeData.collegeEmailID}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyDesignation}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyName}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {`${iiqa.alternateFacultyPhoneAreaCode} ${iiqa.alternateFacultyPhone}`}
                    </div>
                  </td>
                  <td className="border border-gray-400">
                    <div className="w-full p-2">
                      {iiqa.alternateFacultyMobile}
                    </div>
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

          {/* Type Of the Institution */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Type Of the University
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      Nature of the University{" "}
                    </td>
                    <td className="w-1/2 p-1">
                      <input
                        type="text"
                        value={iiqa.natureOfCollege || ""}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">Type of University </td>
                    <td className="w-1/2 p-1">
                      <input type="text" value={iiqa.univType || ""} disabled />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/*Establishment Details*/}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Establishment Details
            </h3>
            <div className="w-full p-2 ">
              <div className="w-full flex border">
                <div className="w-1/2 border-r p-2">
                  Date Of Establishment of the University
                </div>
                <div className="w-1/2 p-2">
                  <div className="w-full">
                    {iiqa.date_of_establishment_of_the_Institution}
                  </div>
                </div>
              </div>
              <div className="w-full flex border">
                <div className="w-1/2 border-r p-2">
                  Status Prior to Establishment (If applicable)
                </div>
                <div className="w-1/2 p-2">
                  <select
                    className="w-full p-1 border border-gray-400"
                    value={formdata.bygender || "-Select"}
                    name="bygender"
                    onChange={(e) => handleChange(e, "formdata")}
                  >
                    <option defaultValue disabled>
                      -Select-
                    </option>
                    <option value="1">Autonomous</option>
                    <option value="2">Constituent</option>
                    <option value="3">PG Centre</option>
                    <option value="4">Any other</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex border">
                <div className="w-1/2 border-r p-2">
                  Establishment date of the above status
                </div>
                <div className="w-1/2 p-2">
                  <input
                    type="date"
                    value={formdata.bygender}
                    name="bygender"
                    onChange={(e) => handleChange(e, "formdata")}
                  />
                </div>
              </div>

              {(iiqa.documentOfRecognitionByUGC_2f ||
                iiqa.documentOfRecognitionByUGC_12B) && (
                <>
                  <h3 className="bg-gray-400 text-black p-1 mt-3 mb-2">
                    Date of Recognition as a University by UGC or Any Other
                    National Agency
                  </h3>
                  <>
                    <div className="border border-gray-400 bg-gray-400 flex mt-3">
                      <div className="w-1/3 p-1">Under Section</div>
                      <div className="border-x w-1/3 p-1">Date</div>
                      <div className="w-1/3 p-1">View Document</div>
                    </div>
                    <table className="p-3 pt-2 text-base w-full mb-2">
                      <tbody>
                        {iiqa.documentOfRecognitionByUGC_2f && (
                          <tr className="border ">
                            <td className="w-1/3 p-1">2f of UGC</td>
                            <td className="w-1/3 border p-1">
                              {iiqa.dateOfRecognitionByUGC_2f}
                            </td>
                            <td className="w-1/3 p-1">
                              <a
                                href={
                                  config.RESOURCE_URL +
                                  iiqa.documentOfRecognitionByUGC_2f
                                }
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                          </tr>
                        )}
                        {iiqa.documentOfRecognitionByUGC_12B && (
                          <tr className="border ">
                            <td className="w-1/3 p-1">12B Of UGC</td>
                            <td className="w-1/3 border p-1">
                              {iiqa.dateOfRecognitionByUGC_12B}
                            </td>
                            <td className="w-1/3 p-1">
                              <a
                                href={
                                  config.RESOURCE_URL +
                                  iiqa.documentOfRecognitionByUGC_12B
                                }
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                </>
              )}

              {sraList.length > 0 && (
                <>
                  <h3 className="border border-gray-400 bg-gray-400 p-1 mt-3">
                    Details of Recognition / Approval by Statutory / Regulatory
                    bodies like AICTE, NCTE, MCI, DCI, PCI,RCI etc (other than
                    UGC)
                  </h3>
                  <table className="w-full">
                    <tbody className="border border-gray-400">
                      <tr className="border border-gray-400 bg-gray-400 p-1">
                        <td className="border-white p-1 border border-l-0">
                          Statutory Regulatory Authority
                        </td>
                        <td className="border-white p-1 border">
                          Recognition/Approval details Institution/Department
                          Program
                        </td>
                        <td className="border-white p-1 border">
                          Day, Month, Year AND (dd-mm-yyyy)
                        </td>
                        <td className="border-white p-1 border">
                          Validity in Month
                        </td>
                        <td className="border-white p-1 border border-r-0">
                          Remarks
                        </td>
                      </tr>
                      {sraList.map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td className="border border-gray-400">
                              <div>{ele.sraType}</div>
                            </td>
                            <td className="border border-gray-400">
                              <a
                                href={config.RESOURCE_URL + ele.sraDocumentName}
                                target="_blank"
                                className="w-full cursor-pointer"
                              >
                                View Document
                              </a>
                            </td>
                            <td className="border border-gray-400">
                              <div>01/08/1997</div>
                            </td>
                            <td className="border border-gray-400">
                              <div>12</div>
                            </td>
                            <td className="border border-gray-400">
                              <textarea />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          {/* Recognitions */}
          <div className="border rounded-lg mb-4">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              University with Potential for Excellence
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr className="border">
                    <td className="border-r w-1/2 p-2">
                      Is the University Recognised as a 'University with
                      Potential for Excellence (UPE)' by the UGC?
                    </td>
                    <td className="w-1/2 p-1">
                      <select
                        className="w-full p-1 border border-gray-400"
                        defaultValue={
                          iiqa.documentOfRecognisedAsCPE !== "" && true
                        }
                        disabled
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Location and Area of Campus */}
          <div className="border rounded-lg">
            <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
              Location, Campus Area and Programmes offered
            </h3>
            <div className="container p-3">
              <table className="w-full">
                <tbody>
                  <tr
                    className="border bg-gray-400 flex p-0"
                    style={{ borderBottom: "1px" }}
                  >
                    <td className="flex-1 p-1">Campus Type</td>
                    <td className="flex-1 p-1 border  border-y-gray-400 border-x-white">
                      Address
                    </td>
                    <td className="flex-1 p-1">Location</td>
                    <td className="flex-1 p-1 border border-y-gray-400  border-x-white">
                      Campus Area in Acres
                    </td>
                    <td className="flex-1 p-1">Built up Area in sq. mts.</td>
                    <td className="flex-1 p-1 border border-y-gray-400  border-x-white">
                      Programmes Offered
                    </td>
                    <td className="flex-1 p-1">Date of Establishment </td>
                    <td className="flex-1 p-1 border border-y-gray-400  border-l-white">
                      Date of Recognition by UGC/MHRD
                    </td>
                  </tr>
                  {campusList.map((ele, i) => {
                    return (
                      <tr
                        className={`bg-gray-400 flex ${
                          i < campusList.length && "border border-b-white"
                        }`}
                        style={{ borderBottom: "1px" }}
                        key={i}
                      >
                        <td className="flex-1 p-1">{ele.campusType}</td>
                        <td className="flex-1 p-1 border  border-y-gray-400 overflow-auto">
                          {ele.address}
                        </td>
                        <td className="flex-1 p-1">
                          <select
                            name="location"
                            className="w-full p-1 border border-gray-400"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            defaultValue="select"
                          >
                            <option value="select">--Select--</option>
                            <option value="Rural">Rural</option>
                            <option value="Urban">Urban</option>
                            <option value="SemiUrban">Semi Urban</option>
                            <option value="city">City</option>
                            <option value="tribal">Tribal</option>
                            <option value="hill">Hill</option>
                          </select>
                        </td>
                        <td className="flex-1 p-1 border border-y-gray-400  border-x-white flex justify-center">
                          <input
                            className="border w-11/12 h-fit"
                            name="campusArea"
                            type="text"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            value={campusList[i]["campusArea"] || ""}
                          />
                        </td>
                        <td className="flex-1 p-1 flex justify-center">
                          <input
                            className="border w-11/12 h-fit"
                            name="builtInArea"
                            type="text"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            value={campusList[i]["builtInArea"] || ""}
                          />
                        </td>
                        <td className="flex-1 p-1 border border-y-gray-400  border-x-white flex justify-center">
                          <input
                            className="border w-11/12 h-fit"
                            name="progOffered"
                            type="text"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            value={campusList[i]["progOffered"] || ""}
                          />
                        </td>
                        <td className="flex-1 p-1 flex justify-center">
                          <input
                            className="border w-11/12 h-fit"
                            name="dateOfEstb"
                            type="text"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            value={campusList[i]["dateOfEstb"] || ""}
                          />
                        </td>
                        <td className="flex-1 p-1 border border-y-gray-400  border-l-white flex justify-center">
                          <input
                            className="border w-11/12 h-fit"
                            name="dateOfRecog"
                            type="text"
                            onChange={(e) => handleChange(e, "campusList", i)}
                            value={campusList[i]["dateOfRecog"] || ""}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="m-3 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#3c8dbc]"
            onClick={handleSave}
          >
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
