"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { ImBin2 } from "react-icons/im";
import { sraListItem } from "components/assets/constants";
import { contextManager } from "context/store";
import YourComponent from "./Modal";

const AffiliationComplianceForm = ({ completedForm }) => {
  const { iiqa, iiqaUpdate, setIIQAUpdate } = contextManager();
  const [isSRARecognized, setIsSRARecognized] = useState(false);
  const [isNADRegistered, setIsNADRegistered] = useState(
    (iiqa.institutionisRegistereNAD_Document && true) || false
  );
  const [sraList, setSraList] = useState([]);
  const [selectedSRA, setSelectedSRA] = useState("");
  const [nadDocument, setNadDocument] = useState(
    iiqa.institutionisRegistereNAD_Document || ""
  );

  useEffect(() => {
    const fetchData = async () => {
      if (iiqa.iiqa_ID) {
        const url = `${iiqa.iiqa_ID}/recongnised-univ`;
        const response = await config.apiRequest("GET", url);

        if (response) {
          setSraList(response[1].SraList);
          if (response[1].SraList.length > 0) {
            setIsSRARecognized(true);
          }
        }
      }
    };
    fetchData();
  }, [iiqa]);

  const handleSelectedSRA = async (e) => {
    const checklist = sraList.map((e) => {
      return e.sra;
    });

    if (
      e.target.value !== "--Select SRA--" &&
      !checklist.includes(e.target.value)
    ) {
      const newSraData = {
        collegeProgramBySRA_Type: e.target.value,
        collegeProgramBySRA_Document: "",
      };

      const newSraList = [...sraList];
      newSraList.push(newSraData);
      setSraList(newSraList);
      setSelectedSRA(e.target.value);

      const formdata = new FormData();
      formdata.append("sraType", e.target.value);
      // formdata.append("prepareIIQA_ID", iiqa.iiqa_ID);

      // const headers = {
      //   "Content-Type": "multipart/form-data",
      // };
      const response = await config.apiRequest(
        "POST",
        `${iiqa.iiqa_ID}/sra`,
        formdata
        // headers
      );
      if (response) {
        const newSraList = [...sraList];
        config.notify("Added SuccessFully", "success");
        newSraList.push(response);
        setSraList(newSraList);
      }
    }
  };

  const handleSraDoc = async (e, i) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      config.notify("No File Selected", "info");
      return;
    }

    const newSraList = [...sraList];
    newSraList[i].sraDocumentName = selectedFile.name;
    setSraList(newSraList);

    // Get the file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      config.notify("File Must be pdf", "info");
      e.target.value = ""; // Clear the file input
      return;
    }

    // If the file is a PDF, you can proceed with the POST request
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    const response = config.methodForFile(
      `${sraList[i].sraId}/updatingFile-sra`,
      "POST",
      formData
    );
    if (response) {
      console.log(response);
      const resp = await response;
      config.notify("File Added Successfully", "success");
      const newsraList = [...sraList];
      newsraList[i].sraDocumentName = resp;
      setSraList(newsraList);
    }
  };

  const handleSraDelete = async (i) => {
    const response = await config.deleteRequest(
      "DELETE",
      `${sraList[i].sraId}/remove-sra-by-sraId`
    );
    if (response.status === 200) {
      const newsraList = [...sraList];
      newsraList.splice(i, 1);
      setSraList(newsraList);
    }
  };

  const handleSraDocDelete = async (e, i) => {
    const response = await config.deleteRequest(
      "POST",
      `${sraList[i].sraId}/remove-file-sralist`
    );
    if (response) {
      const newSraList = [...sraList];
      newSraList[i].sraDocumentName = "";
      setSraList(newSraList);
    }
  };

  const handleNadDocDelete = async () => {
    const response = await config.deleteRequest(
      "POST",
      `${iiqa.iiqa_ID}/remove-file-nad-documnet`
    );
    if (response) {
      setNadDocument("");
    }
  };

  const handleNADDoc = async (e) => {
    if (!e.target.files[0].name) {
      alert("No file selected.");
      return;
    }
    // Get the file extension
    const fileExtension = e.target.files[0].name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      alert("File must be in PDF format.");
      e.target.value = ""; // Clear the file input
      return;
    }

    // If the file is a PDF, you can proceed with the POST request
    const formData = new FormData();
    formData.append("pdf", e.target.files[0]);

    const response = config.methodForFile(
      `${iiqa.iiqa_ID}/file-institutionisRegistereNAD-Document`,
      "POST",
      formData
    );
    if (response) {
      const resp = await response;
      setNadDocument(resp);
    }
  };

  const handleSaveAndNext = () => {
    async function checkConditions() {
      for (const ele of sraList) {
        if (ele.sraDocumentName === "") {
          window.alert(`Please Upload Document of ${ele.sraType}`);
          return null; // Return early when the condition is met
        }
      }
      if (nadDocument === "") {
        window.alert(
          `Please Upload Document of National Academic Depository (NAD) System`
        );
        return null; // Return early when the condition is met
      }

      setIIQAUpdate(!iiqaUpdate);
    }

    // Call the async function and handle the result accordingly
    checkConditions().then(() => {
      config.notify("Saved", "success");
      completedForm("Affiliation Compliance");
      // Handle the case where conditions were not met
    });
  };

  return (
    <div className="font-normal text-base">
      {/* SRA Radio Buttons */}
      <div className="borderbox">
        <div className="flexbox">
          <label>
            Is the college offering a program recognized by any Statutory
            Regulatory<br></br>
            <small>
              Authority (SRA) such as AICTE, NCTE, MCI, DCI, BCI, INC, RCI,
              etc.?
            </small>
          </label>
          <div className="checklabel colsec">
            <label>
              <input
                checked={isSRARecognized === true}
                type="radio"
                value="1"
                onChange={(e) => setIsSRARecognized(e.target.value === "1")}
              />{" "}
              <span>Yes</span>
            </label>
            <label>
              <input
                checked={isSRARecognized === false}
                type="radio"
                value="0"
                onChange={(e) => setIsSRARecognized(e.target.value === "1")}
              />{" "}
              <span>No</span>
            </label>
          </div>
        </div>
        {isSRARecognized && (
          <>
            <div className="mt-1 flex">
              <div className="flex w-1/3 p-2">
                SRA List (Upload approval from each SRA.)
              </div>
              <div className="mr-10">
                <div className="flex">
                  <div className="flex form-control flex-col form-control">
                    <select
                      value={selectedSRA}
                      onChange={handleSelectedSRA}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">--Select SRA--</option>
                      {sraListItem.map((item, index) => (
                        <option
                          className=" border border-gray-300 rounded-md p-2"
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {sraList.length > 0 && (
              <div className="flex justify-end mt-5 ">
                <table className="border border-slate-500 w-2/3">
                  <thead>
                    <tr>
                      <th className="border border-slate-500 w-2/5">SRA</th>
                      <th className="border border-slate-500">
                        Upload Document
                      </th>
                      <th className="border border-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sraList.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border border-slate-500 text-center">
                            {ele.sraType}
                          </td>
                          <td className="border border-slate-500">
                            {!ele.sraDocumentName ? (
                              <input
                                className=" cursor-pointer"
                                type="file"
                                placeholder="Upload Document"
                                accept=".pdf"
                                onChange={(e) => handleSraDoc(e, i)}
                              />
                            ) : (
                              <div className="flex flex-row justify-evenly">
                                <a
                                  className="cursor-pointer"
                                  href={
                                    config.RESOURCE_URL + ele.sraDocumentName
                                  }
                                  target="_blank"
                                >
                                  View Document
                                </a>
                                <div>
                                  <ImBin2
                                    onClick={(e) => handleSraDocDelete(e, i)}
                                    className="flex align-middle justify-center my-auto cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="border border-slate-500 text-center">
                            <button onClick={() => handleSraDelete(i)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      {/* NAD Radio Buttons */}
      <div className="card border mt-2 flex items-center p-3">
        <label className="col-form-label w-1/2">
          Whether the Institution is registered in the National Academic
          Depository (NAD) System
        </label>

        <div className="md:w-8/12">
          <div className="md:flex md:space-x-4 p-3">
            <div className="md:w-8/12 flex justify-evenly">
              <label className="space-x-2 ">
                <input
                  className="form-control"
                  checked={isNADRegistered === true}
                  type="radio"
                  value="1"
                  onChange={(e) => setIsNADRegistered(e.target.value === "1")}
                />
                <span>Yes</span>
              </label>
              <label className="space-x-2 ">
                <input
                  className="form-control"
                  checked={isNADRegistered === false}
                  type="radio"
                  value="0"
                  onChange={(e) => setIsNADRegistered(e.target.value === "1")}
                />
                <span>No</span>
              </label>
            </div>
          </div>
          {isNADRegistered &&
            (!nadDocument ? (
              <input
                className=" cursor-pointer"
                type="file"
                placeholder="Upload Document"
                accept=".pdf"
                onChange={handleNADDoc}
              />
            ) : (
              <div className="flex flex-row justify-evenly ">
                <a
                  className="cursor-pointer"
                  href={config.RESOURCE_URL + nadDocument}
                  target="_blank"
                >
                  View Document
                </a>
                <div>
                  <ImBin2
                    onClick={handleNadDocDelete}
                    className="flex align-middle justify-center my-auto cursor-pointer"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Save and Next Button */}
      <div className="text-right mt-2">
        <button
          type="button"
          className="btns submitbtn "
          onClick={handleSaveAndNext}
          id="affli_save"
        >
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default AffiliationComplianceForm;
