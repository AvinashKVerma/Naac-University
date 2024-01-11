"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";
import { keyIndicators7, option } from "./CriteriaData";

const Criteria7 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "7.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "7.1.2": {
      select: "",
      doc: [""],
      link: [""],
    },
    "7.1.3": {
      select: "",
      link: ["", "", ""],
    },
    "7.1.4": {
      select: "",
      doc: [""],
      link: [""],
    },
    "7.1.5": {
      para: "",
      doc: [""],
      link: [""],
    },
    "7.1.6": {
      select: "",
      doc: [""],
      link: [""],
    },
    "7.1.7": {
      para: "",
      doc: [""],
    },
    "7.1.8": {
      para: "",
      doc: [""],
      link: [""],
    },
    "7.1.9": {
      para: "",
      doc: [""],
      link: [""],
    },
    "7.1.10": {
      select: "",
      doc: [""],
      link: [""],
    },
    "7.2.1": {
      link: ["", ""],
      para: "",
    },
  });

  const options = option;
  const keyIndicators = keyIndicators7;

  useEffect(() => {
    // (async () => {
    //   const response = await config.ssrAPIRequest(
    //     "GET",
    //     `qif/data-c7/${collegeData.collegId}`
    //   );
    //   const updatedFormData = { ...formData };
    //   updatedFormData.qifId = response.qifId;
    //   updatedFormData.criteriaVII_Id = response.criteriaVII_Id;
    //   updatedFormData["7.1.1"].para = response.genderEquityInitiative;
    //   updatedFormData["7.1.1"].doc[0] = response.addInfo_doc;
    //   updatedFormData["7.1.1"].link[0] = response.addInfo_link;
    //   updatedFormData["7.1.2"].select = response.facilitiesAndInitiativesTyp1;
    //   updatedFormData["7.1.2"].doc[0] = response.pfcPolicy_doc;
    //   updatedFormData["7.1.2"].doc[1] = response.equipPurchaseBills_doc;
    //   updatedFormData["7.1.2"].doc[2] = response.facilityMediaGeo_doc;
    //   updatedFormData["7.1.2"].doc[3] = response.cirActReports_doc;
    //   updatedFormData["7.1.2"].link[0] = response.relivantDoc_link;
    //   updatedFormData["7.1.3"].select = response.envEnergyAuditsTyp1;
    //   updatedFormData["7.1.3"].doc[0] = response.instDataTemplate_doc;
    //   updatedFormData["7.1.3"].doc[1] = response.EnvEnergyCertPolicy_doc;
    //   updatedFormData["7.1.3"].doc[2] = response.awardsCertiFormRecogAgncy_doc;
    //   updatedFormData["7.1.3"].doc[3] = response.envPromoSustActGeoPhotos_doc;
    //   updatedFormData["7.1.3"].doc[4] = response.envAudRepFormRecogAgncy_doc;
    //   updatedFormData["7.1.3"].link[0] = response.relivantDoc_link2;
    //   updatedFormData["7.1.4"].para = response.InstitutionalDiversityInitiative;
    //   updatedFormData["7.1.4"].doc[0] = response.addInfo_doc2;
    //   updatedFormData["7.1.4"].link[0] = response.addInfo_link2;
    //   updatedFormData["7.2.1"].para = response.bestPracticesNAACFormat;
    //   updatedFormData["7.2.1"].link[0] = response.bestPracticesURL;
    //   updatedFormData["7.2.1"].link[1] = response.relivantInfo_link;
    //   updatedFormData["7.3.1"].para = response.perfAreaPriorityThrust;
    //   updatedFormData["7.3.1"].link[0] = response.institutionalWeb_link;
    //   updatedFormData["7.3.1"].link[1] = response.relivantInfo_link2;
    //   setFormData(updatedFormData);
    // })();
  }, []);
  useEffect(() => {
    const isObjectFilled = (obj) => {
      for (const key in obj) {
        if (
          Array.isArray(obj[key]) &&
          !obj[key].every((value) => value !== "" && value !== undefined)
        ) {
          return false;
        } else if (typeof obj[key] === "object" && !isObjectFilled(obj[key])) {
          return false;
        } else if (
          obj[key] === "" ||
          obj[key] === 0 ||
          obj[key] === undefined
        ) {
          return false;
        }
      }
      return true;
    };

    const countFilledParentObjects = (data) => {
      return Object.values(data).filter((item) => isObjectFilled(item)).length;
    };

    const filledParentObjectsCount = countFilledParentObjects(formData);
    setAnsQs({ ...ansQs, 7: filledParentObjectsCount });
  }, [formData]);

  const criteria7Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append("CriteriaVII_Id", formData.criteriaVII_Id);
    formsData.append("genderEquityInitiative", formData["7.1.1"].para);
    formsData.append("addInfo_link", formData["7.1.1"].link[0]);
    formsData.append("facilitiesAndInitiativesTyp1", formData["7.1.2"].select);
    formsData.append("relivantDoc_link", formData["7.1.2"].link[0]);
    formsData.append("envEnergyAuditsTyp1", formData["7.1.3"].select);
    formsData.append("relivantDoc_link2", formData["7.1.3"].link[0]);
    formsData.append(
      "InstitutionalDiversityInitiative",
      formData["7.1.4"].para
    );
    formsData.append("addInfo_link2", formData["7.1.4"].link[0]);
    formsData.append("bestPracticesNAACFormat", formData["7.2.1"].para);
    formsData.append("bestPracticesURL", formData["7.2.1"].link[0]);
    formsData.append("relivantInfo_link", formData["7.2.1"].link[1]);
    formsData.append("perfAreaPriorityThrust", formData["7.3.1"].para);
    formsData.append("institutionalWeb_link", formData["7.3.1"].link[0]);
    formsData.append("relivantInfo_link2", formData["7.3.1"].link[1]);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c7/${collegeData.collegId}`,
      formsData
    );
  };
  useImperativeHandle(ref, () => ({
    criteria7Save,
  }));
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            7.{i + 1}. {ele}
          </h1>
          <div className="border border-[#337ab7] rounded-b-lg bg-white">
            {Object.keys(keyIndicators[ele]).map((e, i) => {
              return (
                <div
                  className={`p-2 mb-2 ${
                    Object.keys(keyIndicators[ele]).length - 1 !== i
                      ? "border-b border-[#337ab7]"
                      : ""
                  }`}
                  key={i}
                >
                  {keyIndicators[ele][e][0] === "QIM" && (
                    <div>
                      {e} {keyIndicators[ele][e][1]}
                      <i
                        className="text-[#337ab7] cursor-pointer p-1"
                        title="Write description in a maximum of 500 words"
                      >
                        <b>i</b>
                      </i>
                      <Question
                        e={e}
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </div>
                  )}
                  {keyIndicators[ele][e][0] === "QnM" && (
                    <>
                      <div>
                        <div className="flex">
                          <span className="w-3/5">
                            {e} {keyIndicators[ele][e][1]}
                          </span>
                          <div className="w-2/5 h-8 border border-black p-1">
                            5
                          </div>
                        </div>
                      </div>
                      {keyIndicators[ele][e][3][0][2] === "select" && (
                        <div className="my-4 rounded-lg flex bg-slate-300">
                          <ul className="my-2 p-2 w-3/4">
                            {keyIndicators[ele][e][3][0][4].map(
                              (item, index) => (
                                <li key={index}>
                                  {index + 1}. {item}
                                </li>
                              )
                            )}
                          </ul>
                          <ul className="pb-4 w-1/4">
                            {options.map(
                              (option, index) => (
                                console.log(formData[e], e),
                                (
                                  <li className="px-2 " key={index}>
                                    <label>
                                      <input
                                        className="mr-2"
                                        type="radio"
                                        name="option"
                                        value={`option${index + 1}`}
                                        checked={
                                          formData[e].select ===
                                          `option${index + 1}`
                                        }
                                        onChange={(event) => {
                                          setFormData((prevData) => {
                                            const updatedFormData = {
                                              ...prevData,
                                            };
                                            updatedFormData[e].select =
                                              event.target.value;
                                            return updatedFormData;
                                          });
                                        }}
                                      />
                                      {option}
                                    </label>
                                  </li>
                                )
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {keyIndicators[ele][e][3] &&
                        keyIndicators[ele][e][3].map((elem, index) => {
                          return (
                            <div key={index}>
                              {elem[2] === true && (
                                <div className="p-4 bg-slate-300 rounded-md flex mb-4 mt-4">
                                  <span className="w-3/5">{elem[1]}</span>

                                  <FiveYearInput
                                    e={e}
                                    question={elem[0]}
                                    formData={formData}
                                    setFormData={setFormData}
                                  />
                                </div>
                              )}

                              {elem[3] && (
                                <div className="p-4  rounded-md flex mb-4 mt-4">
                                  <span className="w-3/5">{elem[3]}</span>
                                  <div className="w-2/5 flex border border-black">
                                    {elem[3] &&
                                      Array.from({ length: 5 }, (_, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col w-1/5 p-2 pt-0"
                                        >
                                          <div>
                                            {currentYear - (index + 1)}-
                                            {extractLastTwoDigits(currentYear)}
                                          </div>
                                          <div className="border border-black px-1">
                                            {relatedInput[elem[0]][
                                              `year${index + 1}`
                                            ] || 0}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      {keyIndicators[ele][e][4] && (
                        <>
                          <div className="p-4 bg-slate-300 rounded-md flex">
                            <div className="flex flex-col">
                              <b>
                                <i>{keyIndicators[ele][e][4][0]}</i>
                              </b>
                              <table>
                                <tbody>
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <tr key={`A${index}`}>
                                      <td>
                                        <input
                                          type="radio"
                                          name="option"
                                          value={`option${index + 1}`}
                                          checked={
                                            formData["1.4.1"][3] ===
                                            `option${index + 1}`
                                          }
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td className="align-middle">
                                        &nbsp;&nbsp;
                                        <b>{index + 1}. </b>
                                        &nbsp;
                                      </td>
                                      <td>
                                        <label className="text-sm">
                                          {keyIndicators[ele][e][4][index + 1]}
                                        </label>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {keyIndicators[ele][e][2] && (
                    <DocumentUpload
                      formData={formData}
                      setFormData={setFormData}
                      e={e}
                      tableData={keyIndicators[ele][e][2]}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default forwardRef(Criteria7);

const DocumentUpload = ({ tableData, e, formData, setFormData }) => {
  const links = Object.keys(tableData).filter(
    (key) => tableData[key][0] === "Link"
  );
  const handleDocUpload = async (event, uri, doc) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return config.notify("No file selected.", "error");
    }
    // Get the file extension
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (fileExtension !== "pdf") {
      config.notify("info", "File must be in PDF format.");
      e.target.value = ""; // Clear the file input
      return;
    } else {
      (async () => {
        const formsData = new FormData();
        formsData.append("name", uri);
        formsData.append("pdf", selectedFile);
        const response = await config.ssrAPIRequest(
          "PUT",
          `crite-7/${formData.criteriaVII_Id}/doc`,
          formsData
        );
        if (response !== "Failed to save document") {
          config.notify("File Uploaded", "success");
          setFormData((prevData) => {
            const updatedFormData = { ...prevData };
            updatedFormData[e].doc[doc] = response;
            return updatedFormData;
          });
        }
      })();
    }
  };

  const handleDocDelete = (uri, i) => {
    (async () => {
      const formsData = new FormData();
      formsData.append("name", uri);
      const response = await config.ssrAPIRequest(
        "PUT",
        `qif/doc-c7/${formData.criteriaV_Id}`,
        formsData
      );
      if (response === "deleted Successfully") {
        config.notify("File Deleted", "error");
        setFormData((prevData) => {
          const updatedFormData = { ...prevData };
          updatedFormData[e].doc[i] = "";
          return updatedFormData;
        });
      }
    })();
  };
  return (
    <div className="mb-4">
      {tableData && (
        <table className="pl-4 pr-8 w-full">
          <tbody>
            <tr className="w-full border border-black">
              <td className="w-1/5 border border-black">File Description</td>
              <td className="w-1/5 border border-black">Template</td>
              <td className="w-1/5 border border-black">Documents</td>
            </tr>
            {Object.keys(tableData).map((ele, i) => {
              return (
                (tableData[ele][0] === "Data Template" ||
                  tableData[ele][0] === "Upload") && (
                  <tr key={i}>
                    <td className="w-1/5 border border-black">{ele}</td>
                    <td className="w-1/5 border border-black">
                      {tableData[ele][0] === "Data Template" &&
                        "Document Template"}
                    </td>
                    <td className="w-1/5 border border-black p-1">
                      <div className="w-1/2 border-black">
                        {formData[e].doc[i] ? (
                          <div className="flex flex-row">
                            <a
                              className="cursor-pointer my-auto ml-2"
                              href={config.RESOURCE_URL + formData[e].doc[i]}
                              target="_blank"
                            >
                              View Document
                            </a>
                            <div
                              className="ml-2 my-auto cursor-pointer"
                              onClick={() =>
                                handleDocDelete(tableData[ele][1], i)
                              }
                            >
                              <ImBin2 />
                            </div>
                          </div>
                        ) : (
                          <label className="custom-file-upload border bg-gradient-to-br from-slate-100 to-slate-200 text-black/80 rounded-md cursor-pointer shadow-xl shadow-slate-300/60 p-1">
                            <input
                              type="file"
                              name={`doc${i}`}
                              accept=".pdf"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                handleDocUpload(e, tableData[ele][1], i);
                              }}
                            />
                            Upload File
                          </label>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
            {links.length > 0 &&
              links.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td className="w-1/5 border border-black">{ele}</td>
                    <td className="w-1/5 border border-black"></td>
                    <td className="w-1/5 border border-black p-1">
                      <input
                        className="w-full border border-black mb-1"
                        type="text"
                        value={formData[e].link[i] || ""}
                        onChange={(event) => {
                          setFormData((prevData) => {
                            const updatedFormData = { ...prevData };
                            updatedFormData[e].link[i] = event.target.value;
                            return updatedFormData;
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};
