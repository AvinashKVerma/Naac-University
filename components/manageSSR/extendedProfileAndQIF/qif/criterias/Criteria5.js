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

const Criteria5 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "5.1.1": {
      doc: [""],
      "5.1.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "5.1.2": {
      para: "",
      doc: [""],
      link: [""],
    },
    "5.1.3": {
      doc: [""],
      link: [""],
      select: "",
    },
    "5.1.4": {
      select: "",
      doc: [""],
      link: [""],
    },
    "5.2.1": {
      doc: [""],
      "5.2.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "5.2.2": {
      doc: [""],
      link: [""],
      "5.2.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.2.3": {
      doc: [""],
      link: [""],
      "5.2.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.3.1": {
      doc: [""],
      "5.3.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "5.3.2": {
      doc: [""],
      para: "",
      link: [""],
    },
    "5.3.3": {
      doc: [""],
      select: "",
      link: [""],
    },
    "5.4.1": {
      doc: ["", ""],
      link: [""],
      "5.3.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.4.2": {
      doc: [""],
      para: "",
      link: [""],
    },
  });

  const [relatedInput, setRelatedInput] = useState({
    "5.1.1.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
    "5.2.1.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
    "5.2.2.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
    "5.2.3.1": {
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      year5: 0,
    },
  });

  const keyIndicators = {
    "Student Support": {
      "5.1.1": [
        "QnM",
        "Percentage of students benefited by scholarships and freeships provided by the institution, Government and non-government , industries, individuals, philanthropists during the last five years.",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "5.1.1.1",
            "5.1.1.1: Number of students benefited by scholarships and freeships provided by the institution, Government and non-government bodies, industries, individuals, philanthropists year-wise during the last five years",
            true,
            "Number of students year-wise during the last five years",
          ],
        ],
      ],
      "5.1.2": [
        "QIM",
        "Efforts taken by the institution to provide career counseling including e-counseling and guidance for competitive examinations during the last five years",
        {
          "Provide the link for additional information": ["Upload", "dummy"],
          "Upload any additional information": ["Link"],
        },
      ],
      "5.1.3": [
        "QnM",
        "Following capacity development and skills enhancement activities are are organised for improving students' capability",
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
              "Soft skills",
              "Language and communication skills",
              "Life skills (Yoga, physical fitness, health and hygiene, selfemployment and entrepreneurial skills)",
              "Awareness of trends in technology",
            ],
          ],
        ],
      ],
      "5.1.4": [
        "QnM",
        "The Institution adopts the following for redressal of student grievances including sexual harassment and ragging cases",
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
              "Implementation of guidelines of statutory/regulatory bodies",
              "Organisation wide awareness and undertakings on policies with zero tolerance",
              "Mechanisms for submission of offline/online students' grievances",
              "Timely redressal of the grievances through appropriate committees",
            ],
          ],
        ],
      ],
    },
    StudentProgression: {
      "5.2.1": [
        "QnM",
        "Percentage of placement of outgoing students during the last five years",
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
            "5.2.1.1",
            "5.2.1.1: Number of outgoing students placed year wise during the last five years",
            true,
            "Number of final year outgoing students year wise during last five years",
          ],
        ],
      ],
      "5.2.2": [
        "QnM",
        "Percentage of graduated students who have progressed to higher education year-wise during last five years",
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
            "5.2.2.1",
            "5.2.2.1: Number of outgoing students progressing to higher education",
            true,
            "Number of final year outgoing students year wise during last five years",
          ],
        ],
      ],
      "5.2.3": [
        "QnM",
        "Percentage of students qualifying in state/ national/ international level examinations out of the graduated students during the last five years",
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
            "5.2.3.1",
            "5.2.3.1: Number of students qualifying in state/National/International level Examination during last five years (eg. SLET, NET, UPSC etc)",
            true,
            "Number of final year outgoing students year wise during last five years",
          ],
        ],
      ],
    },
    "Student Participation and Activities": {
      "5.3.1": [
        "QnM",
        "Number of awards/medals won by students for outstanding performance in sports/cultural activities at inter-university/state/national/international events (award for a team event should be counted as one) during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc6",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "5.3.1.1",
            "5.3.1.1 Number of awards/medals for outstanding performance in sports/cultural activities at University/state/national/international level year wise during the last five years",
            true,
          ],
        ],
      ],
      "5.3.2": [
        "QIM",
        "Presence of an active Student Council & representation of students on academic & administrative bodies/committees of the institution",
        {
          "Provide the link for additional information": ["Link"],
          "Upload any additional information": ["Upload", "suporting_doc"],
        },
      ],
      "5.3.3": [
        "QnM",
        "The institution conducts /organizes following activities",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc6",
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
              "Sports competitions/events",
              "Cultural competitions/events",
              "Technical fest/academic fests",
              "Any other events through active clubs and forums",
            ],
          ],
        ],
      ],
    },
    "Alumni Engagement": {
      "5.4.1": [
        "QnM",
        "Alumni contribution during the last five years to the University through registered Alumni Association.",
        {
          "Annual audited statement of accounts of the HEI highlighting the Alumni contribution duly certified by the Chartered Accountant/ Finance Officer":
            ["Upload", "addInfo_doc"],
          "List of alumunus/ alumni with the amount contributed year wise": [
            "Upload",
            "addInfo_doc",
          ],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "5.4.1.1",
            "5.4.1.1. Total Amount of alumni contribution during the last five years (INR in lakhs) to the institution through registered Alumni association",
            "true",
          ],
        ],
      ],
      "5.4.2": [
        "QIM",
        "Alumni contributes and engages significantly to the development of University through academic and other support system",
        {
          "Provide the link for additional information": ["Link"],
          "Upload any additional information": ["Upload", "dummy"],
        },
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
    // (async () => {
    //   const response = await config.ssrAPIRequest(
    //     "GET",
    //     `extended-ssr/${collegeData.collegId}`
    //   );
    //   if (response) {
    //     const updatedRelatedInput = { ...relatedInput };
    //     updatedRelatedInput["5.2.1.1"].year1 = response.stuOutgoingYear1;
    //     updatedRelatedInput["5.2.1.1"].year2 = response.stuOutgoingYear2;
    //     updatedRelatedInput["5.2.1.1"].year3 = response.stuOutgoingYear3;
    //     updatedRelatedInput["5.2.1.1"].year4 = response.stuOutgoingYear4;
    //     updatedRelatedInput["5.2.1.1"].year5 = response.stuOutgoingYear5;
    //     updatedRelatedInput["5.1.1.1"].year1 = response.studentYear1;
    //     updatedRelatedInput["5.1.1.1"].year2 = response.studentYear2;
    //     updatedRelatedInput["5.1.1.1"].year3 = response.studentYear3;
    //     updatedRelatedInput["5.1.1.1"].year4 = response.studentYear4;
    //     updatedRelatedInput["5.1.1.1"].year4 = response.studentYear5;
    //     setRelatedInput(updatedRelatedInput);
    //   }
    // })();
    // (async () => {
    //   const response = await config.ssrAPIRequest(
    //     "GET",
    //     `qif/data-c5/${collegeData.collegId}`
    //   );
    //   const updatedFormData = { ...formData };
    //   updatedFormData.qifId = response.qifId;
    //   updatedFormData.criteriaV_Id = response.criteriaV_Id;
    //   updatedFormData["5.1.1"]["5.1.1.1"].year1 =
    //     response.numBenefiScholarLastY1 || "";
    //   updatedFormData["5.1.1"]["5.1.1.1"].year2 =
    //     response.numBenefiScholarLastY2 || "";
    //   updatedFormData["5.1.1"]["5.1.1.1"].year3 =
    //     response.numBenefiScholarLastY3 || "";
    //   updatedFormData["5.1.1"]["5.1.1.1"].year4 =
    //     response.numBenefiScholarLastY4 || "";
    //   updatedFormData["5.1.1"]["5.1.1.1"].year5 =
    //     response.numBenefiScholarLastY5 || "";
    //   updatedFormData["5.1.1"].doc[0] = response.institutionalDataTemplate_doc;
    //   updatedFormData["5.1.1"].doc[1] = response.sanctionLetter_doc;
    //   updatedFormData["5.1.1"].doc[2] = response.heiScholarshipPolicy_doc;
    //   updatedFormData["5.1.1"].doc[3] = response.beneficiaryListsByYear_doc;
    //   updatedFormData["5.1.1"].link[0] = response.addInfoLink;
    //   updatedFormData["5.1.2"].select = response.skillType1;
    //   updatedFormData["5.1.2"].doc[0] = response.institutionalDataTemplate_doc2;
    //   updatedFormData["5.1.2"].doc[1] =
    //     response.ReportEnhanceSkillsAndActivities_doc;
    //   updatedFormData["5.1.2"].doc[2] = response.TechAwarenessProgramReport_doc;
    //   updatedFormData["5.1.2"].link[0] = response.relivantDocSuportLink || "";
    //   updatedFormData["5.1.3"]["5.1.3.1"].year1 =
    //     response.stuBenefitByGuidanceY1 || "";
    //   updatedFormData["5.1.3"]["5.1.3.1"].year2 =
    //     response.stuBenefitByGuidanceY2 || "";
    //   updatedFormData["5.1.3"]["5.1.3.1"].year3 =
    //     response.stuBenefitByGuidanceY3 || "";
    //   updatedFormData["5.1.3"]["5.1.3.1"].year4 =
    //     response.stuBenefitByGuidanceY4 || "";
    //   updatedFormData["5.1.3"]["5.1.3.1"].year5 =
    //     response.stuBenefitByGuidanceY5 || "";
    //   updatedFormData["5.1.3"].doc[0] = response.institutionalDataTemplate_doc3;
    //   updatedFormData["5.1.3"].doc[1] = response.relivantDocSuportdoc;
    //   updatedFormData["5.1.4"].select = response.grievanceResolutionTyp1;
    //   updatedFormData["5.1.4"].doc[0] = response.statRegCommittees_doc;
    //   updatedFormData["5.1.4"].doc[1] = response.GuidelineComplianceProof_doc;
    //   updatedFormData["5.1.4"].doc[2] = response.orgAwarenessPolicyZeroTol_doc;
    //   updatedFormData["5.1.4"].doc[3] = response.grievanceSubmitMech_doc;
    //   updatedFormData["5.1.4"].doc[4] = response.cmagnogReport_doc;
    //   updatedFormData["5.1.4"].link[0] = response.relivantDocSuportLink3 || "";
    //   updatedFormData["5.2.1"]["5.2.1.1"].year1 =
    //     response.outgoingPlacementProgY1 || "";
    //   updatedFormData["5.2.1"]["5.2.1.1"].year2 =
    //     response.outgoingPlacementProgY2 || "";
    //   updatedFormData["5.2.1"]["5.2.1.1"].year3 =
    //     response.outgoingPlacementProgY3 || "";
    //   updatedFormData["5.2.1"]["5.2.1.1"].year4 =
    //     response.outgoingPlacementProgY4 || "";
    //   updatedFormData["5.2.1"]["5.2.1.1"].year5 =
    //     response.outgoingPlacementProgY5 || "";
    //   updatedFormData["5.2.1"].doc[0] = response.institutionalDataTemplate_doc4;
    //   updatedFormData["5.2.1"].doc[1] = response.placementInfoList_doc;
    //   updatedFormData["5.2.1"].doc[2] = response.stdProgHighEdDetWithProofLinks;
    //   updatedFormData["5.2.1"].link[0] = response.relivantDocSuportLink4 | "";
    //   updatedFormData["5.2.2"]["5.2.2.1"].year1 =
    //     response.qualStudentsCountByY1 || "";
    //   updatedFormData["5.2.2"]["5.2.2.1"].year2 =
    //     response.qualStudentsCountByY2 || "";
    //   updatedFormData["5.2.2"]["5.2.2.1"].year3 =
    //     response.qualStudentsCountByY3 || "";
    //   updatedFormData["5.2.2"]["5.2.2.1"].year4 =
    //     response.qualStudentsCountByY4 || "";
    //   updatedFormData["5.2.2"]["5.2.2.1"].year5 =
    //     response.qualStudentsCountByY5 || "";
    //   updatedFormData["5.2.2"].doc[0] = response.institutionalDataTemplate_doc5;
    //   updatedFormData["5.2.2"].doc[1] = response.qualifiedStudentsByYear_link;
    //   updatedFormData["5.2.2"].link[0] = response.relivantDocSuportLink5 || "";
    //   updatedFormData["5.3.1"]["5.3.1.1"].year1 = response.awardsCountY1 || "";
    //   updatedFormData["5.3.1"]["5.3.1.1"].year2 = response.awardsCountY2 || "";
    //   updatedFormData["5.3.1"]["5.3.1.1"].year3 = response.awardsCountY3 || "";
    //   updatedFormData["5.3.1"]["5.3.1.1"].year4 = response.awardsCountY4 || "";
    //   updatedFormData["5.3.1"]["5.3.1.1"].year5 = response.awardsCountY5 || "";
    //   updatedFormData["5.3.1"].doc[0] = response.institutionalDataTemplate_doc6;
    //   updatedFormData["5.3.1"].doc[1] = response.awardDocsLinks;
    //   updatedFormData["5.3.1"].link[0] = response.relivantDocSuportLink6 || "";
    //   updatedFormData["5.3.2"]["5.3.2.1"].year1 =
    //     response.numParticipationsByY1 || "";
    //   updatedFormData["5.3.2"]["5.3.2.1"].year2 =
    //     response.numParticipationsByY2 || "";
    //   updatedFormData["5.3.2"]["5.3.2.1"].year3 =
    //     response.numParticipationsByY3 || "";
    //   updatedFormData["5.3.2"]["5.3.2.1"].year4 =
    //     response.numParticipationsByY4 || "";
    //   updatedFormData["5.3.2"]["5.3.2.1"].year5 =
    //     response.numParticipationsByY5 || "";
    //   updatedFormData["5.3.2"].doc[0] = response.institutionalDataTemplate_doc7;
    //   updatedFormData["5.3.2"].doc[1] = response.suporting_doc;
    //   updatedFormData["5.4.1"].para = response.alumniAssocContribution || "";
    //   updatedFormData["5.4.1"].doc[0] = response.addInfo_doc;
    //   updatedFormData["5.4.1"].doc[1] = response.addInfoLink2;
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

  const criteria5Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append(
      "numBenefiScholarLastY1",
      formData["5.1.1"]["5.1.1.1"].year1
    );
    formsData.append(
      "numBenefiScholarLastY2",
      formData["5.1.1"]["5.1.1.1"].year2
    );
    formsData.append(
      "numBenefiScholarLastY3",
      formData["5.1.1"]["5.1.1.1"].year3
    );
    formsData.append(
      "numBenefiScholarLastY4",
      formData["5.1.1"]["5.1.1.1"].year4
    );
    formsData.append(
      "numBenefiScholarLastY5",
      formData["5.1.1"]["5.1.1.1"].year5
    );
    formsData.append("addInfoLink", formData["5.1.1"].link[0]);
    formsData.append("skillType1", formData["5.1.2"].select);
    formsData.append("relivantDocSuportLink", formData["5.1.2"].link[0]);
    formsData.append(
      "stuBenefitByGuidanceY1",
      formData["5.1.3"]["5.1.3.1"].year1
    );
    formsData.append(
      "stuBenefitByGuidanceY2",
      formData["5.1.3"]["5.1.3.1"].year2
    );
    formsData.append(
      "stuBenefitByGuidanceY3",
      formData["5.1.3"]["5.1.3.1"].year3
    );
    formsData.append(
      "stuBenefitByGuidanceY4",
      formData["5.1.3"]["5.1.3.1"].year4
    );
    formsData.append(
      "stuBenefitByGuidance5",
      formData["5.1.3"]["5.1.3.1"].year5
    );
    formsData.append("grievanceResolutionTyp1", formData["5.1.4"].select);
    formsData.append("relivantDocSuportLink3", formData["5.1.4"].link[0]);
    formsData.append(
      "outgoingPlacementProgY1",
      formData["5.2.1"]["5.2.1.1"].year1
    );
    formsData.append(
      "outgoingPlacementProgY2",
      formData["5.2.1"]["5.2.1.1"].year2
    );
    formsData.append(
      "outgoingPlacementProgY3",
      formData["5.2.1"]["5.2.1.1"].year3
    );
    formsData.append(
      "outgoingPlacementProgY4",
      formData["5.2.1"]["5.2.1.1"].year4
    );
    formsData.append(
      "outgoingPlacementProgY5",
      formData["5.2.1"]["5.2.1.1"].year5
    );
    formsData.append("relivantDocSuportLink4", formData["5.2.1"].link[0]);
    formsData.append(
      "qualStudentsCountByY1",
      formData["5.2.2"]["5.2.2.1"].year1
    );
    formsData.append(
      "qualStudentsCountByY2",
      formData["5.2.2"]["5.2.2.1"].year2
    );
    formsData.append(
      "qualStudentsCountByY3",
      formData["5.2.2"]["5.2.2.1"].year3
    );
    formsData.append(
      "qualStudentsCountByY4",
      formData["5.2.2"]["5.2.2.1"].year4
    );
    formsData.append(
      "qualStudentsCountByY5",
      formData["5.2.2"]["5.2.2.1"].year5
    );
    formsData.append("relivantDocSuportLink5", formData["5.2.2"].link[0]);
    formsData.append("awardsCountY1", formData["5.3.1"]["5.3.1.1"].year1);
    formsData.append("awardsCountY2", formData["5.3.1"]["5.3.1.1"].year2);
    formsData.append("awardsCountY3", formData["5.3.1"]["5.3.1.1"].year3);
    formsData.append("awardsCountY4", formData["5.3.1"]["5.3.1.1"].year4);
    formsData.append("awardsCountY5", formData["5.3.1"]["5.3.1.1"].year5);
    formsData.append("relivantDocSuportLink6", formData["5.3.1"].link[0]);
    formsData.append(
      "numParticipationsByY1",
      formData["5.3.2"]["5.3.2.1"].year1
    );
    formsData.append(
      "numParticipationsByY2",
      formData["5.3.2"]["5.3.2.1"].year2
    );
    formsData.append(
      "numParticipationsByY3",
      formData["5.3.2"]["5.3.2.1"].year3
    );
    formsData.append(
      "numParticipationsByY4",
      formData["5.3.2"]["5.3.2.1"].year4
    );
    formsData.append(
      "numParticipationsByY5",
      formData["5.3.2"]["5.3.2.1"].year5
    );
    formsData.append("alumniAssocContribution", formData["5.4.1"].para);
    formsData.append("CriteriaV_Id", formData.criteriaV_Id);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c5/${collegeData.collegId}`,
      formsData
    );
  };
  useImperativeHandle(ref, () => ({
    criteria5Save,
  }));
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            5.{i + 1}. {ele}
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
                          <ul className="py-2 my-2 w-1/4">
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

export default forwardRef(Criteria5);

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
          `crite-5/${formData.criteriaV_Id}/doc`,
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
        `qif/doc-c5/${formData.criteriaV_Id}`,
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
            value={
              !formData[e][question][`year${index + 1}`] ||
              formData[e][question][`year${index + 1}`] === null
                ? ""
                : formData[e][question][`year${index + 1}`]
            }
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
