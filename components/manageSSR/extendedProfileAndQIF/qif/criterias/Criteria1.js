"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";

const Criteria1 = (prop, ref) => {
  const { ansQs, setAnsQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormdata] = useState({
    "1.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "1.2.1": {
      link: [""], //Link
      "1.2.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      doc: ["", "", ""],
    },
    "1.2.2": {
      link: ["abcd"], //Link (dummy dont make it empty)
      "1.2.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      doc: ["", ""],
    },
    "1.3.1": { para: "", doc: [""], link: [""] },
    "1.3.2": {
      link: ["abcd"], //Link (dummy dont make it empty)
      "1.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      doc: ["", ""],
    },
    "1.4.1": {
      link: [""], //Link
      doc: ["", "", "", ""],
      select: "", // Selected option
    },
  });
  const [relatedInput, setRelatedInput] = useState({
    "1.2.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "1.2.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });
  const keyIndicators = {
    "Curriculum Planning and Implementation": {
      "1.1.1": [
        "QIM",
        "The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment",
        {
          "Upload Additional information": ["Upload", "documents_CA"],
          "Link for Additional Information": ["Link"],
        },
      ],
    },
    "Academic Flexibility": {
      "1.2.1": [
        "QnM",
        "Number of Certificate/Value added courses offered and online courses of MOOCs, SWAYAM, NPTEL etc.  where the students of the institution have enrolled and successfully completed during the last five years)",
        {
          "Institutional data in the prescribed format": [
            "Data Template",
            "institutionalDataFormatDocs_AF",
          ],
          "Institutional programme brochure/notice for Certificate/Value added programs with course modules and outcomes":
            ["Upload", "programBrochureDoc_AF"],
          "List of students and the attendance sheet for the above mentioned programs":
            ["Upload", "studentAttendanceList_AF"],
          "Evidence of course completion, like course completion certificate etc.":
            ["Upload", "courseCompletionEvidenceDoc_AF"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "1.2.1.1",
            "1.2.1.1: Number of Certificate/Value added courses offered and online courses of MOOCs, SWAYAM, NPTEL etc. where the students of the institution have enrolled and successfully completed during the last five years:",
            true,
          ],
        ],
      ],
      "1.2.2": [
        "QnM",
        "Percentage of students enrolled in Certificate/ Value added courses and also completed online courses of MOOCs, SWAYAM, NPTEL etc. as against the total number of students during the last five years",
        {
          "Institutional data in the prescribed format": [
            "Data Template",
            "institutionalDataFormatDoc_AF",
          ],
          "Upload supporting document": ["Upload", "supportingDoc_AF"],
        },
        [
          [
            "1.2.2.1",
            "1.2.2.1. Number of students enrolled in Certificate/ Value added courses and also completed online courses of MOOCs, SWAYAM, NPTEL etc. as against the total number of students during the last five years",
            true,
          ],
        ],
      ],
    },
    "Curriculum Enrichment": {
      "1.3.1": [
        "QIM",
        "Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability in transacting the Curriculum",
        {
          "Upload Additional information": ["Upload", "supportingDocs_CE"],
          "Link for Additional Information": ["Link"],
        },
      ],
      "1.3.2": [
        "QnM",
        "Percentage of students undertaking project work/field work/ internships (Data for the latest completed academic year)",

        {
          "Institutional data in the prescribed format": [
            "Data Template",
            "institutionalDataFormatDoc_CE",
          ],
          "Upload supporting document": ["Upload", "supportingDoc_CE"],
        },
        [
          [
            "1.3.2.1",
            "1.3.2.1. Number of students undertaking project work/field work/internships:",
            true,
          ],
        ],
      ],
    },
    "Feedback System": {
      "1.4.1": [
        "QnM",
        "Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website",
        {
          "Institutional data in the prescribed format": [
            "Data Template",
            "instiDataFormatDoc_FS",
          ],
          "At least 4 filled-in feedback form from different stake holders like Students, Teachers, Employers, Alumni etc.":
            ["Upload", "feedbackFormsFromStakeholdersDoc_FS"],
          "Feedback analysis report submitted to appropriate bodies": [
            "Upload",
            "feedbackAnalysisReprtSubmDoc_FS",
          ],
          "Action taken report on the feedback analysis": [
            "Upload",
            "feedbackAnalysisReprtSubmDoc_FS",
          ],
          "Link of institution’s website where comprehensive feedback, its analytics and action taken report are hosted":
            ["Link"],
        },
        [
          [
            "",
            "",
            "select",
            "",
            [
              "Feedback processes of the institution may be classified as follows: ",
              "Feedback collected, analysed, action taken& communicated to the relevant bodies and feedback hosted on the institutional website.",
              "Feedback collected, analysed and action has been taken and communicated to the relevant bodies.",
              "Feedback collected and analysed.",
              "Feedback collected.",
              "Feedback not collected.",
            ],
          ],
        ],
      ],
    },
  };
  const options = [
    "A. All of the above",
    "B. Any 3 of the above",
    "C. Any 2 of the above",
    "D. Any 1 of the above",
    "E. None of the above",
  ];

  useEffect(() => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/${collegeData.collegId}`
      );
      const updatedFormData = { ...formData };
      updatedFormData.qifID = response.qifID;

      const replaceNullOrUndefined = (value) => {
        return value === null ||
          value === "null" ||
          value === undefined ||
          value === "undefined"
          ? ""
          : value;
      };

      updatedFormData["1.1.1"].para = replaceNullOrUndefined(
        response.effectiveCurriculumPlanning_CA
      );
      updatedFormData["1.1.1"].link[0] = replaceNullOrUndefined(
        response.link_CA
      );
      updatedFormData["1.1.1"].doc[0] = replaceNullOrUndefined(
        response.documents_CA
      );
      updatedFormData["1.2.1"]["1.2.1.1"].year1 = replaceNullOrUndefined(
        response.certCourseCompY1_AF
      );
      updatedFormData["1.2.1"]["1.2.1.1"].year2 = replaceNullOrUndefined(
        response.certCourseCompY2_AF
      );
      updatedFormData["1.2.1"]["1.2.1.1"].year3 = replaceNullOrUndefined(
        response.certCourseCompY3_AF
      );
      updatedFormData["1.2.1"]["1.2.1.1"].year4 = replaceNullOrUndefined(
        response.certCourseCompY4_AF
      );
      updatedFormData["1.2.1"]["1.2.1.1"].year5 = replaceNullOrUndefined(
        response.certCourseCompY5_AF
      );
      updatedFormData["1.2.1"].doc[0] = replaceNullOrUndefined(
        response.institutionalDataFormatDocs_AF
      );
      updatedFormData["1.2.1"].doc[1] = replaceNullOrUndefined(
        response.programBrochureDoc_AF
      );
      updatedFormData["1.2.1"].doc[2] = replaceNullOrUndefined(
        response.studentAttendanceList_AF
      );
      updatedFormData["1.2.1"].doc[3] = replaceNullOrUndefined(
        response.courseCompletionEvidenceDoc_AF
      );
      updatedFormData["1.2.1"].link[0] = replaceNullOrUndefined(
        response.supportingLinks_AF
      );

      updatedFormData["1.2.2"]["1.2.2.1"].year1 = replaceNullOrUndefined(
        response.enrollCompPercentY1_AF
      );
      updatedFormData["1.2.2"]["1.2.2.1"].year2 = replaceNullOrUndefined(
        response.enrollCompPercentY2_AF
      );
      updatedFormData["1.2.2"]["1.2.2.1"].year3 = replaceNullOrUndefined(
        response.enrollCompPercentY3_AF
      );
      updatedFormData["1.2.2"]["1.2.2.1"].year4 = replaceNullOrUndefined(
        response.enrollCompPercentY4_AF
      );
      updatedFormData["1.2.2"]["1.2.2.1"].year5 = replaceNullOrUndefined(
        response.enrollCompPercentY5_AF
      );
      updatedFormData["1.2.2"].doc[0] = replaceNullOrUndefined(
        response.institutionalDataFormatDocs_AF
      );
      updatedFormData["1.2.2"].doc[1] = replaceNullOrUndefined(
        response.supportingDoc_AF
      );

      updatedFormData["1.3.1"].para = replaceNullOrUndefined(
        response.integratesCrosscuttingIssues_CE
      );
      updatedFormData["1.3.1"].doc[0] = replaceNullOrUndefined(
        response.supportingDoc_CE
      );
      updatedFormData["1.3.1"].link[0] = replaceNullOrUndefined(
        response.additionalInfoLink
      );

      updatedFormData["1.3.2"]["1.3.2.1"].year1 = replaceNullOrUndefined(
        response.stdUndertakingProjY1_CE
      );
      updatedFormData["1.3.2"]["1.3.2.1"].year2 = replaceNullOrUndefined(
        response.stdUndertakingProjY2_CE
      );
      updatedFormData["1.3.2"]["1.3.2.1"].year3 = replaceNullOrUndefined(
        response.stdUndertakingProjY3_CE
      );
      updatedFormData["1.3.2"]["1.3.2.1"].year4 = replaceNullOrUndefined(
        response.stdUndertakingProjY4_CE
      );
      updatedFormData["1.3.2"]["1.3.2.1"].year5 = replaceNullOrUndefined(
        response.stdUndertakingProjY5_CE
      );
      updatedFormData["1.3.2"].doc[0] = replaceNullOrUndefined(
        response.institutionalDataFormatDoc_CE
      );
      updatedFormData["1.3.2"].doc[1] = replaceNullOrUndefined(
        response.supportingDocs_CE
      );

      updatedFormData["1.4.1"].select = replaceNullOrUndefined(
        response.feedbackProcesses
      );
      updatedFormData["1.4.1"].doc[0] = replaceNullOrUndefined(
        response.instiDataFormatDoc_FS
      );
      updatedFormData["1.4.1"].doc[1] = replaceNullOrUndefined(
        response.feedbackFormsFromStakeholdersDoc_FS
      );
      updatedFormData["1.4.1"].doc[2] = replaceNullOrUndefined(
        response.feedbackAnalysisReprtSubmDoc_FS
      );
      updatedFormData["1.4.1"].doc[3] = replaceNullOrUndefined(
        response.feedbackActionReportDoc_FS
      );
      updatedFormData["1.4.1"].link[0] = replaceNullOrUndefined(
        response.feedbackWebsiteLink_FS
      );

      setFormdata(updatedFormData);
    })();
  }, []);

  const isElementFilled = (element) => {
    for (let key in element) {
      if (element.hasOwnProperty(key)) {
        // Exclude the specified key ("qifID" in this case)
        if (key === "qifID") {
          continue;
        }
        if (typeof element[key] === "object" && !Array.isArray(element[key])) {
          // If the property is an object, recursively check its elements
          if (!isElementFilled(element[key])) {
            return false;
          }
        } else if (Array.isArray(element[key])) {
          // If the property is an array, check if every element is filled
          if (element[key].some((item) => item === "")) {
            return false;
          }
        } else if (element[key] === "") {
          // If the property is neither an object nor an array, check if it is filled
          return false;
        }
      }
    }
    return true;
  };

  const countFilledElements = (formData) => {
    let count = 0;
    for (let key in formData) {
      if (key === "qifID") {
        continue;
      }
      if (formData.hasOwnProperty(key)) {
        if (isElementFilled(formData[key])) {
          count++;
        }
      }
    }
    return count;
  };

  useEffect(() => {
    const totalFilledElements = countFilledElements(formData);
    setAnsQs({ ...ansQs, 1: totalFilledElements });
    // setAnsQs(totalFilledElements);
  }, [formData]);

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const criteria1Save = async () => {
    const formsData = new FormData();
    formsData.append("qifID", formData.qifID);
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append("effectiveCurriculumPlanning_CA", formData["1.1.1"].para);
    formsData.append("documents_CA", formData["1.1.1"].doc[0]);
    formsData.append("link_CA", formData["1.1.1"].link[0]);
    formsData.append("CertCourseCompY1_AF", formData["1.2.1"]["1.2.1.1"].year1);
    formsData.append("CertCourseCompY2_AF", formData["1.2.1"]["1.2.1.1"].year2);
    formsData.append("CertCourseCompY3_AF", formData["1.2.1"]["1.2.1.1"].year3);
    formsData.append("CertCourseCompY4_AF", formData["1.2.1"]["1.2.1.1"].year4);
    formsData.append("CertCourseCompY5_AF", formData["1.2.1"]["1.2.1.1"].year5);
    formsData.append(
      "institutionalDataFormatDocs_AF",
      formData["1.2.2"].doc[0]
    );
    formsData.append("programBrochureDoc_AF", formData["1.2.2"].doc[1]);
    formsData.append("studentAttendanceList_AF", formData["1.2.2"].doc[2]);
    formsData.append(
      "courseCompletionEvidenceDoc_AF",
      formData["1.2.2"].doc[3]
    );
    formsData.append("supportingLinks_AF", formData["1.2.1"].link[0]);
    formsData.append(
      "enrollCompPercentY1_AF",
      formData["1.2.2"]["1.2.2.1"].year1
    );
    formsData.append(
      "enrollCompPercentY2_AF",
      formData["1.2.2"]["1.2.2.1"].year2
    );
    formsData.append(
      "enrollCompPercentY3_AF",
      formData["1.2.2"]["1.2.2.1"].year3
    );
    formsData.append(
      "enrollCompPercentY4_AF",
      formData["1.2.2"]["1.2.2.1"].year4
    );
    formsData.append(
      "enrollCompPercentY5_AF",
      formData["1.2.2"]["1.2.2.1"].year5
    );
    formsData.append("institutionalDataFormatDoc_AF", formData["1.2.1"].doc[0]);
    formsData.append("supportingDoc_AF", formData["1.2.2"].doc[1]);

    formsData.append("integratesCrosscuttingIssues_CE", formData["1.3.1"].para);
    formsData.append("supportingDoc_CE", formData["1.3.1"].doc[0]);
    formsData.append("additionalInfoLink", formData["1.3.1"].link[0]);
    formsData.append(
      "stdUndertakingProjY1_CE",
      formData["1.3.2"]["1.3.2.1"].year1
    );
    formsData.append(
      "stdUndertakingProjY2_CE",
      formData["1.3.2"]["1.3.2.1"].year2
    );
    formsData.append(
      "stdUndertakingProjY3_CE",
      formData["1.3.2"]["1.3.2.1"].year3
    );
    formsData.append(
      "stdUndertakingProjY4_CE",
      formData["1.3.2"]["1.3.2.1"].year4
    );
    formsData.append(
      "stdUndertakingProjY5_CE",
      formData["1.3.2"]["1.3.2.1"].year5
    );
    formsData.append("institutionalDataFormatDoc_CE", formData["1.3.2"].doc[0]);
    formsData.append("supportingDocs_CE", formData["1.3.2"].doc[1]);

    formsData.append("feedbackProcesses", formData["1.4.1"].select);
    formsData.append("instiDataFormatDoc_FS", formData["1.4.1"].doc[0]);
    formsData.append(
      "feedbackFormsFromStakeholdersDoc_FS",
      formData["1.4.1"].doc[1]
    );
    formsData.append(
      "feedbackAnalysisReprtSubmDoc_FS",
      formData["1.4.1"].doc[2]
    );
    formsData.append("feedbackActionReportDoc_FS", formData["1.4.1"].doc[3]);
    formsData.append("feedbackWebsiteLink_FS", formData["1.4.1"].link[0]);

    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c1/${formData.qifID}`,
      formsData
    );
  };

  useImperativeHandle(ref, () => ({
    criteria1Save,
  }));

  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            1.{i + 1}. {ele}
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
                        setFormData={setFormdata}
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
                          {/* {parseFloat(formData[e][1].year1) +
                            parseFloat(formData[e][1].year2) +
                            parseFloat(formData[e][1].year3) +
                            parseFloat(formData[e][1].year4) +
                            parseFloat(formData[e][1].year5) || ""} */}
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
                            {options.map((option, index) => (
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
                                      setFormdata((prevData) => {
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
                                    setFormData={setFormdata}
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
                                            wedvf{currentYear - (index + 1)}-
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
                      setFormData={setFormdata}
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

export default forwardRef(Criteria1);

const DocumentUpload = ({ formData, setFormData, e, tableData }) => {
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
          `qif/${formData.qifID}/doc`,
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
        `qif/doc/${formData.qifID}`,
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
                      {tableData[ele][0] === "Data Template" && "Data Template"}
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
                              name={i}
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
      <span className="text-blue-600 pl-3">
        Note:{" "}
        <i>
          No repeat count of courses will be considered{" "}
          <span className="text-red-600">*</span>
        </i>
      </span>
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
