"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import Form1 from "./Form1";
import QualificationTable from "./QualificationTable";
import StudentEnrolled from "./StudentEnrolled";
import { contextManager } from "context/store";
import SubmitModal from "./SubmitModal";
import { useRouter } from "next/navigation";
import { collegeUnderUnieristy } from "components/assets/collegeUnderUniveristy";

const AcademicInformation = () => {
  const router = useRouter();
  const { ssrID, collegeData, setSelectedMenu, selectedMenu } =
    contextManager();
  const qualifications = ["DSC_DLITT", "PHD", "MPHIL", "PG"];
  const categories = [
    "PERMANENT_TEACHER",
    "TEMPORARY_TEACHER",
    "PART_TIME_TEACHER",
  ];
  const program = ["UG", "PG", "Diploma"];
  const stuCategory = ["ST", "SC", "OBC", "Others"];
  const sanctionAuth = ["management", "ugc"];
  const facultyType = ["Professor", "AssociateProfessor", "AssistantProfessor"];
  const staffType = ["teachingStaff", "nTS", "technicalStaff"];
  const [formData, setFormData] = useState({
    teachingStaff: createEmptyTeachingstaff(),
    qualification: createEmptyQualification(),
    guestFaculty: { male: 0, female: 0, others: 0 },
    studentCourseEnrolled: createEmptyStudentEnrolled(),
    studentCategoryEnrolled: createEmptyCategoryStudentEnrolled(),
    programs: {
      selfFinanced: 0,
      newProg: 0,
    },
    cost: {
      unitCost: 0,
      includingSalary: 0,
      excludingSalary: 0,
    },
    progDetails: {
      level: "",
      language: [],
    },
  });
  const [collegeList, setCollegeList] = useState([
    { type: "", permanent: "", temprory: "" },
  ]);
  const [chairs, setChairs] = useState([
    {
      SNO: "",
      Dept: "",
      Chairs: "",
      Sponsor: "",
    },
  ]);
  const [finalsubmitState, setFinalSubmitState] = useState(false);
  const [integratedProg, setIntegratedProg] = useState({
    state: "NO",
    sameState: "",
    other: "",
    nri: "",
    foreign: "",
  });

  function createEmptyQualification() {
    return categories.reduce((categoryAcc, category) => {
      categoryAcc[category] = qualifications.reduce(
        (qualificationAcc, qualification) => {
          qualificationAcc[qualification] = {
            PROFESSOR: createEmptyGender(),
            ASSOCIATE_PROFESSOR: createEmptyGender(),
            ASSISTANT_PROFESSOR: createEmptyGender(),
          };
          return qualificationAcc;
        },
        {}
      );
      return categoryAcc;
    }, {});
  }
  function createEmptyTeachingstaff() {
    return staffType.reduce((staffACC, category) => {
      staffACC[category] = {};
      sanctionAuth.forEach((sanct) => {
        if (category === "teachingStaff") {
          facultyType.forEach((ele) => {
            staffACC[category][sanct + ele] = 0;
            staffACC[category][sanct + ele + "Male"] = 0;
            staffACC[category][sanct + ele + "Female"] = 0;
            staffACC[category][sanct + ele + "Others"] = 0;
            staffACC[category][sanct + ele + "YetToRecruited"] = 0;
          });
        } else {
          staffACC[category][sanct] = 0;
          staffACC[category][sanct + "Male"] = 0;
          staffACC[category][sanct + "Female"] = 0;
          staffACC[category][sanct + "Others"] = 0;
          staffACC[category][sanct + "YetToRecruited"] = 0;
        }
      });

      return staffACC;
    }, {});
  }
  function createEmptyStudentEnrolled() {
    return program.reduce((programAcc, prog) => {
      programAcc[prog] = {
        Male: createEmptyProgType(),
        Female: createEmptyProgType(),
        Others: createEmptyProgType(),
      };
      return programAcc;
    }, {});
  }
  function createEmptyCategoryStudentEnrolled() {
    return stuCategory.reduce((stuCategoryAcc, prog) => {
      stuCategoryAcc[prog] = {
        Male: createEmptyProgYear(),
        Female: createEmptyProgYear(),
        Others: createEmptyProgYear(),
      };
      return stuCategoryAcc; // Add this line to return the accumulator
    }, {});
  }
  function createEmptyGender() {
    return {
      maleTeacher: 0,
      femaleTeacher: 0,
      otherTeacher: 0,
    };
  }
  function createEmptyProgType() {
    return {
      CollegeState: 0,
      OtherState: 0,
      NRI: 0,
      Foreign: 0,
    };
  }
  function createEmptyProgYear() {
    return {
      Year1: 0,
      Year2: 0,
      Year3: 0,
      Year4: 0,
    };
  }
  useEffect(() => {
    if (ssrID) {
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `staff-details/${ssrID}`
        );
        response &&
          response.map((ele) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              qualification: {
                ...prevFormData.qualification,
                [ele.teacherType]: {
                  ...prevFormData.qualification[ele.teacherType],
                  [ele.qualifications]: {
                    ...prevFormData.qualification[ele.teacherType][
                      ele.qualifications
                    ],
                    [ele.facultyType]: {
                      ...prevFormData.qualification[ele.teacherType][
                        ele.qualifications
                      ][ele.facultyType],
                      staffId: ele.staffId,
                      maleTeacher: ele.maleTeacher,
                      femaleTeacher: ele.femaleTeacher,
                      otherTeacher: ele.otherTeacher,
                      staffDetailsId: ele.staffDetailsId,
                    },
                  },
                },
              },
            }));
          });
      })();
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details/${ssrID}`
        );
        response &&
          response.map((ele) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              studentCourseEnrolled: {
                ...prevFormData.studentCourseEnrolled,
                [ele.program]: {
                  ...prevFormData.studentCourseEnrolled[ele.program],
                  [ele.gender]: {
                    ...prevFormData.studentCourseEnrolled[ele.gender],
                    CollegeState: ele.fromState,
                    Foreign: ele.foreignStudent,
                    NRI: ele.nriStudent,
                    OtherState: ele.fromOther,
                    studentCurrentYearId: ele.studentCurrentYearId,
                  },
                },
              },
            }));
          });
      })();
      (async () => {
        const response = await config.ssrAPIRequest(
          "GET",
          `student-details-last-four-year/${ssrID}`
        );

        response &&
          response.forEach((ele) => {
            if (ele.category !== null) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                studentCategoryEnrolled: {
                  ...prevFormData.studentCategoryEnrolled,
                  [ele.category]: {
                    ...prevFormData.studentCategoryEnrolled[ele.category],
                    [ele.gender]: {
                      ...prevFormData.studentCategoryEnrolled[ele.category]?.[
                        ele.gender
                      ],
                      Year1: ele.year1 || 0,
                      Year2: ele.year2 || 0,
                      Year3: ele.year3 || 0,
                      Year4: ele.year4 || 0,
                      studentDeatailId: ele.studentDeatailId,
                    },
                  },
                },
              }));
            } else {
              setFormData((prevFormData) => ({
                ...prevFormData,
                programs: {
                  studentDeatailId: ele.studentDeatailId,
                  selfFinanced: ele.selfFinancedPrograms,
                  newProg: ele.newProgramsIntroduced,
                },
                cost: {
                  unitCost: ele.unitCostofEducation,
                  includingSalary: ele.includingSalary,
                  excludingSalary: ele.excludingSalary,
                },
              }));
            }
          });
      })();
    }
  }, [ssrID]);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;

    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const findSum = (data, Year) => {
    let sum = 0;
    for (const key in data) {
      const a = data[key];
      for (const key in a) {
        sum += a[key][Year];
      }
    }
    return sum;
  };

  const handleSubmit = () => {
    const submitStaff = async () => {
      const staffType = {
        TEACHING_STAFF: "teachingStaff",
        NON_TEACHING_STAFF: "nTS",
        TECHNICAL_STAFF: "technicalStaff",
      };

      const sanctionBodyMap = {
        UGC: "ugc",
        MANAGEMENT: "management",
      };

      const facultyTypeMap = {
        PROFESSOR: "Professor",
        ASSOCIATE_PROFESSOR: "AssociateProfessor",
        ASSISTANT_PROFESSOR: "AssistantProfessor",
      };

      for (const staff in staffType) {
        for (const sanctioned in sanctionBodyMap) {
          const isTeachingStaff = staffType[staff] === "teachingStaff";

          if (isTeachingStaff) {
            for (const faculty in facultyTypeMap) {
              const formItemKey = `${sanctionBodyMap[sanctioned]}${facultyTypeMap[faculty]}`;
              const staffIdKey = `${sanctionBodyMap[sanctioned]}${facultyTypeMap[faculty]}staffId`;
              const Method = formData[staffType[staff]][staffIdKey]
                ? "PUT"
                : "POST";

              // FormData Append
              const formsData = new FormData();
              formsData.append("ssrId", ssrID);
              formsData.append("staffType", staff);
              formsData.append("sanctionedBy", sanctioned);
              formsData.append("facultyType", faculty);
              formsData.append(
                "totalStaff",
                formData.teachingStaff[staffType[staff]][formItemKey]
              );
              formsData.append(
                "recruitedMale",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Male`]
              );
              formsData.append(
                "recruitedFemale",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Female`]
              );
              formsData.append(
                "recruitedOther",
                formData.teachingStaff[staffType[staff]][`${formItemKey}Others`]
              );
              formsData.append(
                "yetToRecruited",
                formData.teachingStaff[staffType[staff]][
                  `${formItemKey}YetToRecruited`
                ]
              );
              const response = await config.ssrAPIRequest(
                Method,
                Method === "POST"
                  ? "staff"
                  : `staff/${
                      formData.teachingStaff[staffType[staff]][staffIdKey]
                    }`,
                formsData
              );
            }
          } else {
            const formItemKey = sanctionBodyMap[sanctioned];
            const staffIdKey = `${sanctionBodyMap[sanctioned]}staffId`;
            const Method = formData.teachingStaff[staffType[staff]][staffIdKey]
              ? "PUT"
              : "POST";

            // FormData Append
            const formsData = new FormData();
            formsData.append("ssrId", ssrID);
            formsData.append("staffType", staff);
            formsData.append("sanctionedBy", sanctioned);
            formsData.append(
              "totalStaff",
              formData.teachingStaff[staffType[staff]][formItemKey]
            );
            formsData.append(
              "recruitedMale",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Male`]
            );
            formsData.append(
              "recruitedFemale",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Female`]
            );
            formsData.append(
              "recruitedOther",
              formData.teachingStaff[staffType[staff]][`${formItemKey}Others`]
            );
            formsData.append(
              "yetToRecruited",
              formData.teachingStaff[staffType[staff]][
                `${formItemKey}YetToRecruited`
              ]
            );
            const response = await config.ssrAPIRequest(
              Method,
              Method === "POST"
                ? "staff"
                : `staff/${
                    formData.teachingStaff[staffType[staff]][staffIdKey]
                  }`,
              formsData
            );
          }
        }
      }
    };
    const submitSatffDetails = async () => {
      const facultyType = {
        PROFESSOR: "PROFESSOR",
        ASSOCIATE_PROFESSOR: "ASSOCIATE_PROFESSOR",
        ASSISTANT_PROFESSOR: "ASSISTANT_PROFESSOR",
      };

      for (const teacherType in categories) {
        for (const degree in qualifications) {
          for (const type in facultyType) {
            const data =
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ];
            const totalSum = Object.values(data).reduce(
              (acc, category) =>
                acc +
                category.maleTeacher +
                category.femaleTeacher +
                category.otherTeacher,
              0
            );

            const staffid =
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].staffDetailsId &&
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].staffDetailsId;

            const formsData = new FormData();
            formsData.append("ssrId", ssrID);
            formsData.append("qualifications", qualifications[degree]);
            formsData.append("teacherType", categories[teacherType]);
            formsData.append("facultyType", type);
            formsData.append(
              "maleTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].maleTeacher
            );
            formsData.append(
              "femaleTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].femaleTeacher
            );
            formsData.append(
              "otherTeacher",
              formData.qualification[categories[teacherType]][
                qualifications[degree]
              ][type].otherTeacher
            );
            formsData.append("totalTeacher", totalSum);

            const response = await config.ssrAPIRequest(
              `${staffid ? "PUT" : "POST"}`,
              `staff-details${staffid ? "/" + staffid : ""}`,
              formsData
            );
          }
        }
      }
    };
    const submitGuestFaculty = async () => {
      const total =
        formData.guestFaculty.male +
        formData.guestFaculty.female +
        formData.guestFaculty.others;
      const formsData = new FormData();
      formsData.append("guestFacultiesMale", formData.guestFaculty.male);
      formsData.append("guestFacultiesFemale", formData.guestFaculty.female);
      formsData.append("guestFacultiesOther", formData.guestFaculty.others);
      formsData.append("guestFacultiesTotal", total);
      formsData.append("staffType", "GUEST_STAFF");
      formsData.append("ssrId", ssrID);

      const response = await config.ssrAPIRequest(
        "PUT",
        `staff-guest/${
          formData.guestFaculty.staffId ? formData.guestFaculty.staffId : ""
        }`,
        formsData
      );
    };
    const submitProgDetails = async () => {
      const formsData = new FormData();
      formsData.append("selfFinancedPrograms", formData.programs.selfFinanced);
      formsData.append("newProgramsIntroduced", formData.programs.newProg);
      formsData.append("unitCostofEducation", formData.cost.unitCost);
      formsData.append("includingSalary", formData.cost.includingSalary);
      formsData.append("excludingSalary", formData.cost.excludingSalary);
      formsData.append("ssrId", ssrID);

      const response = await config.ssrAPIRequest(
        "PUT",
        `student-details-enrolled${
          formData.programs.studentDeatailId
            ? "/" + formData.programs.studentDeatailId
            : ""
        }`,
        formsData
      );
    };
    const submitStuCourseEnrolled = async () => {
      const gender = ["Male", "Female", "Others"];
      program.map((prog) => {
        gender.map(async (gender) => {
          const studentId =
            formData.studentCourseEnrolled[prog][gender].studentCurrentYearId &&
            formData.studentCourseEnrolled[prog][gender].studentCurrentYearId;
          const total =
            formData.studentCourseEnrolled[prog][gender].CollegeState +
            formData.studentCourseEnrolled[prog][gender].OtherState +
            formData.studentCourseEnrolled[prog][gender].NRI +
            formData.studentCourseEnrolled[prog][gender].Foreign;
          const formsData = new FormData();
          formsData.append("ssrId", ssrID);
          formsData.append("program", prog);
          formsData.append("gender", gender);
          formsData.append(
            "fromState",
            formData.studentCourseEnrolled[prog][gender].CollegeState
          );
          formsData.append(
            "fromOther",
            formData.studentCourseEnrolled[prog][gender].OtherState
          );
          formsData.append(
            "nriStudent",
            formData.studentCourseEnrolled[prog][gender].NRI
          );
          formsData.append(
            "foreignStudent",
            formData.studentCourseEnrolled[prog][gender].Foreign
          );
          formsData.append("total", total);

          const response = await config.ssrAPIRequest(
            `${studentId ? "PUT" : "POST"}`,
            `student-details${studentId ? "/" + studentId : ""}`,
            formsData
          );
        });
      });
    };
    const submitStuCatEnrolled = async () => {
      const gender = ["Male", "Female", "Others"];
      stuCategory.map((prog) => {
        gender.map(async (gender) => {
          const studentId =
            formData.studentCategoryEnrolled[prog][gender].studentDeatailId &&
            formData.studentCategoryEnrolled[prog][gender].studentDeatailId;

          const formsData = new FormData();
          formsData.append("ssrId", ssrID);
          formsData.append("category", prog);
          formsData.append("gender", gender);
          formsData.append(
            "year1",
            formData.studentCategoryEnrolled[prog][gender].Year1
          );
          formsData.append(
            "year2",
            formData.studentCategoryEnrolled[prog][gender].Year2
          );
          formsData.append(
            "year3",
            formData.studentCategoryEnrolled[prog][gender].Year3
          );
          formsData.append(
            "year4",
            formData.studentCategoryEnrolled[prog][gender].Year4
          );

          const response = await config.ssrAPIRequest(
            `${studentId ? "PUT" : "POST"}`,
            `student-details-last-four-year${studentId ? "/" + studentId : ""}`,
            formsData
          );
        });
      });
    };
    submitStaff();
    submitSatffDetails();
    submitGuestFaculty();
    submitStuCourseEnrolled();
    submitStuCatEnrolled();
    submitProgDetails();
  };

  const finalsubmit = async () => {
    const formsData = new FormData();
    formsData.append("ssrID", ssrID);
    formsData.append("collegeId", collegeData.collegId);
    const response = await config.ssrAPIRequest(
      "PUT",
      "academic-ssr",
      formsData
    );
    if (response === "Already Exists" || response === "Saved Successfully") {
      setSelectedMenu("Extended Profile & QIF");
      if (response) {
        config.notify("Saved", "success");
        router.push("extended-profile-and-qif");
      }
    }
  };

  const handleAddRow = async (setState, state) => {
    let newCollege;
    if (state === "collegeList") {
      newCollege = {
        type: "",
        permanent: "",
        temprory: "",
      };
    } else {
      newCollege = {
        SNO: "",
        Dept: "",
        Chairs: "",
        Sponsor: "",
      };
    }
    setState((prevList) => [...prevList, newCollege]);
  };

  const handleAddCollege = (e, index, state, setState) => {
    const { name, value } = e.target;
    console.log(state, setState);
    const updatedCollegeList = [...state];
    if ((name === "permanent" || name === "temprory") && value === "") {
      updatedCollegeList[index] = {
        ...updatedCollegeList[index],
        [name]: "",
      };
      setState(updatedCollegeList);
    }
    if (name !== "type" && state === "collegeList" && !/^[0-9]+$/.test(value)) {
      return;
    }
    updatedCollegeList[index] = {
      ...updatedCollegeList[index],
      [name]: value,
    };
    console.log(updatedCollegeList);
    setState(updatedCollegeList);
  };

  console.log(chairs);

  return (
    <>
      <div className="p-2 items-center justify-center">
        <h1 className="bg-[#337ab7] p-2 border border-cyan-700 rounded-b-none rounded-lg text-white">
          Academic Information
        </h1>
        <div className="border border-[#337ab7] rounded-b-lg card">
          <div className="p-3 pt-2 rounded-lg bg-white">
            <div className="horizontalScroll overflow-hidden">
              <div className="horizontal-scrolling">
                Note: This form will automaticaly colsed after 30 min
              </div>
            </div>

            {/* Institutions affiliated to the University (Not applicable for private and deemed to be Universities) */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Institutions affiliated to the University
                <b
                  className="text-blue-600 cursor-pointer ml-2"
                  title="(Not applicable for private and deemed to be
                    Universities)"
                >
                  ?
                </b>
              </h3>
              <div className="container p-3">
                <table className="w-full">
                  <thead>
                    <tr className="border border-black">
                      <th className="border-r border-black p-1">
                        Type of Colleges
                      </th>
                      <th className="border-r border-black p-1">Permanent</th>
                      <th className="border-r border-black p-1">Temporary</th>
                      <th className="border-r border-black p-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeList.map((ele, i) => {
                      return (
                        <tr key={i} className="border border-black">
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.type}
                              name="type"
                              onChange={(e) =>
                                handleAddCollege(
                                  e,
                                  i,
                                  collegeList,
                                  setCollegeList
                                )
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.permanent}
                              name="permanent"
                              onChange={(e) =>
                                handleAddCollege(
                                  e,
                                  i,
                                  collegeList,
                                  setCollegeList
                                )
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.temprory}
                              name="temprory"
                              onChange={(e) =>
                                handleAddCollege(
                                  e,
                                  i,
                                  collegeList,
                                  setCollegeList
                                )
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={
                                (parseFloat(ele.permanent) || 0) +
                                (parseFloat(ele.temprory) || 0)
                              }
                              onChange={handleAddCollege}
                              disabled
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="w-full flex justify-end">
                  <button
                    className="border px-4 rounded-md bg-blue-400 mt-2"
                    onClick={() => handleAddRow(setCollegeList, "collegeList")}
                  >
                    Add Row
                  </button>
                </div>
              </div>
            </div>

            {/* Furnish the Details of Number of Colleges under the University */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Institutions affiliated to the University
                <b
                  className="text-blue-600 cursor-pointer ml-2"
                  title="(Not applicable for private and deemed to be
                    Universities)"
                >
                  ?
                </b>
              </h3>
              <div className="container p-3">
                <table className="w-full">
                  <thead>
                    <tr className="w-full flex border border-black">
                      <th className="w-4/5 text-left border-r border-black ml-1">
                        Type of College
                      </th>
                      <th className="w-1/5 p-1">Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeUnderUnieristy.map((ele, i) => {
                      return (
                        <tr
                          key={i}
                          className="w-full flex border border-t-0 border-black"
                        >
                          <td className="w-4/5 border-r border-black ml-1">
                            {ele}
                          </td>
                          <td className="w-1/5 p-1">
                            <input
                              type="text"
                              className="w-full border border-black"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Does the University Offer any Programmes Recognized by any other Statutory Regulatory authority (SRA) */}
            <div className="flex border rounded-lg mb-4">
              <div className="w-3/5 p-3 ml-1">
                Does the University Offer any Programmes Recognized by any other
                Statutory Regulatory authority (SRA)
              </div>
              <div className="justify-center flex w-2/5 items-center">
                <div className="box-content w-1/3">
                  <label className="mr-2">Yes</label>
                  <input
                    name="ownsCampus"
                    type="radio"
                    value="YES"
                    // checked={formData.ownsCampus === "YES"}
                    // onChange={handleInputChange}
                  />
                </div>
                <div className="box-content w-1/3">
                  <label className="mr-2">No</label>
                  <input
                    name="ownsCampus"
                    type="radio"
                    value="NO"
                    // checked={formData.ownsCampus === "NO"}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Details of the Number of Teaching & Non-Teaching Staff in the University */}
            <Form1
              formData={formData.teachingStaff}
              setFormData={setFormData}
            />

            {/* Qualification Details of the Teaching Staff */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Qualifications of the Teaching Staff
                <b
                  className="text-blue-600 cursor-pointer ml-2"
                  title="(Consider highest qualification only for each teacher. Do not recount for other qualifications.)"
                >
                  ?
                </b>
              </h3>
              <div className="container p-3">
                {/* Permanent Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"PERMANENT_TEACHER"}
                  type={"PERMANENT TEACHER"}
                />
                <br />

                {/* Temporary Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"TEMPORARY_TEACHER"}
                  type={"TEMPORARY TEACHER"}
                />
                <br />

                {/* Part Time Teachers */}
                <QualificationTable
                  formData={formData.qualification}
                  setFormData={setFormData}
                  category={"PART_TIME_TEACHER"}
                  type={"PART-TIME TEACHER"}
                />
              </div>
            </div>

            {/* Distinguished Academicians Appointed */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Distinguished Academicians Appointed
              </h3>
              <div className="container p-3">
                <table className="w-full rounded-lg w-">
                  <thead>
                    <tr className="border border-black relative">
                      <th className="border border-black w-2/6"></th>
                      <th className="border border-black w-1/6 pl-1">Male</th>
                      <th className="border border-black w-1/6 pl-1">Female</th>
                      <th className="border border-black w-1/6 pl-1">Others</th>
                      <th className="border border-black w-1/6 pl-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-black">
                      <td className="border border-black w-2/6 p-1">
                        Emeritus Professor
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <td className="border border-black w-2/6 p-1">
                        Adjunct Professor
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <td className="border border-black w-2/6 p-1">
                        Visiting Professor
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                      <td className="border border-black w-1/6 p-1">
                        <input
                          type="text"
                          className="border border-black w-full"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chairs Instituted by the University */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Chairs Instituted by the University
                <b
                  className="text-blue-600 cursor-pointer ml-2"
                  title="(Not applicable for private and deemed to be
                    Universities)"
                >
                  ?
                </b>
              </h3>
              <div className="container p-3">
                <table className="w-full">
                  <thead>
                    <tr className="border border-black">
                      <th className="border-r border-black p-1">Sl.No</th>
                      <th className="border-r border-black p-1">
                        Name of the Department
                      </th>
                      <th className="border-r border-black p-1">
                        Name of the Chair
                      </th>
                      <th className="border-r border-black p-1">
                        Name of the Sponsor Organisation/Agency
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chairs.map((ele, i) => {
                      return (
                        <tr key={i} className="border border-black">
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.SNo}
                              name="SNO"
                              onChange={(e) =>
                                handleAddCollege(e, i, chairs, setChairs)
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.Dept}
                              name="Dept"
                              onChange={(e) =>
                                handleAddCollege(e, i, chairs, setChairs)
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              value={ele.Chairs}
                              name="Chairs"
                              onChange={(e) =>
                                handleAddCollege(e, i, chairs, setChairs)
                              }
                            />
                          </td>
                          <td className="border-r border-black p-1">
                            <input
                              type="text"
                              className="border border-black w-[100%] p-1"
                              name={"Sponsor"}
                              value={ele.Sponsor}
                              onChange={(e) =>
                                handleAddCollege(e, i, chairs, setChairs)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="w-full flex justify-end">
                  <button
                    className="border px-4 rounded-md bg-blue-400 mt-2"
                    onClick={() => handleAddRow(setChairs, "chairs")}
                  >
                    Add Row
                  </button>
                </div>
              </div>
            </div>

            {/* Provide the Following Details of Students Enrolled in the University during the Current Academic Year */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Provide the Following Details of Students Enrolled in the
                University during the Current Academic Year
              </h3>
              <div className="container p-3">
                <table className="w-full rounded-lg">
                  <tbody>
                    <tr className="border border-black relative">
                      <td className="w-1/4 border-black border-r p-2">
                        Programme
                      </td>
                      <td className="flex p-0">
                        <div className="w-4/5 p-0">
                          <ul className="flex w-full">
                            <li className="w-1/4 border-black border-r p-1">
                              From the State Where University is Located
                            </li>
                            <li className="w-1/4 border-black border-r p-1">
                              From the Other States of India
                            </li>
                            <li className="w-1/4 border-black border-r p-1">
                              NRI Students
                            </li>
                            <li className="w-1/4 border-black border-r p-1">
                              Foreign Students
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/5">
                          <div className=" border-black p-1">Total</div>
                        </div>
                      </td>
                    </tr>
                    <StudentEnrolled
                      type={"UG"}
                      formdata={formData.studentCourseEnrolled}
                      setFormData={setFormData}
                      total={true}
                    />
                    <StudentEnrolled
                      type={"PG"}
                      formdata={formData.studentCourseEnrolled}
                      setFormData={setFormData}
                      total={true}
                    />
                    <StudentEnrolled
                      title="PG Diploma recognized by statutory authority"
                      type={"Diploma"}
                      formdata={formData.studentCourseEnrolled}
                      setFormData={setFormData}
                      total={true}
                    />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Does the university offer any integrated programmes? */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Does the university offer any integrated programmes ?
              </h3>
              <div className="container p-3">
                <div className="flex border border-black">
                  <div className="w-4/5 ml-1 p-1">
                    Does the university offer any integrated programmes?
                  </div>
                  <div className="justify-center flex w-1/5 items-center">
                    <div className="box-content w-1/3">
                      <label className="mr-2">Yes</label>
                      <input
                        name="state"
                        type="radio"
                        value={"YES"}
                        checked={integratedProg.state === "YES"}
                        onChange={(e) =>
                          handleInputChange(e, setIntegratedProg)
                        }
                      />
                    </div>
                    <div className="box-content w-1/3">
                      <label className="mr-2">No</label>
                      <input
                        name="state"
                        type="radio"
                        value={"NO"}
                        checked={integratedProg.state === "NO"}
                        onChange={(e) =>
                          handleInputChange(e, setIntegratedProg)
                        }
                      />
                    </div>
                  </div>
                </div>
                {integratedProg.state === "YES" && (
                  <>
                    <div className="flex border border-t-0 border-black">
                      <div className="w-4/5 ml-1 p-1">
                        Total number of integrated programmes
                      </div>
                      <div className="justify-center flex w-1/5 items-center">
                        <input className="border border-black" />
                      </div>
                    </div>

                    <div className="flex mt-2 border-black">
                      <table className="w-full rounded-lg">
                        <thead>
                          <tr className="border border-black relative">
                            <th className="w-1/6 border-black border-r p-2">
                              Programme
                            </th>
                            <th className="w-1/6 border-black border-r p-1">
                              From the State Where University is Located
                            </th>
                            <th className="w-1/6 border-black border-r p-1">
                              From the Other States of India
                            </th>
                            <th className="w-1/6 border-black border-r p-1">
                              NRI Students
                            </th>
                            <th className="w-1/6 border-black border-r p-1">
                              Foreign Students
                            </th>
                            <th className="w-1/6">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border border-black relative">
                            <td className="w-1/6 border-black border-r p-2">
                              Male
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                          </tr>
                          <tr className="border border-black relative">
                            <td className="w-1/6 border-black border-r p-2">
                              Female
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                          </tr>
                          <tr className="border border-black relative">
                            <td className="w-1/6 border-black border-r p-2">
                              Others
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 border-black border-r p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                            <td className="w-1/6 p-1">
                              <input
                                type="text"
                                className="w-full p-1 border border-black"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Details of programmes under the UGC Human Resource Development Centre, If applicable */}
            <div className="border rounded-lg mb-4">
              <h3 className="border-slate-200 bg-gray-200 rounded-lg rounded-b-none text-black font-semibold p-3">
                Details of programmes under the UGC Human Resource Development
                Centre, If applicable
              </h3>
              <div className="container p-3">
                <div className="flex border border-black">
                  <div className="w-4/5 ml-1 p-1">Year of Establishment</div>
                  <div className="justify-center flex w-1/5 items-center">
                    <input className="border border-black" />
                  </div>
                </div>
                <div className="flex border border-t-0 border-black">
                  <div className="w-4/5 ml-1 p-1">
                    Number of UGC Orientation Programmes
                  </div>
                  <div className="justify-center flex w-1/5 items-center">
                    <input className="border border-black" />
                  </div>
                </div>
                <div className="flex border border-t-0 border-black">
                  <div className="w-4/5 ml-1 p-1">
                    Number of UGC Refresher Course
                  </div>
                  <div className="justify-center flex w-1/5 items-center">
                    <input className="border border-black" />
                  </div>
                </div>
                <div className="flex border border-t-0 border-black">
                  <div className="w-4/5 ml-1 p-1">
                    Number of University's own Programmes
                  </div>
                  <div className="justify-center flex w-1/5 items-center">
                    <input className="border border-black" />
                  </div>
                </div>
                <div className="flex border border-t-0 border-black">
                  <div className="w-4/5 ml-1 p-1">
                    Total Number of Programmes Conducted (during the last five
                    years)
                  </div>
                  <div className="justify-center flex w-1/5 items-center">
                    <input className="border border-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* EVALUATIVE REPORT OF THE DEPARTMENTS */}
            <div className=""></div>
          </div>
        </div>
        {finalsubmitState && (
          <SubmitModal
            setFinalSubmitState={setFinalSubmitState}
            finalsubmit={finalsubmit}
          />
        )}
      </div>
    </>
  );
};
export default AcademicInformation;
