import React from "react";

function FormsSSR({ title, formData, setFormData, field }) {
  const currentYear = new Date().getFullYear();
  function extractLastTwoDigits(year) {
    // Convert the year to a string, then use substring to get the last two characters.
    return year.toString().slice(-2);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: {
        ...prevFormData[field],
        [name]: isNaN(numericValue) ? 0 : numericValue,
      },
    }));
  };

  return (
    <div className="flex w-full ">
      <div className="w-3/5">{title}</div>
      <div className="w-2/5 flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex flex-col w-1/5 p-2 pt-0">
            <label>
              {currentYear - index}-
              {extractLastTwoDigits(currentYear - index - 1)}
            </label>
            <input
              className="border border-black pl-1"
              type="text"
              name={`year${index}`}
              value={formData[`year${index}`] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormsSSR;
