import React from "react";

const FeedbackForm = () => {
  return (
    <div>
      <h3 className="text-center font-bold text-2xl">STUDENTS FEEDBACK FORM</h3>
      <h3 className="text-center font-bold text-2xl text-red-600">
        RANCHI UNIVERSITY, RANCHI
      </h3>
      <br />
      <div className="text-center px-8">
        This questionnaire is intended to collect information relating to your
        satisfaction towards faculty, teaching, learning & evaluation. The
        information provided by you will be kept confidential and will be used
        as important feedback for quality improvement of the program of
        studies/institution.
      </div>
      <div className="text-center px-8">
        <h5 className="font-bold">Directions:</h5>For each item please indicate
        your level of satisfaction with the following statement by choosing a
        correct score between 1 and 5 and put the score in the box against each
        statement.
      </div>
      <div className="text-center px-8">
        (1-Strongly disagree, 2-Disagree, 3-Neither agree nor disagree, 4-
        Agree, 5-Strongly agree).
      </div>
    </div>
  );
};

export default FeedbackForm;
