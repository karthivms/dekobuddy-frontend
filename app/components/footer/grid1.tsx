import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.svg";
import { Col } from "react-bootstrap";
import social from "@/app/datas/footer/socialmedia.json";
import Youtube from "../icons/youtube";
import Instagram from "../icons/instagram";
import Facebook from "../icons/facebook";


interface media {
    id: number,
    name: string,
    link: string
}

export default function Grid1() {

    const getIcon = (type: string) => {
        switch (type) {
            case "instagram":
                return <Instagram/>
            case "youtube":
                return <Youtube />
            case "facebook":
                return <Facebook />
        }

    };

    return (
        <Col xl={4} lg={4}>
            <Link href="/">
                <Image src={logo} alt="deko-buddy" width={267} height={39} />
            </Link>
            <p className="font-primary my-4 line-relaxed">Lorem ipsum dolor sit amet consectetur.
                Consequat feugiat lacus nisi malesuada
                aliquet Lorem ipsum dolor sit amet
                consectetur. Consequat feugiat lacus nisi
            </p>
            <ul className="d-flex p-0 m-0 gap-15">
                {social.map((item: media) => (
                    <li key={`social_${item.id}`}>
                        <Link
                            href={item.link}
                            className="footer-social text-white link2 bg-theme1 wp-26 h-26 br-13 d-flex justify-content-center align-items-center">
                            {getIcon(item.name)}
                        </Link>
                    </li>
                ))}
            </ul>
        </Col>
    )
}