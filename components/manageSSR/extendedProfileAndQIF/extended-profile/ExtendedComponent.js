import React from "react";
import FormsSSR from "./Forms/FormsSSR";
import DocumentTemplate from "./Forms/documentTemplate";

const ExtendedComponent = ({
  title,
  index,
  formData,
  setFormData,
  field,
  doc,
  extendedID,
}) => {
  return (
    <div>
      <FormsSSR
        title={title}
        formData={formData}
        setFormData={setFormData}
        field={field}
      />
      {doc && (
        <DocumentTemplate
          formData={formData}
          setFormData={setFormData}
          field={field}
          doc={doc}
          extendedID={extendedID}
          index={index}
        />
      )}
    </div>
  );
};

export default ExtendedComponent;
