
/** Represents an actively running timeline.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/interfaces/itimelinestate | ITimelineState documentation } */
declare class ITimelineState
{
	pause(): void;
    resume(): void;
    hasTags(tags: string): boolean;
    time: number;
    totalTime: number;
    isLooping: boolean;
    isPingPong: boolean;
    playbackRate: number;
    
    readonly progress: number;
    readonly tags: string;
    readonly finished: Promise<void>;
    readonly isPlaying: boolean;
    readonly isPaused: boolean;
    readonly isReleased: boolean;
}
