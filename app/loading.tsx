import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Loading() {


  return (
    <div className='d-flex justify-content-center align-items-center logoloader' style={{ minHeight: `100vh` }} >
      <div> <Image src={logo} alt="deko-buddy" width={300} height={43} className='wp-300 wp-sm-180 h-auto' /></div>

    </div>
  );
}
