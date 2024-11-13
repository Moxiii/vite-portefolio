import { createContext, useContext, useState , useRef , useEffect } from 'react';


const VisibilityContext = createContext({
  visibleProjects: [],
  setVisibleProjects:()=>{} ,
  projectRefs:null,
});

export const VisibilityProvider = ({ children }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectRefs = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = entry.target.dataset.id;
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => {
              if (!prev.includes(projectId)) {
                console.log(`Projet visible : ${projectId}`);
                return [...prev, projectId];
              }
              return prev;
            });
          } else {
            setVisibleProjects((prev) => prev.filter((id) => id !== projectId));
          }
        });
      },
      { threshold: 0.5 }
    );
    projectRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      projectRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <VisibilityContext.Provider value={{ visibleProjects, setVisibleProjects , projectRefs}}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => {
  return useContext(VisibilityContext);
}