import "./Logo.css";
import logoppa from "../../assets/img/logo.svg";

export const Logo = () => {
  return (
    <div className="containerLogo">
      <img className="imgLogo" src={logoppa} alt="logo principal" />
      <p className="titlePixel">PIXEL</p>
      <p className="titlePunch">PUNCH</p>
      <p className="titleAcademy">ACADEMY</p>
    </div>
  );
};
