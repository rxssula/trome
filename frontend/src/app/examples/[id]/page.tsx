"use client";

import Wavesurfer from "@/app/components/waveform";
import { FC, useState, useCallback, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface ExampleProps {
  params: { id: number };
}

const audios = [
  {
    Vocals: "/music/vocals.wav",
    Bass: "/music/bass.wav",
    Drums: "/music/drums.wav",
    Other: "/music/other.wav",
  },
  {
    Vocals: "/music/vocals1.mp3",
    Bass: "/music/bass1.mp3",
    Drums: "/music/drums1.mp3",
    Other: "/music/other1.mp3",
  },
  {
    Vocals: "/music/vocals2.mp3",
    Bass: "/music/bass2.mp3",
    Drums: "/music/drums2.mp3",
    Other: "/music/other2.mp3",
  },
  {
    Vocals: "/music/vocals3.mp3",
    Bass: "/music/bass3.mp3",
    Drums: "/music/drums3.mp3",
    Other: "/music/other3.mp3",
  },
  {
    Vocals: "/music/vocals4.mp3",
    Bass: "/music/bass4.mp3",
    Drums: "/music/drums4.mp3",
    Other: "/music/other4.mp3",
  },
  {
    Vocals: "/music/vocals5.mp3",
    Bass: "/music/bass5.mp3",
    Drums: "/music/drums5.mp3",
    Other: "/music/other5.mp3",
  },
];

const Example: FC<ExampleProps> = ({ params }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfers, setWavesurfers] = useState<WaveSurfer[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    wavesurfers.forEach((ws) => {
      if (Math.abs(ws.getCurrentTime() - time) > 0.5) {
        const duration = ws.getDuration();
        if (duration > 0) {
          ws.seekTo(time / duration);
        }
      }
    });
  };

  const handleReady = useCallback((wavesurfer: any) => {
    setWavesurfers((prev) => [...prev, wavesurfer]);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    wavesurfers.forEach((ws) => (isPlaying ? ws.pause() : ws.play()));
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col gap-2 sm:gap-4">
        {Object.entries(audios[params.id]).map(([title, url], index) => (
          <Wavesurfer
            key={title}
            audioUrl={url}
            title={title}
            isPlaying={isPlaying}
            onReady={handleReady}
            onTimeUpdate={handleTimeUpdate}
            currentTime={currentTime}
          />
        ))}
      </div>
      <button
        onClick={handlePlayPause}
        className="mt-4 w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        {isPlaying ? "Pause All" : "Play All"}
      </button>
    </div>
  );
};

export default Example;
