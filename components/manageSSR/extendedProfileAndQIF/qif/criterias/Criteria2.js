"use client";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Question from "../Question";
import { ImBin2 } from "react-icons/im";
import { contextManager } from "context/store";
import { config } from "apiCalls/Configuration";

const Criteria2 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "2.1.1": {
      doc: ["", "", ""],
      "2.1.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "2.1.1.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "2.1.2": {
      doc: ["", "", ""],
      "2.1.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "2.2.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.2.2": {
      doc: [""],
      "2.2.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "2.2.1.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "2.3.1": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.3.2": {
      para: "",
      doc: [""],
      link: [""],
    },
    "2.4.1": {
      doc: [""],
      link: [""],
    },
    "2.4.2": {
      "2.4.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      doc: [""],
      link: [""],
    },
    "2.4.3": {
      doc: [""],
      link: [""],
      "2.4.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.5.1": {
      doc: [""],
      link: [""],
      "2.5.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.5.2": {
      doc: [""],
      link: [""],
      "2.5.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "2.5.2.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.5.3": {
      doc: [""],
      link: [""],
      select: "",
    },
    "2.6.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "2.6.2": {
      doc: [""],
      link: [""],
      "2.6.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.6.3": {
      doc: ["", "", ""],
      link: [""],
      "2.6.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "2.6.3.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "2.7.1": {
      doc: [""],
      link: [""],
    },
  });
  const [relatedInput, setRelatedInput] = useState({
    "2.1.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.2.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.2.1.2": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.4.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.4.1.2": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.4.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.4.3.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "2.6.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });
  const keyIndicators = {
    "Student Enrolment and Profile ": {
      "2.1.1": [
        "QnM",
        "Enrolment percentage",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc",
          ],
          "Document relating to sanction of intake as approved by competent authority":
            ["Upload", "intakeSanctionApproval_doc"],
          "Admission extract signed by the component authority (only fresh admission to be considered":
            ["Upload", "finalAdmissionList_doc"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.1.1.1",
            "2.1.1.1 Number of sanctioned seats year wise during last five years",
            true,
          ],
          [
            "2.1.1.2",
            "2.1.1.2 Number of seats filled year wise during last five years (Only first year admissions to be considered)",
            true,
          ],
        ],
      ],
      "2.1.2": [
        "QnM",
        "Percentage of seats filled against reserved categories (SC, ST, OBC etc.) as per applicable reservation policy for the first year admission during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc",
          ],
          "Copy of the letter issued by the State govt. or Central Government Indicating the reserved categories(SC, ST, OBC, Divyangjan, etc.) to be considered as per the state rule (Translated copy in English to be provided as applicable)":
            ["Upload", "govtLetter_doc"],
          "Final admission list indicating the category as published by the HEI and endorsed by the competent authority.":
            ["Upload", "finalAdmissionList_doc2"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.1.2.1",
            "2.1.2.1. Number of actual students admitted from the reserved categories year wise during last five years (Exclusive of supernumerary seats)",
            true,
            "Number of seats earmarked for reserved category as per GOI/State Govt rule year wise during the last five years",
          ],
        ],
      ],
    },
    "Catering to Student Diversity": {
      "2.2.1": [
        "QIM",
        "The institution assesses the learning levels of the students and organises special Programmes to cater to differential learning needs of the student",
        {
          "Provide Link for Additional information": ["Link"],
          "Upload Additional information": ["Upload", "additionalInfo_doc2"],
        },
      ],
      "2.2.2": [
        "QnM",
        "Student – Full time Teacher Ratio",
        {
          "Upload Additional information": ["Upload", "additionalInfo_doc"],
          "Link for Additional Information": ["Link"],
        },
        [
          [
            "2.2.1.1",
            "",
            false,
            "Number of students on rolls year-wise during the last five years",
          ],
          [
            "2.2.1.2",
            "",
            false,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
        ],
      ],
    },
    "Teaching-Learning Process": {
      "2.3.1": [
        "QIM",
        "Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experience and teachers use ICT-enabled tools including online resources for effective teaching learning process",
        {
          "Upload Additional information": ["Upload", "additionalInfo_doc2"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
      "2.3.2": [
        "QIM",
        "The institution adopts effective Mentor-Mentee Schemes to address academics and student-psychological issues",
        {
          "Upload Additional information": ["Upload", "additionalInfo_doc2"],
          "List of Active mentors": ["Upload", "dummy"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
    },
    "Teacher Profile and Quality": {
      "2.4.1": [
        "QnM",
        "Average percentage of full time teachers appointed against the number of sanctioned posts year wise during the last five years",
        {
          "Sanction letters indicating number of posts sanctioned by the competent authority (including Management sanctioned posts)":
            ["Upload", "sanctionedPostsMap_doc"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.4.1.1",
            "",
            false,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
        ],
      ],
      "2.4.2": [
        "QnM",
        "Percentage of full time teachers with Ph.D./D.M/M.Ch./D.N.B/ Superspeciality/L.L.D/D.S.C/D.Litt. during the last five years",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            ["Data Template", "instDataTemplate_doc3"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.4.2.1",
            "2.4.2.1 Number of full time teachers with Ph.D./D.M/M.Ch./D.N.B/ Superspeciality/L.L.D/D.S.C/D.Litt Superspecialist during the last five years",
            true,
            "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
          ],
        ],
      ],
      "2.4.3": [
        "QnM",
        "Average teaching experience of full time teachers (Data to be provided only for the latest completed academic year, in number of years)",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            ["Data Template", "instDataTemplate_doc3"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.4.3.1",
            "2.4.3.1: Total teaching experience of full-time teachers (for the latest completed academic year)",
            true,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
        ],
      ],
    },
    "Evaluation Process and Reforms": {
      "2.5.1": [
        "QnM",
        "Average number of days from the date of last semester-end/ year- end examination till the last date of declaration of results year-wise during last five years",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            ["Data Template", "instDataTemplate_doc3"],
          "Provide Link for Additional information": ["Link"],
        },
        [
          [
            "2.5.1.1",
            "2.5.1.1: Number of days from the date of last semester-end/ year- end examination till the last date declaration of results year-wise during the last five years",
            true,
          ],
        ],
      ],
      "2.5.2": [
        "QnM",
        "Percentage of student complaints/grievances about evaluation against total number of students appeared in the examinations during the last five years",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            ["Data Template", "instDataTemplate_doc3"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.5.2.1",
            "2.5.2.1: Number of complaints/grievances about evaluation year-wise during the last five years",
            true,
          ],
          [
            "2.5.2.2",
            "2.5.2.2: Number of students appeared in the examination conducted by the institution year wise during the last five years",
            true,
          ],
        ],
      ],
      "2.5.3": [
        "QnM",
        "Status of automation of Examination division along with approved Examination Manual/ordinance",
        {
          "Institutional data in the prescribed format (data template merged with 2.1)":
            ["Data Template", "instDataTemplate_doc3"],
          "Provide Link for Additional information": ["Link"],
        },
        [
          [
            "",
            "",
            "select",
            "",
            [
              "100% automation of entire division & implementation of Examination Management System (EMS)",
              "Only student registration, Hall ticket issue & Result Processing",
              "Only student registration and result processing",
              "Only result processing",
              "Only manual methodology",
            ],
          ],
        ],
      ],
    },
    "Student Performance and Learning Outcome": {
      "2.6.1": [
        "QIM",
        "The institution has stated learning outcomes (Program and Course outcomes)/graduate attributes which are integrated into the assessment process and widely publicized through the website and other documents and the attainment of the same are evaluated by the institution",
        {
          "Upload Additional information": ["Upload", "additionalInfo_doc4"],
          "Provide Link for Additional information": ["Link"],
          "Upload COs for all courses (exemplars from Glossary)": [
            "Upload",
            "dummy",
          ],
        },
      ],
      "2.6.2": [
        "QnM",
        "Pass percentage of students (excluding backlog students) (Data to be provided only for the latest completed academic year)",
        {
          "Upload Additional information": ["Upload", "additionalInfo_doc5"],
          "Provide Link for Additional information": ["Link"],
        },
        [
          [
            "2.6.2.1",
            "2.6.2.1: Total number of final year students who passed the examination conducted by Institution",
            true,
            "Number of final year outgoing students year wise during last five years",
          ],
        ],
      ],
      "2.6.3": [
        "QnM",
        "Pass percentage of Students during last five years (excluding backlog students)",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "instDataTemplate_doc4",
          ],
          "Annual report of Controller of Examinations ( COE) highlighting the pass percentage of final year students":
            ["Upload", "coeReportPassPercentage_doc"],
          "Certified report from the COE indicating the pass percentage of students of the final year (final semester) eligible for the degree program-wise / year wise":
            ["Upload", "coePassPercentReport_doc"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "2.6.3.1",
            "2.6.3.1 Number of final year students who passed the university examination year wise during the last five years",
            true,
          ],
          [
            "2.6.3.2",
            "2.6.3.2 Number of final year students who appeared for the university examination year wise during the last five years",
            true,
          ],
        ],
      ],
    },
    "Student Satisfaction Survey": {
      "2.7.1": [
        "QnM",
        "Online Student Satisfaction Survey regarding the teaching-learning process.",
        {
          "Upload any additional information": ["Upload", "dummy"],
          "Upload database of all currently enrolled students (Data Template)":
            ["Data Template", "dummy"],
        },
      ],
    },
  };

  useEffect(() => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );
      const updatedRelatedInput = { ...relatedInput };
      const fieldsToUpdate = [
        ["2.1.2.1", "addmReservedSeatsYear"],
        ["2.2.1.1", "studentYear"],
        ["2.2.1.2", "acadFullTimeTeachYear"],
        ["2.4.1.2", "acadSanctionedPostsYear"],
      ];
      fieldsToUpdate.forEach(([key, prefix]) => {
        for (let i = 1; i <= 5; i++) {
          updatedRelatedInput[key][`year${i}`] = response[`${prefix}${i}`];
        }
      });
      updatedRelatedInput["2.4.1.1"] = updatedRelatedInput["2.2.1.2"];
      updatedRelatedInput["2.4.2.1"] = updatedRelatedInput["2.2.1.2"];
      setRelatedInput(updatedRelatedInput);
    })();

    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/data-c2/${collegeData.collegId}`
      );

      const updatedFormData = { ...formData };
      updatedFormData["2.1.1"]["2.1.1.1"].year1 =
        response.noSeatsFilledY1 || "";
      updatedFormData["2.1.1"]["2.1.1.1"].year2 =
        response.noSeatsFilledY2 || "";
      updatedFormData["2.1.1"]["2.1.1.1"].year3 =
        response.noSeatsFilledY3 || "";
      updatedFormData["2.1.1"]["2.1.1.1"].year4 =
        response.noSeatsFilledY4 || "";
      updatedFormData["2.1.1"]["2.1.1.1"].year5 =
        response.noSeatsFilledY5 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year1 =
        response.noSanctionedSeatsY1 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year2 =
        response.noSanctionedSeatsY2 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year3 =
        response.noSanctionedSeatsY3 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year4 =
        response.noSanctionedSeatsY4 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year5 =
        response.noSanctionedSeatsY5 || "";
      updatedFormData["2.1.1"]["2.1.1.2"].year5 =
        response.noSanctionedSeatsY5 || "";
      updatedFormData["2.1.1"].doc[0] = response.instDataTemplate_doc || "";
      updatedFormData["2.1.1"].doc[1] =
        response.intakeSanctionApproval_doc || "";
      updatedFormData["2.1.1"].doc[2] = response.finalAdmissionList_doc || "";
      updatedFormData["2.1.1"].link[0] =
        response.linksForAnyOtherRelevant || "";
      updatedFormData["2.1.2"]["2.1.2.1"].year1 =
        response.numAdmittedReservedY1 || "";
      updatedFormData["2.1.2"]["2.1.2.1"].year2 =
        response.numAdmittedReservedY2 || "";
      updatedFormData["2.1.2"]["2.1.2.1"].year3 =
        response.numAdmittedReservedY3 || "";
      updatedFormData["2.1.2"]["2.1.2.1"].year4 =
        response.numAdmittedReservedY4 || "";
      updatedFormData["2.1.2"]["2.1.2.1"].year5 =
        response.numAdmittedReservedY5 || "";
      updatedFormData["2.1.2"].doc[0] = response.instDataTemplate_doc2 || "";
      updatedFormData["2.1.2"].doc[1] = response.govtLetter_doc || "";
      updatedFormData["2.1.2"].doc[2] = response.finalAdmissionList || "";
      updatedFormData["2.1.2"].link[0] = response.linkForOtherRelivantDoc || "";
      updatedFormData["2.2.1"].doc[0] = response.additionalInfo_doc || "";
      updatedFormData["2.2.1"].link[0] = response.additionalInfoLink || "";
      updatedFormData["2.3.1"].para = response.stdCentricMethods || "";
      updatedFormData["2.3.1"].doc[0] = response.additionalInfo_doc2 || "";
      updatedFormData["2.3.1"].link[0] = response.additionalInfoLink2 || "";
      updatedFormData["2.4.1"].doc[0] = response.sanctionedPostsMap_doc || "";
      updatedFormData["2.4.1"].link[0] = response.additionalInfoLink3 || "";
      updatedFormData["2.4.2"]["2.4.2.1"].year1 =
        response.noFTTeachersWithDegreeY1 || "";
      updatedFormData["2.4.2"]["2.4.2.1"].year2 =
        response.noFTTeachersWithDegreeY2 || "";
      updatedFormData["2.4.2"]["2.4.2.1"].year3 =
        response.noFTTeachersWithDegreeY3 || "";
      updatedFormData["2.4.2"]["2.4.2.1"].year4 =
        response.noFTTeachersWithDegreeY4 || "";
      updatedFormData["2.4.2"]["2.4.2.1"].year5 =
        response.noFTTeachersWithDegreeY5 || "";
      updatedFormData["2.4.2"].doc[0] = response.instDataTemplate_doc3 || "";
      updatedFormData["2.4.2"].doc[1] = response.facultyPhDList_doc || "";
      updatedFormData["2.4.2"].doc[2] =
        response.ugcRecognizedPhdDegrees_doc || "";
      updatedFormData["2.4.2"].link[0] = response.additionalInfoLink4 || "";
      updatedFormData["2.5.1"].para = response.transAssessGrievSys || "";
      updatedFormData["2.5.1"].doc[0] = response.additionalInfo_doc3 || "";
      updatedFormData["2.5.1"].link[0] = response.additionalInfoLink5 || "";
      updatedFormData["2.6.1"].para = response.POsCOsListOutcome || "";
      updatedFormData["2.6.1"].doc[0] = response.additionalInfo_doc4 || "";
      updatedFormData["2.6.1"].link[0] = response.additionalInfoLink6 || "";
      updatedFormData["2.6.2"].para = response.evaluatedPOsCOs || "";
      updatedFormData["2.6.2"].doc[0] = response.additionalInfo_doc5 || "";
      updatedFormData["2.6.2"].link[0] = response.additionalInfoLink7 || "";
      updatedFormData["2.6.3"]["2.6.3.1"].year1 =
        response.numPassedStudentsByY1 || "";
      updatedFormData["2.6.3"]["2.6.3.1"].year2 =
        response.numPassedStudentsByY2 || "";
      updatedFormData["2.6.3"]["2.6.3.1"].year3 =
        response.numPassedStudentsByY3 || "";
      updatedFormData["2.6.3"]["2.6.3.1"].year4 =
        response.numPassedStudentsByY4 || "";
      updatedFormData["2.6.3"]["2.6.3.1"].year5 =
        response.numPassedStudentsByY5 || "";
      updatedFormData["2.6.3"]["2.6.3.2"].year1 =
        response.numFinalYearStudentsByY1 || "";
      updatedFormData["2.6.3"]["2.6.3.2"].year2 =
        response.numFinalYearStudentsByY2 || "";
      updatedFormData["2.6.3"]["2.6.3.2"].year3 =
        response.numFinalYearStudentsByY3 || "";
      updatedFormData["2.6.3"]["2.6.3.2"].year4 =
        response.numFinalYearStudentsByY4 || "";
      updatedFormData["2.6.3"]["2.6.3.2"].year5 =
        response.numFinalYearStudentsByY5 || "";
      updatedFormData["2.6.3"].doc[0] = response.instDataTemplate_doc4 || "";
      updatedFormData["2.6.3"].doc[1] =
        response.coeReportPassPercentage_doc || "";
      updatedFormData["2.6.3"].doc[2] = response.coePassPercentReport_doc || "";
      updatedFormData["2.6.3"].link[0] = response.additionalInfoLink8 || "";
      updatedFormData.qifId = response.qifId || "";
      updatedFormData.criteriaII_Id = response.criteriaII_Id || "";
      setFormData(updatedFormData);
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
      if (key === "qifId" || key === "criteriaII_Id") {
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
    setAnsQs({ ...ansQs, 2: totalFilledElements });
  }, [formData]);

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const criteria2Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append("noSeatsFilledY1", formData["2.1.1"]["2.1.1.1"].year1);
    formsData.append("noSeatsFilledY2", formData["2.1.1"]["2.1.1.1"].year2);
    formsData.append("noSeatsFilledY3", formData["2.1.1"]["2.1.1.1"].year3);
    formsData.append("noSeatsFilledY4", formData["2.1.1"]["2.1.1.1"].year4);
    formsData.append("noSeatsFilledY5", formData["2.1.1"]["2.1.1.1"].year5);
    formsData.append("noSanctionedSeatsY1", formData["2.1.1"]["2.1.1.2"].year1);
    formsData.append("noSanctionedSeatsY2", formData["2.1.1"]["2.1.1.2"].year2);
    formsData.append("noSanctionedSeatsY3", formData["2.1.1"]["2.1.1.2"].year3);
    formsData.append("noSanctionedSeatsY4", formData["2.1.1"]["2.1.1.2"].year4);
    formsData.append("noSanctionedSeatsY5", formData["2.1.1"]["2.1.1.2"].year5);
    formsData.append("linksForAnyOtherRelevant", formData["2.1.1"].link[0]);
    formsData.append(
      "numAdmittedReservedY1",
      formData["2.1.2"]["2.1.2.1"].year1
    );
    formsData.append(
      "numAdmittedReservedY2",
      formData["2.1.2"]["2.1.2.1"].year2
    );
    formsData.append(
      "numAdmittedReservedY3",
      formData["2.1.2"]["2.1.2.1"].year3
    );
    formsData.append(
      "numAdmittedReservedY4",
      formData["2.1.2"]["2.1.2.1"].year4
    );
    formsData.append(
      "numAdmittedReservedY5",
      formData["2.1.2"]["2.1.2.1"].year5
    );
    formsData.append("linkForOtherRelivantDoc", formData["2.1.2"].link[0]);
    formsData.append("additionalInfoLink", formData["2.2.1"].link[0]);
    formsData.append("additionalInfoLink2", formData["2.3.1"].link[0]);
    formsData.append("additionalInfoLink3", formData["2.4.1"].link[0]);
    formsData.append(
      "noFTTeachersWithDegreeY1",
      formData["2.4.2"]["2.4.2.1"].year1
    );
    formsData.append(
      "noFTTeachersWithDegreeY2",
      formData["2.4.2"]["2.4.2.1"].year2
    );
    formsData.append(
      "noFTTeachersWithDegreeY3",
      formData["2.4.2"]["2.4.2.1"].year3
    );
    formsData.append(
      "noFTTeachersWithDegreeY4",
      formData["2.4.2"]["2.4.2.1"].year4
    );
    formsData.append(
      "noFTTeachersWithDegreeY5",
      formData["2.4.2"]["2.4.2.1"].year5
    );
    formsData.append("additionalInfoLink4", formData["2.4.2"].link[0]);
    formsData.append("additionalInfoLink5", formData["2.5.1"].link[0]);
    formsData.append("additionalInfoLink6", formData["2.6.1"].link[0]);
    formsData.append("additionalInfoLink7", formData["2.6.2"].link[0]);
    formsData.append(
      "numPassedStudentsByY1",
      formData["2.6.3"]["2.6.3.1"].year1
    );
    formsData.append(
      "numPassedStudentsByY2",
      formData["2.6.3"]["2.6.3.1"].year2
    );
    formsData.append(
      "numPassedStudentsByY3",
      formData["2.6.3"]["2.6.3.1"].year3
    );
    formsData.append(
      "numPassedStudentsByY4",
      formData["2.6.3"]["2.6.3.1"].year4
    );
    formsData.append(
      "numPassedStudentsByY5",
      formData["2.6.3"]["2.6.3.1"].year5
    );
    formsData.append(
      "numFinalYearStudentsByY1",
      formData["2.6.3"]["2.6.3.2"].year1
    );
    formsData.append(
      "numFinalYearStudentsByY2",
      formData["2.6.3"]["2.6.3.2"].year2
    );
    formsData.append(
      "numFinalYearStudentsByY3",
      formData["2.6.3"]["2.6.3.2"].year3
    );
    formsData.append(
      "numFinalYearStudentsByY4",
      formData["2.6.3"]["2.6.3.2"].year4
    );
    formsData.append(
      "numFinalYearStudentsByY5",
      formData["2.6.3"]["2.6.3.2"].year5
    );
    formsData.append("criteriaII_Id", formData.criteriaII_Id);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c2/${collegeData.collegId}`,
      formsData
    );
  };

  useImperativeHandle(ref, () => ({
    criteria2Save,
  }));

  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            2.{i + 1}. {ele}
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

export default forwardRef(Criteria2);

const DocumentUpload = ({ tableData, e, formData, setFormData }) => {
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
          `crite-2/${formData.criteriaII_Id}/doc`,
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
        `qif/doc-c2/${formData.criteriaII_Id}`,
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
                <tr key={i}>
                  <td className="w-1/5 border border-black">{ele}</td>
                  <td className="w-1/5 border border-black pl-1">
                    {tableData[ele][0] === "Data Template" &&
                      "Document Template"}
                  </td>
                  <td className="w-1/5 border border-black p-1">
                    {Array.isArray(tableData[ele]) &&
                      (tableData[ele][0] === "Data Template" ||
                        tableData[ele][0] === "Upload") && (
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
                      )}
                    {tableData[ele][0] === "Link" && (
                      <input
                        className="w-full border border-black"
                        type="text"
                        value={formData[e].link[0]}
                        onChange={(event) => {
                          setFormData((prevData) => {
                            const updatedFormData = { ...prevData };
                            updatedFormData[e].link[0] = event.target.value;
                            return updatedFormData;
                          });
                        }}
                      />
                    )}
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
                  [name]: numericValue,
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
