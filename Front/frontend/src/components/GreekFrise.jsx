// components/GreekFrise.tsx
import friseImg from "../assets/frise-grecque-classique-removebg-preview.png";

const GreekFrise = ({ position = "top", opacity = 0.7, className = "" }) => {
  const Bar = (extra) => (
    <div className={`${extra} h-10 ${className} overflow-hidden`} style={{ opacity }}>
      <div className="flex" style={{ width: '100%' }}>
        <img 
          src={friseImg} 
          alt="Frise grecque" 
          className="h-full object-cover"
          style={{ width: 'auto', minWidth: '100%', objectFit: 'repeat' }}
        />
      </div>
    </div>
  );

  if (position === "both") {
    return (
      <>
        {Bar("absolute top-0 left-0 right-0")}
        {Bar("absolute bottom-0 left-0 right-0")}
      </>
    );
  }
  return Bar(`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0`);
};
export default GreekFrise;
