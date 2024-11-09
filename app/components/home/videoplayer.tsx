
export default function Videoplayer({ url, thumbnail }: { url: string, thumbnail : string }) {
    return (
        <>
            {/* <Image className="mt-4 pt-3 video-player" src={url} width={1920} height={523} alt="deko_buddy_video"/> */}
            <video width="100%" height="900" controls preload="none" className="mt-4 pt-3 videoplayer" poster={thumbnail}>
                <source src={url} type="video/mp4" />
            
            </video>
        </>
    )
}