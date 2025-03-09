import { createContext, useContext, useState } from "react";

const StageContext = createContext();

export const StageProvider = ({ children }) => {
  const [stage, setStage] = useState(1); // Initial stage

  return (
    <StageContext.Provider value={{ stage, setStage }}>
      {children}
    </StageContext.Provider>
  );
};

export const useStage = () => useContext(StageContext);
