"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/components/twitterCard copy";
import React, { useRef, useEffect } from "react";

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null);
  const refLeft = useRef<HTMLDivElement | null>(null);
  const refRight = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeableEle = ref.current;
    if (resizeableEle) {
      // Check if resizeableEle is not null
      const styles = window.getComputedStyle(resizeableEle);
      let width = parseInt(styles.width, 10);
      let height = parseInt(styles.height, 10);
      let x = 0;
      let y = 0;

      resizeableEle.style.top = "50px";
      resizeableEle.style.left = "50px";

      const onMouseMoveRightResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpRightResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };

      const onMouseDownRightResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        x = event.clientX;
        resizeableEle.style.left = styles.left;
        resizeableEle.style.right = ""; // Change null to an empty string
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };

      const onMouseMoveLeftResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;
        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpLeftResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
      };

      const onMouseDownLeftResize = (event: MouseEvent) => {
        // Specify MouseEvent type
        x = event.clientX;
        resizeableEle.style.right = styles.right;
        resizeableEle.style.left = "";
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };

      const resizerRight = refRight.current;
      if (resizerRight) {
        // Check if resizerRight is not null
        resizerRight.addEventListener("mousedown", onMouseDownRightResize);
      }
      const resizerLeft = refLeft.current;
      if (resizerLeft) {
        // Check if resizerLeft is not null
        resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
      }

      return () => {
        if (resizerRight) {
          // Check if resizerRight is not null
          resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
        }
        if (resizerLeft) {
          // Check if resizerLeft is not null
          resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
        }
      };
    }
  }, []);

  return (
    <main>
      <div className="container">
        <Card device="" left={refLeft} right={refRight} ref={ref}>
          <div ref={refLeft} className="resizer resizer-l"></div>
          <div>
            <h1>Hello</h1>
          </div>
          <div ref={refRight} className="resizer resizer-r"></div>
        </Card>
      </div>

      <Card device="" left="" right="">
        <div>
          <h1>Hello</h1>
        </div>
      </Card>
    </main>
  );
}
