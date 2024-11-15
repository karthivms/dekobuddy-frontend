'use client';

import { useEffect, useRef } from "react";

export default function VideoPlayer({ url, thumbnail }: { url: string; thumbnail: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    videoElement?.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
        });

        if (videoElement) {
            observer.observe(videoElement);
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            width="100%"
            height="900"
            muted
            preload="none"
            className="mt-4 pt-3 videoplayer"
            poster={thumbnail}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
        >
            <source src={url} type="video/mp4" />
        </video>
    );
}
