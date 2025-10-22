
import videoFile from "./assets/myol.mp4";
function Static() {
  return (
    <div className="static-container">
      <video
        className="background-video"
        src={videoFile}
        autoPlay
        loop
        muted
      ></video>

      <div className="overlay">
        <h1 className="static-title">
          Is this A Conspiracy or am I Going Insane?
        </h1>
      </div>
    </div>
  );
}

export default Static;
