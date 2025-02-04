import dynamic from "next/dynamic";
import Banner from "@/app/components/home/banner";
import CategoryMenu from "@/app/components/home/categorymenu";
import PromotionMenu from "@/app/components/home/promotionsMenu";
const Videoplayer = dynamic(() => import("@/app/components/home/videoplayer"), { ssr: false });

import Whychooseus from "@/app/components/home/whychooseus";
import ScrollWrapper from "@/app/components/scrollanimation";
const Testimonials = dynamic(() => import('@/app/components/home/testimonials'), { ssr: false });
import '../sass/components/home.scss';
import { apiRequest } from "../api/apiConfig";
import Customization from "../components/home/customization";


interface Video {
  id: number;
  video: string;
  thumbnail: string;
}


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


  function splitArrayIntoHalves(array: Video[]) {
    const middleIndex = Math.ceil(array.length / 2);
    const firstHalf = array.slice(0, middleIndex);
    const secondHalf = array.slice(middleIndex);
    return [firstHalf, secondHalf];
  }

  const [firstHalf, secondHalf] = splitArrayIntoHalves(homedata.videos_uploaded);

  return (
    <>
      <Banner data={homedata.main_banners} />

      {/* <ScrollWrapper direction={20}> */}
      <PromotionMenu data={homedata.promotionsmenu} />
      {/* </ScrollWrapper> */}

      <Videoplayer videos={firstHalf} />
      <CategoryMenu category={homedata.categories} />
      <Videoplayer videos={secondHalf} />

      <Customization />

      <ScrollWrapper direction={20}>
        <Whychooseus features={homedata.why_choose} />
      </ScrollWrapper>

      <Testimonials reviews={homedata.user_reviews} />
    </>
  );
}
