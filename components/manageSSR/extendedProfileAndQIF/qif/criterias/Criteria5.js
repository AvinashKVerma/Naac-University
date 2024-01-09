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
      doc: ["", "", "", ""],
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
      select: "",
      doc: ["", "", "", ""],
      link: [""],
    },
    "5.1.3": {
      doc: ["", ""],
      "5.1.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.1.4": {
      select: "",
      doc: ["", "", "", "", ""],
      link: [""],
    },
    "5.2.1": {
      doc: ["", "", ""],
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
      doc: ["", "", ""],
      link: [""],
      "5.2.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.3.1": {
      doc: ["", ""],
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
      doc: ["", ""],
      "5.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "5.4.1": {
      para: "",
      doc: [""],
      link: [""],
    },
  });
  const keyIndicators = {
    "Student Support": {
      "5.1.1": [
        "QnM",
        "Percentage of students benefited by scholarships and freeships provided by the institution, government and non-government bodies, industries, individuals, philanthropists during the last five years.",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc",
          ],
          "Upload Sanction letter of scholarship and free ships (along with English translated version if it is in regional language).":
            ["Upload", "sanctionLetter_doc"],
          "Upload policy document of the HEI for award of scholarship and freeships.":
            ["Upload", "heiScholarshipPolicy_doc"],
          "Year-wise list of beneficiary students in each scheme duly signed by the competent authority.":
            ["Upload", "beneficiaryListsByYear_doc"],
          "Provide Link for Additional information": ["Link"],
        },
        [
          [
            "5.1.1.1",
            "5.1.1.1 Number of students benefited by scholarships and freeships provided by the institution, Government and non-government bodies, industries, individuals, philanthropists during the last five years",
            true,
            "Number of students year-wise during the last five years",
          ],
        ],
      ],
      "5.1.2": [
        "QnM",
        "Following capacity development and skills enhancement activities are are organised for improving students' capability",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc2",
          ],
          "Report with photographs on programmes/activities conducted to enhance soft skills, Language & communication skills, and Life skills (Yoga, physical fitness, health and hygiene, self-employment a entrepreneurial skills)":
            ["Upload", "ReportEnhanceSkillsAndActivities_doc"],
          "Report with photographs on programmes conducted for awareness of trends in technology":
            ["Upload", "TechAwarenessProgramReport_doc"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "4.1.2.1",
            "4.1.2.1: Expenditure for infrastructure development and augmentation, excluding salary year wise during last five years (INR in lakhs)",
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

      //
      "5.1.3": [
        "QnM",
        "Percentage of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the last five years",
        {
          "Institutional data in the prescribed format": ["Upload"],
          "Upload supporting document": ["Upload"],
        },
        [
          [
            "5.1.3.1",
            "5.1.3.1 Number of students benefitted by guidance for competitive examinations and career counseling offered by the institution year wise during last five years",
            true,
          ],
        ],
      ],
      "5.1.4": [
        "QnM",
        "The institution adopts the following for redressal of student grievances including sexual harassment and ragging cases",
        {
          "Details of statutory/regulatory Committees (to be notified in institutional website also)":
            ["Upload", "institutionalDataTemplate_doc3"],
          "Proof for Implementation of guidelines of statutory/regulatory bodies":
            ["Upload", "GuidelineComplianceProof_doc"],
          "Proof w.r.t Organisation wide awareness and undertakings on policies with zero tolerance":
            ["Upload", "orgAwarenessPolicyZeroTol_doc"],
          "Prof related to Mechanisms for submission if online/offline students' grievances":
            ["Upload", "grievanceSubmitMech_doc"],
          "Annual report of the committee monitoring the activities and number of grievances":
            ["Upload", "cmagnogReport_doc"],
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
              "Timely redressal of the grievances through appropriate committees",
            ],
          ],
        ],
      ],
    },
    StudentProgression: {
      "5.2.1": [
        "QnM",
        "Percentage of placement of outgoing students and students progressing to higher education during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc4",
          ],
          "Number and List of students placed along with placement details such as  of the company, compensation, etc and links to Placement order (the above list should be available on institutional website)":
            ["Upload", "placementInfoList_doc"],
          "List of students progressing for Higher Education, with details of program and institution that they are/have enrolled along with links to proof of continuation in higher education.(the above list should be available on institutional website)":
            ["Upload", "stdProgHighEdDetWithProofLinks"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "5.2.1.1",
            "5.2.1.1 Number of outgoing students placed and progressed to higher education during the last five years",
            true,
            "Number of outgoing students year wise during the last five years",
          ],
        ],
      ],
      "5.2.2": [
        "QnM",
        "Percentage of students qualifying in state/national/ international level examinations during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc5",
          ],
          "List of students qualified year wise with details of examination and links to  Certificates of the students taking the examination":
            ["Upload", "qualifiedStudentsByYear_link"],
          "Provide Links for any other relevant document to support the claim (if any)":
            ["Link"],
        },
        [
          [
            "5.2.2.1",
            "5.2.2.1 Number of students qualifying in state/ national/ international level examinations year wise during last five years (eg: IIT/JAM/NET/SLET/GATE/GMAT/GPAT/CLAT/CAT/ GRE/TOEFL/ IELTS/Civil Services/State government examinations etc.)",
            true,
          ],
        ],
      ],
    },
    "Student Participation and Activities": {
      "5.3.1": [
        "QnM",
        "Number of awards/medals for outstanding performance in sports/ cultural activities at University / state/ national / international level during the last five years",
        {
          "Institutional data in the prescribed format (data template)": [
            "Data Template",
            "institutionalDataTemplate_doc6",
          ],
          "List and links to e-copies of award letters and certificates": [
            "Upload",
            "awardDocsLinks",
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
        "QnM",
        "Average number of sports and cultural programs in which students of the Institution participated during last five years",
        {
          "Institutional data in the prescribed format": [
            "Upload",
            "institutionalDataTemplate_doc7",
          ],
          "Upload supporting document": ["Upload", "suporting_doc"],
        },
        [
          [
            "5.3.2.1",
            "5.3.2.1 Number of sports and cultural programs in which students of the Institution participated year wise during last five years (organised by the institution/other institutions)",
            true,
          ],
        ],
      ],
    },
    "Alumni Engagement": {
      "5.4.1": [
        "QIM",
        "There is a registered Alumni Association that contributes significantly to the development of the institution through financial and/or other support services.",
        {
          "Upload Additional information": ["Upload", "addInfo_doc"],
          "Provide Link for Additional information": ["Link"],
        },
      ],
    },
  };
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
  });
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
        `extended-ssr/${collegeData.collegId}`
      );
      if (response) {
        const updatedRelatedInput = { ...relatedInput };
        updatedRelatedInput["5.2.1.1"].year1 = response.stuOutgoingYear1;
        updatedRelatedInput["5.2.1.1"].year2 = response.stuOutgoingYear2;
        updatedRelatedInput["5.2.1.1"].year3 = response.stuOutgoingYear3;
        updatedRelatedInput["5.2.1.1"].year4 = response.stuOutgoingYear4;
        updatedRelatedInput["5.2.1.1"].year5 = response.stuOutgoingYear5;
        updatedRelatedInput["5.1.1.1"].year1 = response.studentYear1;
        updatedRelatedInput["5.1.1.1"].year2 = response.studentYear2;
        updatedRelatedInput["5.1.1.1"].year3 = response.studentYear3;
        updatedRelatedInput["5.1.1.1"].year4 = response.studentYear4;
        updatedRelatedInput["5.1.1.1"].year4 = response.studentYear5;
        setRelatedInput(updatedRelatedInput);
      }
    })();

    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/data-c5/${collegeData.collegId}`
      );

      const updatedFormData = { ...formData };
      updatedFormData.qifId = response.qifId;
      updatedFormData.criteriaV_Id = response.criteriaV_Id;
      updatedFormData["5.1.1"]["5.1.1.1"].year1 =
        response.numBenefiScholarLastY1 || "";
      updatedFormData["5.1.1"]["5.1.1.1"].year2 =
        response.numBenefiScholarLastY2 || "";
      updatedFormData["5.1.1"]["5.1.1.1"].year3 =
        response.numBenefiScholarLastY3 || "";
      updatedFormData["5.1.1"]["5.1.1.1"].year4 =
        response.numBenefiScholarLastY4 || "";
      updatedFormData["5.1.1"]["5.1.1.1"].year5 =
        response.numBenefiScholarLastY5 || "";
      updatedFormData["5.1.1"].doc[0] = response.institutionalDataTemplate_doc;
      updatedFormData["5.1.1"].doc[1] = response.sanctionLetter_doc;
      updatedFormData["5.1.1"].doc[2] = response.heiScholarshipPolicy_doc;
      updatedFormData["5.1.1"].doc[3] = response.beneficiaryListsByYear_doc;
      updatedFormData["5.1.1"].link[0] = response.addInfoLink;
      updatedFormData["5.1.2"].select = response.skillType1;
      updatedFormData["5.1.2"].doc[0] = response.institutionalDataTemplate_doc2;
      updatedFormData["5.1.2"].doc[1] =
        response.ReportEnhanceSkillsAndActivities_doc;
      updatedFormData["5.1.2"].doc[2] = response.TechAwarenessProgramReport_doc;
      updatedFormData["5.1.2"].link[0] = response.relivantDocSuportLink || "";
      updatedFormData["5.1.3"]["5.1.3.1"].year1 =
        response.stuBenefitByGuidanceY1 || "";
      updatedFormData["5.1.3"]["5.1.3.1"].year2 =
        response.stuBenefitByGuidanceY2 || "";
      updatedFormData["5.1.3"]["5.1.3.1"].year3 =
        response.stuBenefitByGuidanceY3 || "";
      updatedFormData["5.1.3"]["5.1.3.1"].year4 =
        response.stuBenefitByGuidanceY4 || "";
      updatedFormData["5.1.3"]["5.1.3.1"].year5 =
        response.stuBenefitByGuidanceY5 || "";
      updatedFormData["5.1.3"].doc[0] = response.institutionalDataTemplate_doc3;
      updatedFormData["5.1.3"].doc[1] = response.relivantDocSuportdoc;
      updatedFormData["5.1.4"].select = response.grievanceResolutionTyp1;
      updatedFormData["5.1.4"].doc[0] = response.statRegCommittees_doc;
      updatedFormData["5.1.4"].doc[1] = response.GuidelineComplianceProof_doc;
      updatedFormData["5.1.4"].doc[2] = response.orgAwarenessPolicyZeroTol_doc;
      updatedFormData["5.1.4"].doc[3] = response.grievanceSubmitMech_doc;
      updatedFormData["5.1.4"].doc[4] = response.cmagnogReport_doc;
      updatedFormData["5.1.4"].link[0] = response.relivantDocSuportLink3 || "";
      updatedFormData["5.2.1"]["5.2.1.1"].year1 =
        response.outgoingPlacementProgY1 || "";
      updatedFormData["5.2.1"]["5.2.1.1"].year2 =
        response.outgoingPlacementProgY2 || "";
      updatedFormData["5.2.1"]["5.2.1.1"].year3 =
        response.outgoingPlacementProgY3 || "";
      updatedFormData["5.2.1"]["5.2.1.1"].year4 =
        response.outgoingPlacementProgY4 || "";
      updatedFormData["5.2.1"]["5.2.1.1"].year5 =
        response.outgoingPlacementProgY5 || "";
      updatedFormData["5.2.1"].doc[0] = response.institutionalDataTemplate_doc4;
      updatedFormData["5.2.1"].doc[1] = response.placementInfoList_doc;
      updatedFormData["5.2.1"].doc[2] = response.stdProgHighEdDetWithProofLinks;
      updatedFormData["5.2.1"].link[0] = response.relivantDocSuportLink4 | "";
      updatedFormData["5.2.2"]["5.2.2.1"].year1 =
        response.qualStudentsCountByY1 || "";
      updatedFormData["5.2.2"]["5.2.2.1"].year2 =
        response.qualStudentsCountByY2 || "";
      updatedFormData["5.2.2"]["5.2.2.1"].year3 =
        response.qualStudentsCountByY3 || "";
      updatedFormData["5.2.2"]["5.2.2.1"].year4 =
        response.qualStudentsCountByY4 || "";
      updatedFormData["5.2.2"]["5.2.2.1"].year5 =
        response.qualStudentsCountByY5 || "";
      updatedFormData["5.2.2"].doc[0] = response.institutionalDataTemplate_doc5;
      updatedFormData["5.2.2"].doc[1] = response.qualifiedStudentsByYear_link;
      updatedFormData["5.2.2"].link[0] = response.relivantDocSuportLink5 || "";
      updatedFormData["5.3.1"]["5.3.1.1"].year1 = response.awardsCountY1 || "";
      updatedFormData["5.3.1"]["5.3.1.1"].year2 = response.awardsCountY2 || "";
      updatedFormData["5.3.1"]["5.3.1.1"].year3 = response.awardsCountY3 || "";
      updatedFormData["5.3.1"]["5.3.1.1"].year4 = response.awardsCountY4 || "";
      updatedFormData["5.3.1"]["5.3.1.1"].year5 = response.awardsCountY5 || "";
      updatedFormData["5.3.1"].doc[0] = response.institutionalDataTemplate_doc6;
      updatedFormData["5.3.1"].doc[1] = response.awardDocsLinks;
      updatedFormData["5.3.1"].link[0] = response.relivantDocSuportLink6 || "";
      updatedFormData["5.3.2"]["5.3.2.1"].year1 =
        response.numParticipationsByY1 || "";
      updatedFormData["5.3.2"]["5.3.2.1"].year2 =
        response.numParticipationsByY2 || "";
      updatedFormData["5.3.2"]["5.3.2.1"].year3 =
        response.numParticipationsByY3 || "";
      updatedFormData["5.3.2"]["5.3.2.1"].year4 =
        response.numParticipationsByY4 || "";
      updatedFormData["5.3.2"]["5.3.2.1"].year5 =
        response.numParticipationsByY5 || "";
      updatedFormData["5.3.2"].doc[0] = response.institutionalDataTemplate_doc7;
      updatedFormData["5.3.2"].doc[1] = response.suporting_doc;
      updatedFormData["5.4.1"].para = response.alumniAssocContribution || "";
      updatedFormData["5.4.1"].doc[0] = response.addInfo_doc;
      updatedFormData["5.4.1"].doc[1] = response.addInfoLink2;
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
