import s from "./Burger.module.scss"
import {JSX, useState} from "react";
import {motion, Transition, SVGMotionProps} from "framer-motion";
import {  NavLink } from 'react-router-dom'
import links from "../../../const/_const.ts"
import linksItems from "../../LinksItems/LinksItems.jsx"
import LinksItems from '../../LinksItems/LinksItems'
// @ts-ignore
interface BurgerMenusProps extends SVGMotionProps {
    color?: string;
    strokeWidth?: string | number;
    transition?: Transition;
    lineProps?: any;
}

export default function BurgerMenus(
    {
        color = "#FFC300",
        strokeWidth = 1,
        transition = null,
        lineProps = null,
        width = 24,
        height = 24,
        ...props
    }: BurgerMenusProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleMenu = () => setIsOpen(prev => !prev);
    const variant = isOpen ? 'opened' : 'closed';
    const simpleLinks = Object.entries(links)
      .filter(([key, value]) => typeof value === "string")
      .map(([name, to]) => ({ name, to }));
    const top = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: 45,
            translateY: 2
        }
    };
    const center = {
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };
    const bottom = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: -45,
            translateY: -2
        }
    };
    lineProps = {
        stroke: color,
        strokeWidth: strokeWidth as number,
        transition,
        vectorEffect: "non-scaling-stroke",
        initial: closed,
        animate: variant,
        ...lineProps,
    }
    const unitHeight = 4;
    const unitWidth = (unitHeight * (width as number)) / (unitHeight * (height as number));
    if(isOpen){
        console.log("open")
    }
    return (
      <>
          <motion.svg
            className={s.burgerSvg}
            viewBox={`0 0 ${unitWidth} ${unitHeight}`}
            overflow="visible"
            preserveAspectRatio="none"
            width={width}
            height={height}
            onClick={toggleMenu}
            {...props}
          >
              <motion.line
                x1="0"
                x2={unitWidth}
                y1="0"
                y2="0"
                variants={top}
                animate={variant}
                {...lineProps}
              />
              <motion.line
                x1="0"
                x2={unitWidth}
                y1="2"
                y2="2"
                variants={center}
                animate={variant}
                {...lineProps}
              />
              <motion.line
                x1="0"
                x2={unitWidth}
                y1="4"
                y2="4"
                variants={bottom}
                animate={variant}
                {...lineProps}
              />
          </motion.svg>
    {isOpen && (
      <div className={s.fullScreenMenu}>
          <nav>
              <ul>
                  {simpleLinks.map((link) => (
                    <li key={link.to}>
                        <LinksItems to={link.to} key={link.name} label={link.name} />
                    </li>
                  ))}
              </ul>
          </nav>
      </div>
    )}</>
        )
}