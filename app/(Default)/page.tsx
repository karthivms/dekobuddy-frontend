import dynamic from "next/dynamic";
import Banner from "@/app/components/home/banner";
import CategoryMenu from "@/app/components/home/categorymenu";
import PromotionMenu from "@/app/components/home/promotionsMenu";
import Videoplayer from "@/app/components/home/videoplayer";
import Whychooseus from "@/app/components/home/whychooseus";
import ScrollWrapper from "@/app/components/scrollanimation";
const Testimonials = dynamic(() => import('@/app/components/home/testimonials'), { ssr: false });
import '../sass/components/home.scss';
import { apiRequest } from "../api/apiConfig";




const getHomeData = async () => {
  try {
    const response = await apiRequest('GET', '/homeapi/');
    return response;

  } catch (error) {
    console.log(error);
    throw error
  }
}


export default async function Home() {

  const homedata = await getHomeData();

  const videos = [
    {
        id: 1,
        video: "http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/media/videos_uploaded/D1_rh7dcJm.mp4"
    },
    {
        id: 2,
        video: "http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/media/videos_uploaded/D1_rh7dcJm.mp4"
    },
    {
        id: 3,
        video: "http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/media/videos_uploaded/D1_rh7dcJm.mp4"
    },
    {
      id: 4,
      video: "http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/media/videos_uploaded/D1_rh7dcJm.mp4"
  }
]


  return (
    <>
      <Banner data={homedata.main_banners[0]}/>

      {/* <ScrollWrapper direction={20}> */}
      <PromotionMenu data={homedata.promotionsmenu}/>
      {/* </ScrollWrapper> */}

      <Videoplayer videos={videos} thumbnail={"/images/thumbnail1.png"}/>
      <CategoryMenu category={homedata.categories} />

      <ScrollWrapper direction={20}>
        <Whychooseus features={homedata.why_choose}/>
      </ScrollWrapper>

      <Testimonials reviews={homedata.user_reviews}/>
    </>
  );
}
