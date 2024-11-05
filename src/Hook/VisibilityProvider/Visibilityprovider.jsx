import { createContext, useContext, useState } from 'react';

const VisibilityContext = createContext({ visibleProjects: [], setVisibleProjects:()=>{} });

export const VisibilityProvider = ({ children }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);

  return (
    <VisibilityContext.Provider value={{ visibleProjects, setVisibleProjects }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  return useContext(VisibilityContext);
}