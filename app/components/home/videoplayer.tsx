'use client';

import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from "../icons/closeicon";
import SwiperCore from "swiper";




interface Video {
    id: number;
    video: string;
    thumbnail : string;
}

export default function VideoPlayer({ videos }: { videos: Video[] }) {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const swiperRef = useRef<SwiperCore | null>(null)

    const [activeIndex, setActiveIndex] = useState(0);
    const [playingvideo, setPlayingvideo] = useState(0);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) video.pause();
        });
    }, [activeIndex]);

    const handleMouseEnter = (index: number) => {
        if (index === activeIndex && videoRefs.current[index]) {
            videoRefs.current[index]?.play();
        }
    };

    const handleMouseLeave = (index: number) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index]?.pause();
        }
    };

    const playVideo = (index: number) => {
        console.log(index === activeIndex)
        if (index === activeIndex && videoRefs.current[index]) {

            setPopup(true)
            setPlayingvideo(index)
        }
    };

    const handlePopup = () => {
        setPopup(false)
        swiperRef.current?.autoplay.start()
    }

    return (
        <div className="px-4 mt-5">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className=" video-slider"
                centeredSlides={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Store the Swiper instance in the ref
                }}
                navigation={true}
                slideToClickedSlide={true}
                onClick={() => swiperRef.current?.autoplay.stop()}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: -10,
                    },
                }}

                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,

                }}
                modules={[Autoplay, Navigation]}
            >
                {videos.map((item, index) => (
                    <SwiperSlide className="py-4" key={`video_player_${item.id}`}>
                        <video
                            ref={(el) => {
                                videoRefs.current[index] = el;
                            }}
                            width="100%"
                            muted
                            preload="none"
                            className="videoplayer"
                            poster={item.thumbnail}
                            onClick={() => playVideo(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <source src={item.video} type="video/mp4" />
                        </video>
                    </SwiperSlide>
                ))}
            </Swiper>


            {popup && (<div className="videoPopup d-none d-lg-block" onClick={handlePopup}>
                <div className="d-flex justify-content-center align-items-center h-100" >
                    <video controls
                        autoPlay
                        onClick={(e) => e.stopPropagation()}
                        width="80%">
                        <source src={videos[playingvideo].video} type="video/mp4" />
                    </video>
                    <span className="close" onClick={handlePopup}><CloseIcon /></span>
                </div>
            </div>)}

        </div>
    );
}
