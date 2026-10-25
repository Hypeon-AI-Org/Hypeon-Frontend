/** Longest side of a sampled frame: enough to read on-screen text, small enough that a dozen fit in one upload. */
export const FRAME_SIDE = 640;
export const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];
/** Only the frames leave the browser, so the file itself can be large. */
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

export type VideoFrames = { frames: string[]; times: number[]; duration: number; width: number; height: number };

/**
 * Plays nothing and uploads nothing: seeks a hidden <video> to each timestamp
 * `pickTimes` returns for the clip's length and draws that frame to a canvas.
 * Only these small JPEG frames are sent.
 */
export function extractFrames(file: File, pickTimes: (duration: number) => number[]): Promise<VideoFrames> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    const fail = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    video.onerror = fail;
    video.onloadeddata = async () => {
      try {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0 || !video.videoWidth) return fail();
        const scale = Math.min(1, FRAME_SIDE / Math.max(video.videoWidth, video.videoHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return fail();
        const times = pickTimes(duration);
        const frames: string[] = [];
        for (const t of times) {
          await new Promise<void>((done) => {
            video.onseeked = () => done();
            video.currentTime = Math.min(t, duration - 0.05);
          });
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(canvas.toDataURL('image/jpeg', 0.72));
        }
        URL.revokeObjectURL(url);
        resolve({ frames, times, duration, width: video.videoWidth, height: video.videoHeight });
      } catch {
        fail();
      }
    };
    video.src = url;
  });
}
