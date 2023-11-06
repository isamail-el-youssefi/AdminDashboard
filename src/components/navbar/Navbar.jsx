import "./Navbar.scss";

export default function Navbar() {
  const toggleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>storename</span>
      </div>

      <div className="icons">
        <div className="icon">
          <img src="expand.svg" alt="icon" onClick={toggleFullScreen} />
        </div>

        <div className="user">
          <img src="noavatar.png" alt="" />
          <span>Mohammed</span>
        </div>

        <img src="settings.svg" alt="icon" />
      </div>
    </div>
  );
}
