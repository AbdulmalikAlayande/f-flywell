import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

const UseVideo = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<any[]>([]);
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
    <div>
      {video === '' ? (
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat={undefined}
          videoConstraints={videoConstraints}
        />
      ) : (
        <video src={video} controls></video>
      )}
      <div className=''>
        <button onClick={(event) => {event.preventDefault(); startRecording()}}>Start Recording</button>
        <button onClick={(event) => {event.preventDefault(); stopRecording()}}>Stop Recording</button>
      </div>
    </div>
  );
};

export default UseVideo;
