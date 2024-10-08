import dynamic from "next/dynamic";
import Banner from "@/app/components/home/banner";
import CategoryMenu from "@/app/components/home/categorymenu";
import PromotionMenu from "@/app/components/home/promotionsMenu";
import Videoplayer from "@/app/components/home/videoplayer";
import Whychooseus from "@/app/components/home/whychooseus";
import ScrollWrapper from "@/app/components/scrollanimation";
const Testimonials = dynamic(() => import('@/app/components/home/testimonials'), { ssr: false });
import '../sass/components/home.scss';



export default function Home() {
  return (
    <>
      <Banner />

      {/* <ScrollWrapper direction={20}> */}
        <PromotionMenu />
      {/* </ScrollWrapper> */}

      <Videoplayer url={"/images/video1.jpg"} />
      <CategoryMenu />
      <Videoplayer url={"/images/video2.jpg"} />

      <ScrollWrapper direction={20}>
        <Whychooseus />
      </ScrollWrapper>

      <Testimonials />
    </>
  );
}
