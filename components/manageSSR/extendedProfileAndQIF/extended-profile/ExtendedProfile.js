"use client";
import React, { useEffect, useState } from "react";
import { config } from "apiCalls/Configuration";
import { contextManager } from "context/store";
import ExtendedComponent from "./ExtendedComponent";

const ExtendedProfile = ({ setActiveButton }) => {
  const { collegeData, ssrID } = contextManager();
  const [formData, setFormData] = useState({
    programCourseYear: createYearlyData(),
    programYear: createYearlyData(),
    studentYear: createYearlyData(),
    stuAppearedYear: createYearlyData(),
    stuRevalApplicationsYear: createYearlyData(),
    stuOutgoingYear: createYearlyData(),
    acadCoursesInAllProgsYear: createYearlyData(),
    acadFullTimeTeachYear: createYearlyData(),
    acadSanctionedPostsYear: createYearlyData(),
    addmAppliReceviedYear: createYearlyData(),
    addmReservedSeatsYear: createYearlyData(),
    addmNumOfComputer: 0,
    expenditureWithoutSalaryYear: createYearlyData(),
    addmNumOfClassrooms: 0,
    addmNumOfSeminarHall: 0,
    extendedProfileSSRId: "",
  });

  function createYearlyData() {
    return {
      year1: "",
      year2: "",
      year3: "",
      year4: "",
      year5: "",
    };
  }

  useEffect(() => {
    config.cookieAssign();
    async function fetchExtendedData() {
      const response = await config.ssrAPIRequest(
        "GET",
        `extended-ssr/${collegeData.collegId}`
      );

      const keysToRemove = [
        "addmNumOfClassrooms",
        "addmNumOfSeminarHall",
        "addmNumOfComputer",
        "extendedProfileSSRId",
      ];
      const updatedMappings = Object.keys(formData).filter(
        (key) => !keysToRemove.includes(key)
      );
      const mappings = updatedMappings.map((key) => key.replace("Year", ""));

      const updatedFormData = { ...formData };
      mappings.forEach((ele) => {
        for (let i = 1; i <= 5; i++) {
          const responseKey = `${ele}Year${i}`;
          updatedFormData[`${ele}Year`][`year${i}`] =
            response[responseKey] === 0 ? "" : response[responseKey];
          if (ele !== "program") {
            updatedFormData[`${ele}Year`][`${ele}InstDataDoc`] =
              response[`${ele}InstDataDoc`];
          }
        }
      });

      Object.assign(updatedFormData, {
        addmNumOfClassrooms: response.addmNumOfClassrooms
          ? response.addmNumOfClassrooms
          : "",
        addmNumOfSeminarHall: response.addmNumOfSeminarHall
          ? response.addmNumOfSeminarHall
          : "",
        addmNumOfComputer: response.addmNumOfComputer
          ? response.addmNumOfComputer
          : "",
        extendedProfileSSRId: response.extendedProfileSSRId,
      });

      setFormData(updatedFormData);
    }

    fetchExtendedData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setFormData((prevFormdata) => ({
        ...prevFormdata,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevFormdata) => ({
        ...prevFormdata,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const formKeys = [
      "programCourseYear",
      "programYear",
      "studentYear",
      "stuAppearedYear",
      "stuRevalApplicationsYear",
      "stuOutgoingYear",
      "acadCoursesInAllProgsYear",
      "acadFullTimeTeachYear",
      "acadSanctionedPostsYear",
      "addmAppliReceviedYear",
      "addmReservedSeatsYear",
      "expenditureWithoutSalaryYear",
    ];

    const formsData = new FormData();
    formsData.append("collegeId", collegeData.collegId);
    formsData.append("ssrID", ssrID);
    formsData.append(
      "addmNumOfClassrooms",
      formData.addmNumOfClassrooms ? formData.addmNumOfClassrooms : 0
    );
    formsData.append(
      "addmNumOfComputer",
      formData.addmNumOfComputer ? formData.addmNumOfComputer : 0
    );
    formsData.append(
      "addmNumOfSeminarHall",
      formData.addmNumOfSeminarHall ? formData.addmNumOfSeminarHall : 0
    );
    formKeys.map((ele) => {
      for (let i = 1; i < 6; i++) {
        formsData.append(ele + i, formData[ele]["year" + i]);
      }
    });

    const response = await config.ssrAPIRequest(
      "PUT",
      `extended-ssr/${formData.extendedProfileSSRId}`,
      formsData
    );

    if (response) {
      const isFormDataEmpty = (formData) => {
        for (const key in formData) {
          // Check if the property is not a nested object
          if (typeof formData[key] !== "object") {
            // Check if the property is empty
            if (
              formData[key] === null ||
              formData[key] === undefined ||
              formData[key] === "" ||
              formData[key] === 0
            ) {
              return true; // Field is empty
            }
          } else {
            // Recursively check nested objects
            if (isFormDataEmpty(formData[key])) {
              return true; // Field is empty
            }
          }
        }
        return false; // No empty fields found
      };
      // Example usage
      const isEmpty = isFormDataEmpty(formData);

      if (isEmpty) {
        config.notify("Some field is empty", "success");
      } else {
        const formsData = new FormData();
        formsData.append("collegeID", collegeData.collegId);
        formsData.append("ssrID", ssrID);
        const response = await config.ssrAPIRequest(
          "PUT",
          "qif/new-qif",
          formsData
        );
        if (
          response === "Already Exists" ||
          response === "Saved Successfully"
        ) {
          config.notify("Saved Successfully", "success");
          setActiveButton("QIF");
        } else {
          config.notify("Something went wrong, try again", "error");
        }
      }
    }
  };
  return (
    <>
      {/* Students */}
      <div className="p-2 ">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          1 . Students
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "1.1 . Number of students on rolls year-wise during the last five years"
              }
              index={"1.1"}
              formData={formData.programCourseYear}
              setFormData={setFormData}
              field={"programCourseYear"}
              upload={true}
              doc={[
                "programCourseInstDataDoc",
                `document-programInstructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "1.2 . Number of final year outgoing students year wise during last five years"
              }
              formData={formData.programYear}
              setFormData={setFormData}
              field={"programYear"}
              upload={true}
              doc={[
                "programCourseInstDataDoc",
                `document-programInstructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>

      {/* Academic Data */}
      <div className="p-2">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          2 . Academic Data
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.1 . Number of Full-time teachers in the institution year-wise during last five year"
              }
              index={"2.1"}
              formData={formData.studentYear}
              setFormData={setFormData}
              field={"studentYear"}
              upload={true}
              doc={["studentInstDataDoc", `document-studentInstructional`]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "2.2 . Total Number of full time teachers worked/working in the institution (without repeat count) during the last five years"
              }
              index={"2.2"}
              formData={formData.stuAppearedYear}
              setFormData={setFormData}
              field={"stuAppearedYear"}
              doc={[
                "stuAppearedInstDataDoc",
                `document-stuAppeared-instructional`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>

      {/* Expenditure */}
      <div className="p-2 ">
        <h1 className="bg-[#337ab7] p-2 border border-[#337ab7] rounded-b-none rounded-lg text-white">
          3 . Expenditure
        </h1>
        <ul className="border border-[#337ab7] p-3 rounded-b-lg bg-white">
          <li className="p-3 pt-2 border rounded-lg mb-4">
            <ExtendedComponent
              title={
                "3.1 . Total Expenditure excluding salary year wise during the last five years (INR in lakhs)"
              }
              index={"3.1"}
              formData={formData.acadCoursesInAllProgsYear}
              setFormData={setFormData}
              field={"acadCoursesInAllProgsYear"}
              doc={[
                "acadCoursesInAllProgsInstDataDoc",
                `acad-courses-in-all-progs-inst-data-doc`,
              ]}
              extendedID={formData.extendedProfileSSRId}
            />
          </li>
        </ul>
      </div>

      <div className="flex justify-end pr-2 pb-2">
        <button
          className="px-3 py-1 bg-blue-600 rounded-lg"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ExtendedProfile;
