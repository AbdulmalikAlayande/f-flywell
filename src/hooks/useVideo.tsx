import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

type UseVideoProps = {
  userEmail?:string
  postImage: (video: string) => void
}
const UseVideo = (props: UseVideoProps) => {
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [video, setVideo] = useState<string>('');
  const webcamRef = useRef<Webcam>(null);

  const startRecording = React.useCallback(() => {
    if (webcamRef.current) {
      const stream = webcamRef.current.video?.srcObject as MediaStream;
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.start();
      }
    }
  }, []);

  const stopRecording = React.useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const videoSrc = URL.createObjectURL(blob);
      setVideo(videoSrc);
    }
  }, []);

  return (
    <div className={'Use-Video-Main-Frame'}>
      {video === '' ? (
        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          width={600}
          screenshotFormat={undefined}
          videoConstraints={videoConstraints}
        />
      ) : (
        <video height={300} width={600} src={video} controls></video>
      )}
      <div className='Use-Video-Start-And-Stop-Buttons-Frame'>
        <button onClick={(event) => {event.preventDefault(); startRecording()}}>Start Recording</button>
        <button onClick={(event) => {event.preventDefault(); stopRecording()}}>Stop Recording</button>
      </div>
      <div className='Use-Video-Post-Button-Frame'>
        <button onClick={() => props.postImage(video)}>Post Video</button>
      </div>
    </div>
  );
};

export default UseVideo;
