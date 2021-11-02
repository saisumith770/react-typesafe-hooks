import React, { useRef } from "react"
import { useMergeState } from './useMergeState'

type HTMLMediaState = {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
  playing: boolean;
}

function parseTimeRanges(ranges: TimeRanges) {
  const result: { start: number; end: number }[] = [];

  for (let i = 0; i < ranges.length; i++) {
    result.push({
      start: ranges.start(i),
      end: ranges.end(i),
    });
  }

  return result;
}

/**
 * @param element
 * @returns VideoControls
 * @description
 * Hook that returns the controls of the Video element provided.
 * @example
 * const {
 * Component,
 * state,
 * controls,
 * ref
 * } = useVideo(
    <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" autoPlay />
  );
  return (<div>
      <Component/>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <br/>
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <br/>
      <button onClick={() => controls.volume(.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <br/>
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
    </div>)
 */
export function useVideo(element: React.ReactElement<HTMLVideoElement>) {
  const VideoRef = useRef(element)
  const [VideoState, setVideoState] = useMergeState<HTMLMediaState>({
    buffered: [],
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
    playing: false,
  })

  // State updaters
  element.props.onplay = () => setVideoState({ paused: false });
  element.props.onplaying = () => setVideoState({ playing: true });
  element.props.onwaiting = () => setVideoState({ playing: false });
  element.props.onpause = () => setVideoState({ paused: true, playing: false });
  element.props.onvolumechange = () => {
    const el = VideoRef.current;
    if (!el) {
      return;
    }
    setVideoState({
      muted: el.props.muted,
      volume: el.props.volume,
    });
  };
  element.props.ondurationchange = () => {
    const el = VideoRef.current;
    if (!el) {
      return;
    }
    const { props: { duration, buffered } } = el;
    setVideoState({
      duration,
      buffered: parseTimeRanges(buffered),
    });
  };
  element.props.ontimeupdate = () => {
    const el = VideoRef.current;
    if (!el) {
      return;
    }
    setVideoState({ time: el.props.currentTime });
  };
  element.props.onprogress = () => {
    const el = VideoRef.current;
    if (!el) {
      return;
    }
    setVideoState({ buffered: parseTimeRanges(el.props.buffered) });
  };


  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay: boolean = false;

  const controls = {
    play: () => {
      const el = VideoRef.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.props.play();
        const isPromise = typeof promise === 'object';

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = VideoRef.current;
      if (el && !lockPlay) {
        return el.props.pause();
      }
    },
    seek: (time: number) => {
      const el = VideoRef.current;
      if (!el || VideoState.duration === undefined) {
        return;
      }
      time = Math.min(VideoState.duration, Math.max(0, time));
      el.props.currentTime = time;
    },
    volume: (volume: number) => {
      const el = VideoRef.current;
      if (!el) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      el.props.volume = volume;
      setVideoState({ volume });
    },
    mute: () => {
      const el = VideoRef.current;
      if (!el) {
        return;
      }
      el.props.muted = true;
    },
    unmute: () => {
      const el = VideoRef.current;
      if (!el) {
        return;
      }
      el.props.muted = false;
    },
  };

  const ReactFunctionalComponent: React.FC = () => (element)

  return {
    Component: ReactFunctionalComponent,
    state: VideoState,
    controls,
    ref: VideoRef
  }
}