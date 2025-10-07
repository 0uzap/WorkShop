// GreekFrise.jsx
import friseImg from "../assets/frise-grecque-classique-removebg-preview.png";

const GreekFrise = ({
  position = "top",   // "top" | "bottom"
  height = 40,        // px
  opacity = 1,
  tileWidth,          // px (optionnel, force la largeur du motif)
  z = 50,
  className = "",
}) => {
  const style = {
    position: "fixed",
    left: 0,
    right: 0,
    [position]: 0, // top:0 ou bottom:0
    height,
    opacity,
    backgroundImage: `url(${friseImg})`,
    backgroundRepeat: "repeat-x",
    backgroundSize: tileWidth ? `${tileWidth}px 100%` : "auto 100%",
    backgroundPosition: "center",
    pointerEvents: "none",
    zIndex: z,
  };

  return <div style={style} className={className} aria-hidden />;
};

export default GreekFrise;
