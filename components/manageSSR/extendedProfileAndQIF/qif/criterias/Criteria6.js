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

const Criteria6 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "6.1.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.2.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "6.2.2": {
      doc: [""],
      select: "",
      link: [""],
    },
    "6.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.3.2": {
      doc: [""],
      "6.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "6.3.3": {
      doc: [""],
      "6.3.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "6.4.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.4.2": {
      doc: [""],
      link: [""],
      "6.4.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "6.4.3": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.5.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "6.5.2": {
      select: "",
      doc: [""],
      link: [""],
    },
    "6.5.3": {
      para: "",
      doc: [""],
      link: [""],
    },
  });
  const keyIndicators = {
    "Institutional Vision and Leadership": {
      "6.1.1": [
        "QIM",
        "The Institutional governance and leadership are in accordance with Vision and mission of the institution and it is visible in various institutional practices such as NEP implementation, sustained institutional growth, de-centralization, participation in the institutional governance and in their Short term and Long term institutional perspective plan.",
        {
          "Upload any Additional information": ["Upload", "addInfo_doc"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
    },
    "Strategy Development and Deployment": {
      "6.2.1": [
        "QIM",
        "The institutional perspective plan is effectively deployed and functioning of the Institutional bodies are effective and efficient as visible from policies, administrative set-up, appointment, service rules, procedures etc.",
        {
          "Strategic Plan and deployment documents on the website": [
            "Upload",
            "webDocsPlan_doc",
          ],
          "Upload any additional information": ["Upload", "addInfo_doc2"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
      "6.2.2": [
        "QnM",
        "Institution implements e-governance in its operations",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "",
            "6.2.2.1 e-governance is implemented covering the following areas of operations",
            "select",
            "",
            [
              "Administration including complaint management",
              "Finance and Accounts",
              "Student Admission and Support",
              "Examinations",
            ],
          ],
        ],
      ],
    },
    "Faculty Empowerment Strategies": {
      "6.3.1": [
        "QIM",
        "The institution has performance appraisal system, effective welfare measures for teaching and non-teaching staff and avenues for career development/progression",
        {
          "Upload Additional information": ["Upload", "addInfo_doc3"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
      "6.3.2": [
        "QnM",
        "Percentage of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "6.3.2.1",
            "6.3.2.1 Number of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies year wise during the last five years",
            true,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
        ],
      ],
      "6.3.3": [
        "QnM",
        "Percentage of teachers undergoing online/ face-to-face Faculty Development Programmes (FDP)/ Management Development Programs (MDP) during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "6.3.3.1",
            "6.3.3.1: Total number of teachers who have undergone online/ face-toface Faculty Development Programmes (FDP)/ Management Development Programs (MDP) during the last five years",
            true,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
        ],
      ],
    },
    "Financial Management and Resource Mobilization": {
      "6.4.1": [
        "QIM",
        "Institutional strategies for mobilisation of funds other than salary and fees and the optimal utilisation of resources.",
        {
          "Upload Additional information": ["Upload", "addInfo_doc4"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
      "6.4.2": [
        "QnM",
        "Funds / Grants received from government bodies/non government and philanthropists during the last five years for development and maintenance of infrastructure (not covered under Criteria III and V )",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "6.4.2.1",
            "6.4.2.1: Total Grants received from government and non-government bodies and philanthropists for development and maintenance of infrastructure (not covered under Criteria III and V) year-wise during the last five years (INR in Lakhs)",
            true,
          ],
        ],
      ],
      "6.4.3": [
        "QIM",
        "Institution regularly conducts internal and external financial audits",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
      ],
    },
    "Internal Quality Assurance System": {
      "6.5.1": [
        "QIM",
        "Internal Quality Assurance Cell (IQAC)/ Internal Quality Assurance System (IQAS) has contributed significantly for institutionalizing the quality assurance strategies and processes, by constantly reviewing the teachinglearning process, structures & methodologies of operations and learning outcomes, at periodic intervals.",
        {
          "Upload Additional information": ["Upload", "addInfo_doc5"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
      "6.5.2": [
        "QnM",
        "Institution has adopted the following for Quality assurance:",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "",
            "",
            "select",
            "",
            [
              "Academic and Administrative Audit (AAA) and follow up action taken",
              "Conferences, Seminars, Workshops on quality conducted",
              "Collaborative quality initiatives with other institution(s)",
              "Orientation programme on quality issues for teachers and students",
              "Participation in NIRF and other recognized ranking like Shanghai Ranking, QS Ranking Times Ranking etc",
              "Any other quality audit recognized by state, national or international agencies",
            ],
            [
              "Any 5 or more of the above",
              "Any 4 of the above",
              "Any 3 of the above",
              "Any 2 of the above",
              "Any 1 of the above",
            ],
          ],
        ],
      ],
      "6.5.3": [
        "QIM",
        "Incremental improvements made for the preceding five years with regard to quality (in case of first cycle NAAC A/A)",
        {
          "Upload Additional information": ["Upload", "addInfo_doc5"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
    },
  };
  const [relatedInput, setRelatedInput] = useState({
    "6.3.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "6.3.3.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });

  const options = [
    "A. All of the above",
    "B. Any 3 of the above",
    "C. Any 2 of the above",
    "D. Any 1 of the above",
    "E. None of the above",
  ];

  useEffect(() => {
    // (async () => {
    //   const response = await config.ssrAPIRequest(
    //     "GET",
    //     `extended-ssr/${collegeData.collegId}`
    //   );
    //   if (response) {
    //     const updatedRelatedInput = { ...relatedInput };
    //     updatedRelatedInput["6.3.2.1"].year1 = response.acadFullTimeTeachYear1;
    //     updatedRelatedInput["6.3.2.1"].year2 = response.acadFullTimeTeachYear2;
    //     updatedRelatedInput["6.3.2.1"].year3 = response.acadFullTimeTeachYear3;
    //     updatedRelatedInput["6.3.2.1"].year4 = response.acadFullTimeTeachYear4;
    //     updatedRelatedInput["6.3.2.1"].year5 = response.acadFullTimeTeachYear5;
    //     updatedRelatedInput["6.3.3.1"] = updatedRelatedInput["6.3.2.1"];
    //     setRelatedInput(updatedRelatedInput);
    //   }
    // })();
    // (async () => {
    //   const response = await config.ssrAPIRequest(
    //     "GET",
    //     `qif/data-c6/${collegeData.collegId}`
    //   );
    //   const updatedFormData = { ...formData };
    //   updatedFormData.qifId = response.qifId;
    //   updatedFormData.criteriaVI_Id = response.criteriaVI_Id;
    //   updatedFormData["6.1.1"].para = response.instGovPractices;
    //   updatedFormData["6.1.1"].doc[0] = response.addInfo_doc;
    //   updatedFormData["6.1.1"].link[0] = response.addInfo_link;
    //   updatedFormData["6.2.1"].para = response.instPerspPlanEff;
    //   updatedFormData["6.2.1"].doc[0] = response.webDocsPlan_doc;
    //   updatedFormData["6.2.1"].doc[1] = response.addInfo_doc2;
    //   updatedFormData["6.2.1"].link[0] = response.addInfo_link2;
    //   updatedFormData["6.2.2"].select = response.eGovInstitutionTyp1;
    //   updatedFormData["6.2.2"].doc[0] = response.egovImplementation_doc;
    //   updatedFormData["6.2.2"].doc[1] = response.iegErpExpStatements_doc;
    //   updatedFormData["6.2.2"].doc[2] = response.egovReportApprovalPolicy_doc;
    //   updatedFormData["6.2.2"].link[0] = response.relivantDoc_link;
    //   updatedFormData["6.3.1"].para = response.InstitutionAppraisalSystem;
    //   updatedFormData["6.3.1"].doc[0] = response.addInfo_doc3;
    //   updatedFormData["6.3.1"].link[0] = response.addInfo_link3;
    //   updatedFormData["6.3.2"]["6.3.2.1"].year1 =
    //     response.numTeachSupFinanForConfOrWorkY1;
    //   updatedFormData["6.3.2"]["6.3.2.1"].year2 =
    //     response.numTeachSupFinanForConfOrWorkY2;
    //   updatedFormData["6.3.2"]["6.3.2.1"].year3 =
    //     response.numTeachSupFinanForConfOrWorkY3;
    //   updatedFormData["6.3.2"]["6.3.2.1"].year4 =
    //     response.numTeachSupFinanForConfOrWorkY4;
    //   updatedFormData["6.3.2"]["6.3.2.1"].year5 =
    //     response.numTeachSupFinanForConfOrWorkY5;
    //   updatedFormData["6.3.2"].doc[0] = response.instDataTemplate_doc;
    //   updatedFormData["6.3.2"].doc[1] = response.teacherSupportPolicy_doc;
    //   updatedFormData["6.3.2"].doc[2] = response.financialAssistanceHead_doc;
    //   updatedFormData["6.3.2"].doc[3] = response.auditStatementTeacherSupport;
    //   updatedFormData["6.3.2"].link[0] = response.relivantDoc_link2;
    //   updatedFormData["6.3.3"]["6.3.3.1"].year1 =
    //     response.staffTrainingPercentY1;
    //   updatedFormData["6.3.3"]["6.3.3.1"].year2 =
    //     response.staffTrainingPercentY2;
    //   updatedFormData["6.3.3"]["6.3.3.1"].year3 =
    //     response.staffTrainingPercentY3;
    //   updatedFormData["6.3.3"]["6.3.3.1"].year4 =
    //     response.staffTrainingPercentY4;
    //   updatedFormData["6.3.3"]["6.3.3.1"].year5 =
    //     response.staffTrainingPercentY5;
    //   updatedFormData["6.3.3"].doc[0] = response.instDataTemplate_doc2;
    //   updatedFormData["6.3.3"].doc[1] = response.facultyTrainingEvents_doc;
    //   updatedFormData["6.3.3"].doc[2] = response.certificatesList_doc;
    //   updatedFormData["6.3.3"].doc[3] = response.teacherProgramReports_doc;
    //   updatedFormData["6.3.3"].link[0] = response.relivantDoc_link3;
    //   updatedFormData["6.4.1"].para = response.resourceUtilizationStrategy;
    //   updatedFormData["6.4.1"].doc[0] = response.addInfo_doc4;
    //   updatedFormData["6.4.1"].link[0] = response.addInfo_link4;
    //   updatedFormData["6.5.1"].para = response.IQACQualityAssurance;
    //   updatedFormData["6.5.1"].doc[0] = response.addInfo_doc5;
    //   updatedFormData["6.5.1"].link[0] = response.addInfo_link5;
    //   updatedFormData["6.5.2"].select = response.qualityInitiativesTyp1;
    //   updatedFormData["6.5.2"].doc[0] = response.followUpActions_doc;
    //   updatedFormData["6.5.2"].doc[1] = response.qaReportCertValid_doc;
    //   updatedFormData["6.5.2"].doc[2] = response.CollabQualityInitData_doc;
    //   updatedFormData["6.5.2"].link[0] = response.iqacMeetingMinutesURL;
    //   updatedFormData["6.5.2"].link[1] = response.relivantDoc_link4;
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

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const criteria6Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append("CriteriaVI_Id", formData.criteriaVI_Id);
    formsData.append("instGovPractices", formData["6.1.1"].para);
    formsData.append("addInfo_link", formData["6.1.1"].link[0]);
    formsData.append("instPerspPlanEff", formData["6.2.1"].para);
    formsData.append("addInfo_link2", formData["6.2.1"].link[0]);
    formsData.append("eGovInstitutionTyp1", formData["6.2.2"].select);
    formsData.append("relivantDoc_link", formData["6.2.2"].link[0]);
    formsData.append("InstitutionAppraisalSystem", formData["6.3.1"].para);
    formsData.append("addInfo_link3", formData["6.3.1"].link[0]);
    formsData.append(
      "numTeachSupFinanForConfOrWorkY1",
      formData["6.3.2"]["6.3.2.1"].year1
    );
    formsData.append(
      "numTeachSupFinanForConfOrWorkY2",
      formData["6.3.2"]["6.3.2.1"].year2
    );
    formsData.append(
      "numTeachSupFinanForConfOrWorkY3",
      formData["6.3.2"]["6.3.2.1"].year3
    );
    formsData.append(
      "numTeachSupFinanForConfOrWorkY4",
      formData["6.3.2"]["6.3.2.1"].year4
    );
    formsData.append(
      "numTeachSupFinanForConfOrWorkY5",
      formData["6.3.2"]["6.3.2.1"].year5
    );
    formsData.append("relivantDoc_link2", formData["6.3.2"].link[0]);
    formsData.append(
      "staffTrainingPercentY1",
      formData["6.3.3"]["6.3.3.1"].year1
    );
    formsData.append(
      "staffTrainingPercentY2",
      formData["6.3.3"]["6.3.3.1"].year2
    );
    formsData.append(
      "staffTrainingPercentY3",
      formData["6.3.3"]["6.3.3.1"].year3
    );
    formsData.append(
      "staffTrainingPercentY4",
      formData["6.3.3"]["6.3.3.1"].year4
    );
    formsData.append(
      "staffTrainingPercentY5",
      formData["6.3.3"]["6.3.3.1"].year5
    );
    formsData.append("relivantDoc_link3", formData["6.3.3"].link[0]);
    formsData.append("resourceUtilizationStrategy", formData["6.4.1"].para);
    formsData.append("addInfo_link4", formData["6.4.1"].link[0]);
    formsData.append("IQACQualityAssurance", formData["6.5.1"].para);
    formsData.append("addInfo_link5", formData["6.5.1"].link[0]);
    formsData.append("qualityInitiativesTyp1", formData["6.5.2"].select);
    formsData.append("iqacMeetingMinutesURL", formData["6.5.2"].link[0]);
    formsData.append("relivantDoc_link4", formData["6.5.2"].link[1]);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c6/${collegeData.collegId}`,
      formsData
    );
  };
  useImperativeHandle(ref, () => ({
    criteria6Save,
  }));
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            6.{i + 1}. {ele}
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

export default forwardRef(Criteria6);

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
          `crite-6/${formData.criteriaVI_Id}/doc`,
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
        `qif/doc-c6/${formData.criteriaVI_Id}`,
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
