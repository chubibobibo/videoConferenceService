import { useRef, useEffect } from "react";

function VideoPlayer({ stream }) {
  /** @videoRef contains the persistent value of an element that will not cause a re-render if data is updated. This uses useRef hook */
  /** @HTMLVideoElement interface that provides properties and methods to manipulate videos */
  const videoRef = useRef(null);

  /** @videoRef .current accessing the current value and using @stream from the context as it's current value. */
  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <div className='w-65 h-65'>
      <video ref={videoRef} autoPlay />
    </div>
  );
}
export default VideoPlayer;
