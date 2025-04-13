// @ts-ignore
import  React, {useRef, useState, useEffect} from "react";
// @ts-ignore
import {useLenis} from "lenis/react";
// @ts-ignore
import {useWindowSize} from "react-use";
import MouseScrollAnimation from "../ScrollDownInvintation/MouseScrollAnimation";
// @ts-ignore
import cn from "clsx";
// @ts-ignore
import s from "./Zoom.module.scss";




interface ZoomTextProps {
    title1: string;
    title2: string;
    text: string;
}

export default function ZoomText({title1, text, title2}: ZoomTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const {height: windowHeight} = useWindowSize();

    const [scrollValue, setScrollValue] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    function clamp(min, input, max) {
        return Math.max(min, Math.min(input, max));
    }

    function mapRange(in_min, in_max, input, out_min, out_max) {
        return (
            ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    }

    useLenis(({scroll}) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const scrollHeight = containerRef.current.clientHeight;
            const start = rect.top + windowHeight * 0.5;
            const end = rect.top + scrollHeight - windowHeight;

            const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
            const center = 0.6;
            const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
            const progress2 = clamp(
                0,
                mapRange(center - 0.055, 1, progress, 0, 1),
                1
            );
            // @ts-ignore
            containerRef.current.style.setProperty("--progress1", progress1);
            // @ts-ignore
            containerRef.current.style.setProperty("--progress2", progress2);
            const maxScrollInside = scrollHeight - window.innerHeight;
            if (rect.top < 0 && rect.bottom > 0) {
                const normalizedScroll = Math.max(
                    0,
                    Math.min(-rect.top / maxScrollInside, 1)
                );
                setScrollValue(normalizedScroll);
            }
        }
    });

    useEffect(() => {
        if (scrollContainerRef.current && containerRef.current) {
            const widthDiff = scrollContainerRef.current.scrollWidth - containerRef.current.clientWidth;
            setMaxScroll(widthDiff);
        }

    }, []);

    return (
        <section ref={containerRef} className={s.solution}>
            <div className={s.inner} ref={scrollContainerRef}>
                <div className={s.zoom}>
                    <div className={cn(s.first, "h1 vh")}>
                        <h1 className={cn(s.contrast, "h1")}>{title1}</h1>
                        <h2>{title2}</h2>
                    </div>
                    <h2 className={cn(s.center ,s.contrast, "h3 vh")}>
                        {" "}
                        {text.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br/>
                            </React.Fragment>
                        ))}
                    </h2>
                    <div className={s.second}>
                        <MouseScrollAnimation color={"#ff06b5"} />
                        <h2 className={cn(s.contrast , "h1 vh")}>Scroll Down</h2>
                    </div>

                </div>
            </div>
        </section>
    );
}
