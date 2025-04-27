import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { IoMdMic } from "react-icons/io";
import "./Voice.css";  // الملف تحت

export default function RecordStyled() {
  const micRef = useRef(null);
  const playRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  // إنشاء الموجة و البلجن
  useEffect(() => {
    if (!micRef.current) return;

    const ws = WaveSurfer.create({
      container: micRef.current,
      waveColor: "#eee",
      progressColor: "#bbb",
      cursorWidth: 0,
      height: 80,
      barWidth: 2,
      barGap: 2,
    });
    wavesurferRef.current = ws;

    const rp = RecordPlugin.create({
      bufferSize: 4096,
      mediaTrackConstraints: { audio: true }
    });
    recordPluginRef.current = rp;
    ws.registerPlugin(rp);

    rp.once("record-end", (blob) => {
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
      ws.load(url);

      // طباعة بيانات الصوت في الكونسول
      console.log("Audio Blob:", blob);
      console.log("Audio URL:", url);
      console.log("Audio Duration:", blob.duration);
    });

    return () => ws.destroy();
  }, []);

  // عدّاد الثواني
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setSeconds(sec => sec + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleRecord = () => {
    const rp = recordPluginRef.current;
    if (!rp) return;

    if (!isRecording) {
      rp.startMic()            // يطلب صلاحية الميكروفون
        .then(() => rp.startRecording())
        .then(() => setIsRecording(true))
        .catch(console.error);
    } else {
      rp.stopRecording();      // يفعل event "record-end"
      rp.stopMic();
      setIsRecording(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec/60).toString().padStart(2, "0");
    const s = (sec%60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="recorder-container">
      <div className="controls">
        <button
          className={`btn-record ${isRecording ? "recording" : ""}`}
          onClick={handleRecord}
              >
                  <IoMdMic />

        </button>
        {isRecording && (
          <div className="indicator">
            <span className="dot" />
            <span className="timer">{formatTime(seconds)}</span>
          </div>
        )}
      </div>
      <div ref={micRef} className="waveform" />
      {recordedUrl && (
        <div className="playback">
          <button
            className="btn-play"
            onClick={() => wavesurferRef.current.playPause()}
          >
            تشغيل / إيقاف
          </button>
        </div>
      )}
    </div>
  );
}






