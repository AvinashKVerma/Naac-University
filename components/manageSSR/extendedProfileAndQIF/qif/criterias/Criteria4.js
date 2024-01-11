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
import { keyIndicators4 } from "./CriteriaData";

const Criteria4 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "4.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "4.1.2": {
      doc: ["", ""],
      link: [""],
      "4.1.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "4.2.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "4.2.2": {
      doc: [""],
      link: [""],
      "4.2.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "4.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "4.3.2": {
      doc: ["", ""],
      link: [""],
      "4.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "4.3.3": {
      doc: [""],
      link: [""],
      select: "",
    },
    "4.4.1": {
      doc: [""],
      "4.4.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "4.4.2": {
      para: "",
      doc: [""],
      link: [""],
    },
  });

  const [relatedInput, setRelatedInput] = useState({
    "4.1.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "4.2.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "4.3.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "4.4.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });

  const keyIndicators = keyIndicators4;
  const options = Option;

  useEffect(() => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );
      if (response) {
        const updatedRelatedInput = { ...relatedInput };
        updatedRelatedInput["4.1.2.1"].year1 =
          response.expenditureWithoutSalaryYear1;
        updatedRelatedInput["4.1.2.1"].year2 =
          response.expenditureWithoutSalaryYear2;
        updatedRelatedInput["4.1.2.1"].year3 =
          response.expenditureWithoutSalaryYear3;
        updatedRelatedInput["4.1.2.1"].year4 =
          response.expenditureWithoutSalaryYear4;
        updatedRelatedInput["4.1.2.1"].year5 =
          response.expenditureWithoutSalaryYear5;
        updatedRelatedInput["4.3.2.1"].year1 = response.studentYear1;
        updatedRelatedInput["4.3.2.1"].year2 = response.studentYear2;
        updatedRelatedInput["4.3.2.1"].year3 = response.studentYear3;
        updatedRelatedInput["4.3.2.1"].year4 = response.studentYear4;
        updatedRelatedInput["4.3.2.1"].year4 = response.studentYear5;
        updatedRelatedInput["4.4.1.1"] = updatedRelatedInput["4.1.2.1"];
        setRelatedInput(updatedRelatedInput);
      }
    })();

    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/data-c4/${collegeData.collegId}`
      );
      const updatedFormData = { ...formData };
      updatedFormData.qifId = response.qifId;
      updatedFormData.criteriaIV_Id = response.criteriaIV_Id;
      updatedFormData["4.1.1"].para = response.facilities;
      updatedFormData["4.1.1"].doc[0] = response.addInfo_doc;
      updatedFormData["4.1.1"].link[0] = response.addInfo_link;
      updatedFormData["4.1.2"]["4.1.2.1"].year1 =
        response.infraExpenditurePercenY1;
      updatedFormData["4.1.2"]["4.1.2.1"].year2 =
        response.infraExpenditurePercenY2;
      updatedFormData["4.1.2"]["4.1.2.1"].year3 =
        response.infraExpenditurePercenY3;
      updatedFormData["4.1.2"]["4.1.2.1"].year4 =
        response.infraExpenditurePercenY4;
      updatedFormData["4.1.2"]["4.1.2.1"].year5 =
        response.infraExpenditurePercenY5;
      updatedFormData["4.1.2"].doc[0] = response.institutionalDataTemplate_doc;
      updatedFormData["4.1.2"].doc[1] = response.AudRep_incomExpendiState_doc;
      updatedFormData["4.1.2"].link[0] = response.supportDocLink;
      updatedFormData["4.2.1"].para = response.libraryILMS;
      updatedFormData["4.2.1"].doc[0] = response.addInfo_doc2;
      updatedFormData["4.2.1"].link[0] = response.addInfo_link2;
      updatedFormData["4.3.1"].para = response.itFaciUpdDatWiFiBandwidth;
      updatedFormData["4.3.1"].doc[0] = response.addInfo_doc3;
      updatedFormData["4.3.1"].link[0] = response.addInfo_link3;
      updatedFormData["4.3.2"]["4.3.2.1"].year1 = response.numStudCompAY1;
      updatedFormData["4.3.2"]["4.3.2.1"].year2 = response.numStudCompAY2;
      updatedFormData["4.3.2"]["4.3.2.1"].year3 = response.numStudCompAY3;
      updatedFormData["4.3.2"]["4.3.2.1"].year4 = response.numStudCompAY4;
      updatedFormData["4.3.2"]["4.3.2.1"].year5 = response.numStudCompAY5;
      updatedFormData["4.3.2"].doc[0] = response.StockRegistryExtractor_doc;
      updatedFormData["4.3.2"].doc[1] = response.numCompPurchased_doc;
      updatedFormData["4.3.2"].link[0] = response.supportDocLink2;
      updatedFormData["4.4.1"]["4.4.1.1"].year1 = response.expFaciMaintenanceY1;
      updatedFormData["4.4.1"]["4.4.1.1"].year2 = response.expFaciMaintenanceY2;
      updatedFormData["4.4.1"]["4.4.1.1"].year3 = response.expFaciMaintenanceY3;
      updatedFormData["4.4.1"]["4.4.1.1"].year4 = response.expFaciMaintenanceY4;
      updatedFormData["4.4.1"]["4.4.1.1"].year5 = response.expFaciMaintenanceY5;
      updatedFormData["4.4.1"].doc[0] = response.addInfo_doc4;
      updatedFormData["4.4.1"].link[0] = response.addInfo_link4;
      setFormData(updatedFormData);
    })();
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

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const criteria4Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append("criteriaIV_Id", formData.criteriaIV_Id);
    formsData.append("facilities", formData["4.1.1"].para);
    formsData.append("addInfo_link", formData["4.1.1"].link[0]);
    formsData.append(
      "infraExpenditurePercenY1",
      formData["4.1.2"]["4.1.2.1"].year1
    );
    formsData.append(
      "infraExpenditurePercenY2",
      formData["4.1.2"]["4.1.2.1"].year2
    );
    formsData.append(
      "infraExpenditurePercenY3",
      formData["4.1.2"]["4.1.2.1"].year3
    );
    formsData.append(
      "infraExpenditurePercenY4",
      formData["4.1.2"]["4.1.2.1"].year4
    );
    formsData.append(
      "infraExpenditurePercenY5",
      formData["4.1.2"]["4.1.2.1"].year5
    );
    formsData.append("supportDocLink", formData["4.1.2"].link[0]);
    formsData.append("libraryILMS", formData["4.2.1"].para);
    formsData.append("addInfo_link2", formData["4.2.1"].link[0]);
    formsData.append("itFaciUpdDatWiFiBandwidth", formData["4.3.1"].para);
    formsData.append("addInfo_link3", formData["4.3.1"].link[0]);
    formsData.append("numStudCompAY1", formData["4.3.2"]["4.3.2.1"].year1);
    formsData.append("numStudCompAY2", formData["4.3.2"]["4.3.2.1"].year2);
    formsData.append("numStudCompAY3", formData["4.3.2"]["4.3.2.1"].year3);
    formsData.append("numStudCompAY4", formData["4.3.2"]["4.3.2.1"].year4);
    formsData.append("numStudCompAY5", formData["4.3.2"]["4.3.2.1"].year5);
    formsData.append("supportDocLink2", formData);
    formsData.append("supportDocLink2", formData["4.3.2"].link[0]);
    formsData.append(
      "expFaciMaintenanceY1",
      formData["4.4.1"]["4.4.1.1"].year1
    );
    formsData.append(
      "expFaciMaintenanceY2",
      formData["4.4.1"]["4.4.1.1"].year2
    );
    formsData.append(
      "expFaciMaintenanceY3",
      formData["4.4.1"]["4.4.1.1"].year3
    );
    formsData.append(
      "expFaciMaintenanceY4",
      formData["4.4.1"]["4.4.1.1"].year4
    );
    formsData.append(
      "expFaciMaintenanceY5",
      formData["4.4.1"]["4.4.1.1"].year5
    );
    formsData.append("addInfo_link4", formData["4.4.1"].link[0]);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c4/${collegeData.collegId}`,
      formsData
    );
  };
  useImperativeHandle(ref, () => ({
    criteria4Save,
  }));
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            4.{i + 1}. {ele}
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
                      <div className="flex">
                        <span className="w-3/5">
                          {e} {keyIndicators[ele][e][1]}
                        </span>
                        <div className="w-2/5 h-8 border border-black p-1">
                          5
                        </div>
                      </div>
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

                              {elem[3] && elem[0] && (
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
                      {keyIndicators[ele][e][3][0][2] === "select" && (
                        <>
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
                            <ul className="my-2 py-2 w-1/4">
                              {keyIndicators[ele][e][3][0][5]
                                ? keyIndicators[ele][e][3][0][5].map(
                                    (option, index) => (
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
                                : options.map((option, index) => (
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
                                  ))}
                            </ul>
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

export default forwardRef(Criteria4);

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
          `crite-4/${formData.criteriaIV_Id}/doc`,
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
        `qif/doc-c4/${formData.criteriaIV_Id}`,
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

const FiveYearInput = ({ e, question, formData, setFormData }) => {
  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }
  return (
    <div className="w-2/5 flex">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex flex-col w-1/5 p-2 pt-0">
          <label>
            {currentYear - (index + 1)}-
            {extractLastTwoDigits(currentYear - index)}
          </label>
          <input
            className="border border-black px-1"
            type="text"
            name={`year${index + 1}`}
            value={formData[e][question][`year${index + 1}`] || ""}
            onChange={(event) => {
              const { name, value } = event.target;
              const numericValue = parseFloat(value) ? parseFloat(value) : 0;
              setFormData((prevData) => {
                const updatedFormData = { ...prevData };
                updatedFormData[e][question] = {
                  ...updatedFormData[e][question],
                  [name]: numericValue ? numericValue : "",
                };
                return updatedFormData;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
