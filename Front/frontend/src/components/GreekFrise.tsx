// // GreekFrise.jsx
// import friseImg from "../assets/frise-grecque-classique-removebg-preview.png";

// const GreekFrise = ({
//   position = "top",   // "top" | "bottom"
//   height = 40,        // px
//   opacity = 1,
//   tileWidth,          // px (optionnel, force la largeur du motif)
//   z = 50,
//   className = "",
// }) => {
//   const style = {
//     position: "fixed",
//     left: 0,
//     right: 0,
//     [position]: 0, // top:0 ou bottom:0
//     height,
//     opacity,
//     backgroundImage: `url(${friseImg})`,
//     backgroundRepeat: "repeat-x",
//     backgroundSize: tileWidth ? `${tileWidth}px 100%` : "auto 100%",
//     backgroundPosition: "center",
//     pointerEvents: "none",
//     zIndex: z,
//   };

//   return <div style={style} className={className} aria-hidden />;
// };

// export default GreekFrise;


import { useEffect, useMemo, useState } from "react";
import friseImg from "../assets/frise-grecque-classique-removebg-preview.png";

type GreekFriseProps = {
  position?: "top" | "bottom";
  height?: number;
  opacity?: number;
  tileWidth?: number;          // ✅ optionnel
  tilesPerViewport?: number;   // ✅ optionnel
  z?: number;
  className?: string;
};

const GreekFrise: React.FC<GreekFriseProps> = ({
  position = "top",
  height = 80,
  opacity = 1,
  tileWidth,
  tilesPerViewport,
  z = 50,
  className = "",
}) => {
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const computedTileWidth = useMemo(() => {
    if (typeof tileWidth === "number" && tileWidth > 0) return tileWidth;
    if (typeof tilesPerViewport === "number" && tilesPerViewport > 0) {
      return vw / tilesPerViewport;
    }
    return undefined;
  }, [tileWidth, tilesPerViewport, vw]);

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    [position!]: 0,
    height,
    opacity,
    backgroundImage: `url(${friseImg})`,
    backgroundRepeat: "repeat-x",
    backgroundSize: computedTileWidth
      ? `${computedTileWidth}px ${height}px`
      : `auto ${height}px`,
    backgroundPosition: position === "top" ? "top center" : "bottom center",
    pointerEvents: "none",
    zIndex: z,
    imageRendering: "auto",
  };

  return <div style={style} className={className} aria-hidden />;
};

export default GreekFrise;
