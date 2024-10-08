import { useCallback } from "react";
import Star from "../icons/star";
import QuanityHandler from "./quantityHandler";
import ActionButtons from "./actionButtons";
import Options from "./options";

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}


interface dummyAtts {
    name:string,
    value:string
}

export default function ProductData({ data }: { data: Product }) {

    const getDiscount = useCallback((price: number, dis: number) => {
        const discount = Math.floor(dis / 100 * price);
        return price - discount;
    }, []);

    const dummycolors:string[] = [
        '#C05938',
        '#F34A34',
        '#DEC9AC',
        '#E6E2D5',
        '#422E23'
    ]




    const dummyAtts:dummyAtts[] = [
        { name: "Size", value: '5 ft, X 7ft' },
        { name: "Category", value: 'Bedroom Rugs' },
        { name: "Shape", value: 'Abstract' },
    ]

    return (
        <div className="ps-5 product_details">
            <h1 className="text-black font-medium fw-4 font-sm-h2 line-normal">{data.name}</h1>
            <div className="d-flex align-items-center gap-10 mt-4">
                <span className="d-flex align-items-center gap-6 bg-theme1 w-auto px-1 br-5 font-primary text-white">3.4 <Star fill={"white"} size={"13"}/></span>
                <span className="font-large text-black fw-3">35 Ratings & {data.no_of_reviews} Reviews </span>
            </div>

            <h5 className="text-black font-h3 mt-4 mb-1">Special Price</h5>
            <div className="d-flex gap-10 align-items-center">
                <span className="text-black font-normal fw-3">₹{data.price}</span>
                <s className=" font-h3 " style={{ color: "#78746D" }}>₹{getDiscount(data.price, data.discount)}</s>
                <span className="text-theme1 fw-3 font-large ">{data.discount}% off</span>
            </div>

            <h5 className="text-black font-h3 mt-4 mb-2">Color</h5>
            <div className="d-flex gap-10">
                {dummycolors.map((item: string) => (
                    <span key={`color_att_${item}`} className="d-inline-block wp-30 h-30 br-15" style={{ backgroundColor: item }}></span>
                ))}
            </div>

            <QuanityHandler />

            <div className="d-flex gap-20">
                {dummyAtts.map((item: dummyAtts) => (
                    <div key={`Attname_${item.name}`} className="mt-4">
                        <p className="mb-0 fw-3" style={{ color: "#494642" }}>{item.name}</p>
                        <span className="fw-4">{item.value}</span>
                    </div>
                ))}
            </div>
            <ActionButtons />
            <Options/>
        </div>
    )
}