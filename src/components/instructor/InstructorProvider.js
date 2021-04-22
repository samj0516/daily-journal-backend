import React, { useState } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const InstructorContext = React.createContext();

/*
 This component establishes what data can be used.
 */
export const InstructorProvider = props => {
  const [instructors, setInstructors] = useState([]);

  const getInstructors = () => {
    return fetch("http://localhost:8088/instructors")
      .then(res => res.json())
      .then(setInstructors);
  };
  return (
    <InstructorContext.Provider
      value={{
        instructors,
        getInstructors
      }}
    >
      {props.children}
    </InstructorContext.Provider>
  );
};
