export interface IVideoPlayer {
	videoSource: string
}

export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen?: () => void
	mozRequestFullscreen?: () => void
	webkitRequestFullscreen?: () => void
}
