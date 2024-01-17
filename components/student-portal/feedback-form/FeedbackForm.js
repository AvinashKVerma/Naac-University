import React from "react";
import { sectionA, sectionB } from "../../assets/feedbackformQs";
import "./fedbacckForm.css";

const FeedbackForm = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container">
      <h3 className="text-center font-bold text-2xl">STUDENTS FEEDBACK FORM</h3>
      <h3 className="text-center font-bold text-2xl text-red-600">
        RANCHI UNIVERSITY, RANCHI
      </h3>
      <br />
      <div className="text-center">
        This questionnaire is intended to collect information relating to your
        satisfaction towards faculty, teaching, learning & evaluation. The
        information provided by you will be kept confidential and will be used
        as important feedback for quality improvement of the program of
        studies/institution.
      </div>
      <div className="text-center">
        <h5 className="font-bold">Directions:</h5>For each item please indicate
        your level of satisfaction with the following statement by choosing a
        correct score between 1 and 5 and put the score in the box against each
        statement.
      </div>
      <div className="flex items-center">
        <div className="text-center">
          (1-Strongly disagree, 2-Disagree, 3-Neither agree nor disagree, 4-
          Agree, 5-Strongly agree).
        </div>
        <div className="flexboxes">
          <div>
            <label>Semester</label>
            <select className="formfield">
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
            </select>
          </div>

          <div>
            <label>Session</label>
            <input
              type="text"
              value={`${currentYear}-${(currentYear - 1).toString().slice(-2)}`}
              className="formfield"
              disabled
            />
          </div>
          <div>
            <label>Department</label>
            <input type="text" className="formfield" />
          </div>
        </div>
      </div>
      <div>
        <table className="tablesec">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Particular</th>
              <th>Teacher's Name</th>
            </tr>
            <tr>
              <th></th>
              <th>Section - A</th>
              <th>
                <div className="flexboxes">
                  <div>
                    <input className="formfield" type="text" />
                  </div>
                  <div>
                    <input className="formfield" type="text" />
                  </div>
                  <div>
                    <input className="formfield" type="text" />
                  </div>
                  <div>
                    <input className="formfield" type="text" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sectionA.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}.</td>
                  <td>{ele}</td>
                  <td>
                    <div className="flexboxes">
                      {[1, 2, 3, 4].map((elem, index) => {
                        return (
                          <div>
                            <select className="formfield" key={index}>
                              {[1, 2, 3, 4, 5].map((elemt, i) => {
                                return <option value={elemt}>{elemt}</option>;
                              })}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>
                <h1 className="text-xl">Section B</h1>
              </td>
            </tr>
            {sectionB.map((ele, i) => {
              return (
                <tr key={i}>
                  <td>{i + 16}.</td>
                  <td>{ele}</td>
                  <td>
                    <div className="flexboxes">
                      {[1, 2, 3, 4].map((elem, index) => {
                        return (
                          <div>
                            <select className="formfield" key={index}>
                              {[1, 2, 3, 4, 5].map((elemt, i) => {
                                return <option value={elemt}>{elemt}</option>;
                              })}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackForm;
