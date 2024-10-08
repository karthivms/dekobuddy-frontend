
export default function Videoplayer({ url }: { url: string }) {
    return (
        <>
            {/* <Image className="mt-4 pt-3 video-player" src={url} width={1920} height={523} alt="deko_buddy_video"/> */}
            <video width="100%" height="380" controls preload="none" className="mt-4 pt-3">
                <source src={url} type="video/mp4" />
                <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
                Your browser does not support the video tag.
            </video>
        </>
    )
}