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

const Criteria3 = (prop, ref) => {
  const { setAnsQs, ansQs } = prop;
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    "3.1.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "3.1.2": {
      doc: [""],
      link: [""],
      "3.1.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.1.3": {
      doc: [""],
      link: [""],
      "3.1.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.1.4": {
      doc: [""],
      link: [""],
      "3.1.4.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "3.1.4.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.2.1": {
      doc: [""],
      link: [""],
      "3.2.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.2.2": {
      doc: [""],
      link: [""],
      "3.2.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "3.2.2.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.3.1": {
      doc: ["", ""],
      para: "",
      link: [""],
    },
    "3.3.2": {
      doc: [""],
      "3.3.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "3.4.1": {
      doc: [""],
      link: [""],
      select: "",
    },
    "3.4.2": {
      doc: [""],
      link: [""],
      "3.4.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.4.3": {
      doc: [""],
      "3.4.3.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      "3.4.3.2": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "3.4.4": {
      doc: [""],
      link: [""],
      "3.4.4.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.4.5": {
      doc: [""],
      link: [""],
      "3.4.5.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.4.6": {
      doc: [""],
      link: [""],
      select: "",
    },
    "3.5.1": {
      doc: [""],
      "3.5.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
      link: [""],
    },
    "3.6.1": {
      para: "",
      doc: ["", ""],
      link: [""],
    },
    "3.6.2": {
      doc: [""],
      link: [""],
      "3.6.2.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
    "3.7.1": {
      doc: [""],
      link: [""],
      "3.7.1.1": {
        year1: "",
        year2: "",
        year3: "",
        year4: "",
        year5: "",
      },
    },
  });
  const [relatedInput, setRelatedInput] = useState({
    "3.1.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.1.3.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.1.4.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.1.4.2": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.2.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.2.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.3.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.3.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.3.2": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.4.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.4.5.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.5.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.6.2.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
    "3.7.1.1": {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    },
  });

  const keyIndicators = {
    "Promotions of Research and Facilities": {
      "3.1.1": [
        "QIM",
        "The institution's Research facilities are frequently updated and there are well defined policy for promotion of research which is uploaded on the institutional website and implemented",
        {
          "Upload any additional information": [
            "Upload",
            "instDataTemplate_doc",
          ],
          "Provide links as Additional Information": ["Upload", "dummy"],
          "Upload supporting document": ["Upload", "supporting_doc"],
        },
      ],
      "3.1.2": [
        "QnM",
        "The institution provides seed money to its teachers for research (average per year)",
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
            "3.1.2.1",
            "3.1.2.1: Amount of seed money provided by institution to its teachers for research year- wise during the last five years(INR in lakhs)",
            true,
          ],
        ],
      ],
      "3.1.3": [
        "QnM",
        "Percentage of teachers receiving national/ international fellowship/financial support by various agencies for advanced studies/ research during the last five years",
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
            "3.1.3.1",
            "3.1.3.1: Number of teachers who received national/ international fellowship/financial support from various agencies, for advanced studies /research, year-wise during the last five years",
            true,
            "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
          ],
        ],
      ],
      "3.1.4": [
        "QnM",
        "Percentage of JRFs, SRFs among the enrolled PhD scholars in the institution during the last five years",
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
            "3.1.4.1",
            "3.1.4.1: The Number of JRFs, SRFs among the enrolled PhD scholars in the institution during the last five years",
            true,
          ],
          [
            "3.1.4.2",
            "3.1.4.2: Number of PhD Scholars enrolled during last five years",
            true,
          ],
        ],
      ],
    },
    "Resource Mobilization for Research": {
      "3.2.1": [
        "QnM",
        "Research funding received by the institution and its faculties through Government and non-government sources such as industry, corporate houses, international bodies for research project, Endowment Research Chairs during the last five years",
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
            "3.2.1.1",
            "3.2.1.1: Total Grants for Research funding received by the institution and its faculties through Government and non-government sources such as industry, corporate houses, international bodies for research project, Endowment Research Chairs during the last five years (INR in Lakhs)",
            true,
          ],
        ],
      ],
      "3.2.2": [
        "QnM",
        "Number of research projects per teacher funded by government, nongovernment, industry, corporate houses, international bodies during the last five years",
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
            "3.2.2.1",
            "3.2.2.1: Number of research projects funded by government and nongovernment agencies during the last five years",
            true,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
          [
            "3.2.2.2",
            "",
            "",
            "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
          ],
        ],
      ],
    },
    "Innovation Ecosystem": {
      "3.3.1": [
        "QIM",
        "Institution has created an ecosystem for innovations, Indian Knowledge System (IKS) including awareness about IPR, establishment of IPR cell, Incubation centre and other initiatives for the creation and transfer of technology/knowledge and the outcomes the same are evident",
        {
          "Upload any additional information": ["Upload", "dummy"],
          "Upload database of all currently enrolled students (data template)":
            ["Data Template", "institutionalDataFormat_doc2"],
        },
      ],
      "3.3.2": [
        "QnM",
        "Number of awards received for research/innovations by the institution/teachers/research scholars/students during the last five years",
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
            "3.3.2.1",
            "3.3.2.1: Total number of awards received for research/innovations by institution/teachers/research scholars/students during the last five years",
            true,
          ],
        ],
      ],
    },
    "Research Publications and Awards": {
      "3.4.1": [
        "QnM",
        "The institution ensures implementation of its stated Code of Ethics for research",
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
            "3.4.1.1",
            "3.4.1.1 The institution has a stated Code of Ethics for research and the implementation of which is ensured through the following",
            "select",
            "",
            [
              "Inclusion of research ethics in the research methodology course work",
              "Presence of institutional Ethics committees (Animal, chemical,bio-ethics etc.,)",
              "Plagiarism check through sofware",
              "Research Advisory Committee",
            ],
          ],
        ],
      ],
      "3.4.2": [
        "QnM",
        "Number of Patents awarded during the last five years",
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
            "3.4.2.1",
            "3.4.2.1: Total number of Patents awarded during the last five years",
            true,
          ],
        ],
      ],
      "3.4.3": [
        "QnM",
        "Number of Ph.Ds awarded per recognized guide during the last five years",
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
            "3.4.3.1",
            "3.4.3.1 How many Ph.D s were awarded during last 5 years",
            true,
          ],
          [
            "3.4.3.2",
            "3.4.3.2 Number of teachers recognized as guides during the last five years",
            true,
          ],
        ],
      ],
      "3.4.4": [
        "QnM",
        "Number of research papers published per teacher in the Journals as notified on UGC CARE list during the last five years",
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
            "3.4.4.1",
            "3.4.4.1 Number of research papers published in the Journals as notified on UGC CARE list during the last five years",
            true,
            "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
          ],
        ],
      ],
      "3.4.5": [
        "QnM",
        "Number of books and chapters in edited volumes published per teacher during the last five years",
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
            "3.4.5.1",
            "3.4.5.1 Total number of books and chapters in edited volumes / books published during the last five years",
            true,
            "Number of Full-time teachers in the institution year-wise during last five year",
          ],
          [
            "3.4.5.2",
            "",
            "",
            "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
          ],
        ],
      ],
      "3.4.6": [
        "QnM",
        "E-content is developed by teachers :",
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
            "Number of Full-time teachers in the institution year-wise during last five year",
            [
              "For e-PG-Pathshala",
              "For CEC (Undergraduate)",
              "For SWAYAM",
              "For other MOOCs platforms",
              "Any other Government Initiatives",
              "For Institutional LMS",
            ],
          ],
        ],
      ],
      // "3.4.7": [
      //   "QnM",
      //   "Bibliometrics of the publications during the last five years based on average Citation Index in Scopus/ Web of Science",
      //   {
      //     "Institutional data in the prescribed format (data template)": [
      //       "Data Template",
      //       "instDataTemplate_doc",
      //     ],
      //     "Provide Links for any other relevant document to support the claim (if any)":
      //       ["Link"],
      //   },
      //   [
      //     [
      //       "3.4.4.1",
      //       "3.4.4.1 Number of research papers published in the Journals as notified on UGC CARE list during the last five years",
      //       true,
      //       "Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years",
      //     ],
      //   ],
      // ],
      // 3.4.8 also left
    },
    Consultancy: {
      "3.5.1": [
        "QnM",
        "Revenue generated from consultancy and corporate training during the last five years",
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
            "3.5.1.1",
            "3.5.1.1 Total amount generated from consultancy and corporate training year-wise during the last five years (INR in lakhs)",
            true,
          ],
        ],
      ],
    },
    "Extension Activities": {
      "3.6.1": [
        "QIM",
        "Outcomes of Extension activities in the neighborhood community in terms of impact and sensitizing the students to social issues for their holistic development and awards received if any during the last five years.",
        {
          "Provide Link for Additional information": ["Link"],
          "Upload Additional information": ["Upload", "addInfo_doc"],
          "Provide the relevant information in intitutional website as part of public disclosure":
            ["Upload", "dummy"],
        },
      ],
      "3.6.2": [
        "QnM",
        "Number of extension and outreach programs conducted by the institution through organized forums including NSS/NCC with involvement of community during the last five years",
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
            "3.6.2.1",
            "3.6.2.1 Number of extension and outreach programs conducted by the institution through organized forums including NSS/NCC with involvement of community year wise during the last five years.",
            true,
          ],
        ],
      ],
    },
    Collaboration: {
      "3.7.1": [
        "QnM",
        "Number of functional MoUs/linkages with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the last five years",
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
            "3.7.1.1",
            "3.7.1.1 Number of functional MoUs with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the last five years",
            true,
          ],
        ],
      ],
    },
  };

  useEffect(() => {
    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );
      if (response) {
        const updatedRelatedInput = { ...relatedInput };
        updatedRelatedInput["3.3.1.1"].year1 = response.acadFullTimeTeachYear1;
        updatedRelatedInput["3.3.1.1"].year2 = response.acadFullTimeTeachYear2;
        updatedRelatedInput["3.3.1.1"].year3 = response.acadFullTimeTeachYear3;
        updatedRelatedInput["3.3.1.1"].year4 = response.acadFullTimeTeachYear4;
        updatedRelatedInput["3.3.1.1"].year5 = response.acadFullTimeTeachYear5;
        updatedRelatedInput["3.3.2.1"] = updatedRelatedInput["3.3.1.1"];
        setRelatedInput(updatedRelatedInput);
      }
    })();

    (async () => {
      const response = await config.ssrAPIRequest(
        "GET",
        `qif/data-c3/${collegeData.collegId}`
      );

      const updatedFormData = { ...formData };
      updatedFormData.qifId = response.qifId;
      updatedFormData.criteriaIII_Id = response.criteriaIII_Id;
      updatedFormData["3.1.1"]["3.1.1.1"].year1 =
        response.totGrantGovtNonGovtLastY1 || "";
      updatedFormData["3.1.1"]["3.1.1.1"].year2 =
        response.totGrantGovtNonGovtLastY2 || "";
      updatedFormData["3.1.1"]["3.1.1.1"].year3 =
        response.totGrantGovtNonGovtLastY3 || "";
      updatedFormData["3.1.1"]["3.1.1.1"].year4 =
        response.totGrantGovtNonGovtLastY4 || "";
      updatedFormData["3.1.1"]["3.1.1.1"].year5 =
        response.totGrantGovtNonGovtLastY5 || "";
      updatedFormData["3.1.1"].doc[0] = response.instDataTemplate_doc || "";
      updatedFormData["3.1.1"].doc[1] = response.supporting_doc || "";

      updatedFormData["3.2.1"].para = response.devlopedKnowledgeSystem || "";
      updatedFormData["3.2.1"].doc[0] = response.additionalInfo_doc || "";
      updatedFormData["3.2.1"].link[0] = response.additionalInfoLink || "";
      updatedFormData["3.2.2"]["3.2.2.1"].year1 =
        response.totWorkshopOnResearchMetho_Y1 || "";
      updatedFormData["3.2.2"]["3.2.2.1"].year2 =
        response.totWorkshopOnResearchMetho_Y2 || "";
      updatedFormData["3.2.2"]["3.2.2.1"].year3 =
        response.totWorkshopOnResearchMetho_Y3 || "";
      updatedFormData["3.2.2"]["3.2.2.1"].year4 =
        response.totWorkshopOnResearchMetho_Y4 || "";
      updatedFormData["3.2.2"]["3.2.2.1"].year5 =
        response.totWorkshopOnResearchMetho_Y5 || "";
      updatedFormData["3.2.2"].doc[0] =
        response.institutionalDataFormat_doc || "";
      updatedFormData["3.2.2"].doc[1] = response.supporting_doc2 || "";
      updatedFormData["3.3.1"]["3.3.1.1"].year1 =
        response.paperInUGCJournalByY1 || "";
      updatedFormData["3.3.1"]["3.3.1.1"].year2 =
        response.paperInUGCJournalByY2 || "";
      updatedFormData["3.3.1"]["3.3.1.1"].year3 =
        response.paperInUGCJournalByY3 || "";
      updatedFormData["3.3.1"]["3.3.1.1"].year4 =
        response.paperInUGCJournalByY4 || "";
      updatedFormData["3.3.1"]["3.3.1.1"].year5 =
        response.paperInUGCJournalByY5 || "";
      updatedFormData["3.3.1"].doc[0] =
        response.institutionalDataFormat_doc2 || "";
      updatedFormData["3.3.1"].link[0] =
        response.ugcCareJournalsPaperLinks || "";
      updatedFormData["3.3.1"].link[1] =
        response.paperLinkFirstPageOnInstitWeb || "";
      updatedFormData["3.3.1"].link[2] = response.redirectLink || "";
      updatedFormData["3.3.1"].link[3] = response.relivantDocLink || "";
      updatedFormData["3.3.2"]["3.3.2.1"].year1 =
        response.bookChaptPerTeachY1 || "";
      updatedFormData["3.3.2"]["3.3.2.1"].year2 =
        response.bookChaptPerTeachY2 || "";
      updatedFormData["3.3.2"]["3.3.2.1"].year3 =
        response.bookChaptPerTeachY3 || "";
      updatedFormData["3.3.2"]["3.3.2.1"].year4 =
        response.bookChaptPerTeachY4 || "";
      updatedFormData["3.3.2"]["3.3.2.1"].year5 =
        response.bookChaptPerTeachY5 || "";
      updatedFormData["3.3.2"].doc[0] =
        response.institutionalDataFormat_doc3 || "";
      updatedFormData["3.3.2"].doc[1] = response.firstPageWithISBN_doc || "";
      updatedFormData["3.3.2"].link[0] =
        response.relevantDocumentSupport_Link || "";
      updatedFormData["3.4.1"].para =
        response.extActOutcome_neighComm_5yrs || "";
      updatedFormData["3.4.1"].doc[0] = response.addInfo_doc || "";
      updatedFormData["3.4.1"].link[0] = response.addInfoLink || "";
      updatedFormData["3.4.2"].para = response.extActAwardsGovt || "";
      updatedFormData["3.4.2"].doc[0] = response.addInfo_doc2 || "";
      updatedFormData["3.4.2"].link[0] = response.addInfoLink3 || "";
      updatedFormData["3.4.3"]["3.4.3.1"].year1 =
        response.numExtOutreachProgramsY1 || "";
      updatedFormData["3.4.3"]["3.4.3.1"].year2 =
        response.numExtOutreachProgramsY2 || "";
      updatedFormData["3.4.3"]["3.4.3.1"].year3 =
        response.numExtOutreachProgramsY3 || "";
      updatedFormData["3.4.3"]["3.4.3.1"].year4 =
        response.numExtOutreachProgramsY4 || "";
      updatedFormData["3.4.3"]["3.4.3.1"].year5 =
        response.numExtOutreachProgramsY5 || "";
      updatedFormData["3.4.3"].doc[0] =
        response.institutionalDataFormat_doc5 || "";
      updatedFormData["3.4.3"].doc[1] =
        response.extensionOutreachProgramDetails_doc || "";
      updatedFormData["3.4.3"].doc[2] =
        response.docWithCaptionsAndDates_doc || "";
      updatedFormData["3.4.3"].link[0] =
        response.relevantDocumentSupport_Link3 || "";
      updatedFormData["3.5.1"]["3.5.1.1"].year1 =
        response.functLinkagesLastY1 || "";
      updatedFormData["3.5.1"]["3.5.1.1"].year2 =
        response.functLinkagesLastY2 || "";
      updatedFormData["3.5.1"]["3.5.1.1"].year3 =
        response.functLinkagesLastY3 || "";
      updatedFormData["3.5.1"]["3.5.1.1"].year4 =
        response.functLinkagesLastY4 || "";
      updatedFormData["3.5.1"]["3.5.1.1"].year5 =
        response.functLinkagesLastY5 || "";
      updatedFormData["3.5.1"].doc[0] =
        response.institutionalDataFormat_doc4 || "";
      updatedFormData["3.5.1"].doc[1] =
        response.collaborationsByActivity_doc || "";
      updatedFormData["3.5.1"].doc[2] = response.collaborationDetails_doc || "";
      updatedFormData["3.5.1"].doc[3] = response.activitiesByYear_doc || "";
      updatedFormData["3.5.1"].link[0] =
        response.relevantDocumentSupport_Link2 || "";
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
    setAnsQs({ ...ansQs, 3: totalFilledElements });
  }, [formData]);

  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const criteria3Save = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeID", collegeData.collegId);
    formsData.append(
      "totGrantGovtNonGovtLastY1",
      formData["3.1.1"]["3.1.1.1"].year1
    );
    formsData.append(
      "totGrantGovtNonGovtLastY2",
      formData["3.1.1"]["3.1.1.1"].year2
    );
    formsData.append(
      "totGrantGovtNonGovtLastY3",
      formData["3.1.1"]["3.1.1.1"].year3
    );
    formsData.append(
      "totGrantGovtNonGovtLastY4",
      formData["3.1.1"]["3.1.1.1"].year4
    );
    formsData.append(
      "totGrantGovtNonGovtLastY5",
      formData["3.1.1"]["3.1.1.1"].year5
    );
    formsData.append("devlopedKnowledgeSystem", formData["3.2.1"].para);
    formsData.append("additionalInfoLink", formData["3.2.1"].link);
    formsData.append(
      "totWorkshopOnResearchMetho_Y1",
      formData["3.2.2"]["3.2.2.1"].year1
    );
    formsData.append(
      "totWorkshopOnResearchMetho_Y2",
      formData["3.2.2"]["3.2.2.1"].year2
    );
    formsData.append(
      "totWorkshopOnResearchMetho_Y3",
      formData["3.2.2"]["3.2.2.1"].year3
    );
    formsData.append(
      "totWorkshopOnResearchMetho_Y4",
      formData["3.2.2"]["3.2.2.1"].year4
    );
    formsData.append(
      "totWorkshopOnResearchMetho_Y5",
      formData["3.2.2"]["3.2.2.1"].year5
    );
    formsData.append(
      "paperInUGCJournalByY1",
      formData["3.3.1"]["3.3.1.1"].year1
    );
    formsData.append(
      "paperInUGCJournalByY2",
      formData["3.3.1"]["3.3.1.1"].year2
    );
    formsData.append(
      "paperInUGCJournalByY3",
      formData["3.3.1"]["3.3.1.1"].year3
    );
    formsData.append(
      "paperInUGCJournalByY4",
      formData["3.3.1"]["3.3.1.1"].year4
    );
    formsData.append(
      "paperInUGCJournalByY5",
      formData["3.3.1"]["3.3.1.1"].year5
    );
    formsData.append("ugcCareJournalsPaperLinks", formData["3.3.1"].link[0]);
    formsData.append(
      "paperLinkFirstPageOnInstitWeb",
      formData["3.3.1"].link[1]
    );
    formsData.append("redirectLink", formData["3.3.1"].link[2]);
    formsData.append("relivantDocLink", formData["3.3.1"].link[3]);
    formsData.append("bookChaptPerTeachY1", formData["3.3.2"]["3.3.2.1"].year1);
    formsData.append("bookChaptPerTeachY2", formData["3.3.2"]["3.3.2.1"].year2);
    formsData.append("bookChaptPerTeachY3", formData["3.3.2"]["3.3.2.1"].year3);
    formsData.append("bookChaptPerTeachY4", formData["3.3.2"]["3.3.2.1"].year4);
    formsData.append("bookChaptPerTeachY5", formData["3.3.2"]["3.3.2.1"].year5);
    formsData.append("relevantDocumentSupport_Link", formData["3.3.2"].link[0]);
    formsData.append("extActOutcome_neighComm_5yrs", formData["3.4.1"].para);
    formsData.append("addInfoLink", formData["3.4.1"].link[0]);
    formsData.append("extActAwardsGovt", formData["3.4.2"].para);
    formsData.append("addInfoLink3", formData["3.4.2"].link[0]);
    formsData.append(
      "numExtOutreachProgramsY1",
      formData["3.4.3"]["3.4.3.1"].year1
    );
    formsData.append(
      "numExtOutreachProgramsY2",
      formData["3.4.3"]["3.4.3.1"].year2
    );
    formsData.append(
      "numExtOutreachProgramsY3",
      formData["3.4.3"]["3.4.3.1"].year3
    );
    formsData.append(
      "numExtOutreachProgramsY4",
      formData["3.4.3"]["3.4.3.1"].year4
    );
    formsData.append(
      "numExtOutreachProgramsY5",
      formData["3.4.3"]["3.4.3.1"].year5
    );
    formsData.append(
      "relevantDocumentSupport_Link3",
      formData["3.4.3"].link[0]
    );
    formsData.append("functLinkagesLastY1", formData["3.5.1"]["3.5.1.1"].year1);
    formsData.append("functLinkagesLastY2", formData["3.5.1"]["3.5.1.1"].year2);
    formsData.append("functLinkagesLastY3", formData["3.5.1"]["3.5.1.1"].year3);
    formsData.append("functLinkagesLastY4", formData["3.5.1"]["3.5.1.1"].year4);
    formsData.append("functLinkagesLastY5", formData["3.5.1"]["3.5.1.1"].year5);
    formsData.append(
      "relevantDocumentSupport_Link2",
      formData["3.5.1"].link[0]
    );
    formsData.append("CriteriaIII_Id", formData.criteriaIII_Id);
    const response = await config.ssrAPIRequest(
      "PUT",
      `qif/data-c3/${collegeData.collegId}`,
      formsData
    );
  };

  useImperativeHandle(ref, () => ({
    criteria3Save,
  }));
  return (
    <div className="max-h-[540px] overflow-scroll">
      {Object.keys(keyIndicators).map((ele, i) => (
        <div className="p-2" key={i}>
          <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
            3.{i + 1}. {ele}
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

export default forwardRef(Criteria3);

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
          `crite-3/${formData.criteriaIII_Id}/doc`,
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
        `qif/doc-c3/${formData.criteriaIII_Id}`,
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
