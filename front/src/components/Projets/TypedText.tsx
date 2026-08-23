import { useState, useEffect, useRef } from "react";
import { Typed } from "react-typed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngular,
  faJava,
  faJs,
  faPython,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
const iconMap: { [key: string]: any } = {
  react: faReact,
  "react native": faReact,
  java: faJava,
  python: faPython,
  javascript: faJs,
  sass: faSass,
  angular: faAngular,
};

interface TypedTextProps {
  mainTitle: string;
  input?: string[];
  project?: { techno: { name: string; icon: any }[] };
  shouldLoop?: boolean;
}

export default function TypedText({
                                    mainTitle,
                                    input,
                                    project,
                                    shouldLoop = true,
                                  }: TypedTextProps) {
  const typedElement = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<any>(null);
  const [currentIcon, setCurrentIcon] = useState<any>(null);
  const techNames = project
    ? project.techno.map((tech) => tech.name)
    : input || [];
  if (techNames.length <= 1) {
    shouldLoop = false;
  }
  useEffect(() => {
    if (typedElement.current && techNames.length > 0) {
      const options = {
        strings: techNames,
        typeSpeed: 75,
        backSpeed: 125,
        loop: shouldLoop,
        backDelay: 200,
        preStringTyped: (index: number) => {
          const tech = project?.techno[index % techNames.length];
          setCurrentIcon(getTechIcon(tech?.name));
        },
      };
      typedInstance.current = new Typed(typedElement.current, options);
      return () => {
        typedInstance.current.destroy();
      };
    }
  }, []);
  function getTechIcon(techName: string) {
    const normalized = techName.toLowerCase().trim();
    return iconMap[normalized] || null;
  }

  return (
    <p>
      {mainTitle}{" "}
      <span ref={typedElement} style={{ fontWeight: "bold" }}></span>
      {currentIcon && (
        <FontAwesomeIcon
          icon={currentIcon}
          style={{ marginRight: "5px", fontSize: "150%" }}
        />
      )}
    </p>
  );
}
