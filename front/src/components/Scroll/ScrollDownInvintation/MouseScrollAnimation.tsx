// @ts-ignore
import s from "./MouseScrollAnimation.module.scss"
import {JSX} from "react";
// @ts-ignore
import cn from "clsx";
interface MouseScrollAnimationprops{
    color? : string;
}
export default function MouseScrollAnimation({color}:MouseScrollAnimationprops):JSX.Element {
    return (
        <div className={s.mouseScroll} style={{ "--mouse-color": color } as React.CSSProperties}>
            <div className={s.mouse}>
                <div className={s.wheel}></div>
            </div>
            <span className={cn(s.mScrollArrows , s.one)}/>
            <span className={cn(s.mScrollArrows , s.two)}/>
            <span className={cn(s.mScrollArrows , s.three)}/>
        </div>
    )
}