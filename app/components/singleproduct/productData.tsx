'use client';

import { useCallback, useEffect, useState } from "react";
import Star from "../icons/star";
import QuanityHandler from "./quantityHandler";
import ActionButtons from "./actionButtons";
import Options from "./options";
import { Product, variations } from '@/app/types/types';
import formatPriceIndian from "@/app/utilis/formatPrice";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Toaster from "../toaster";


export default function ProductData({ data, userid }: { data: Product, userid: string }) {
    const router = useRouter();
    const params = useSearchParams();
    const [actVariation, setActVariation] = useState<variations>(data.variations[0]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        const currentVariation = params.get('variation');
        const foundVariation = data.variations.find(item => item.sku === currentVariation);
        if (foundVariation) {
            setActVariation(foundVariation);
        }
    }, [data]);

    const handleVariationChange = (item: variations) => {
        const currentParams = new URLSearchParams(params.toString());
        currentParams.set('variation', item.sku);
        router.replace(`?${currentParams.toString()}`);
        setActVariation(item)
    };

    const getDiscount = useCallback((price: number, salePrice: number) => {
        if (salePrice > 0) {
            const discount = Math.floor(((price - salePrice) / price) * 100);
            return discount;
        }
        return 0;
    }, []);


    const cartAPiinfo = {
        quantity: count,
        user_id: Number(userid)
    }

    const handleToastClose = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false);
    const [wishmsg, SetWishmsg] = useState(true)

    return (
        <div className="ps-5 product_details">
            <h1 className="text-black font-medium fw-4 font-sm-h2 line-normal">{data.name}</h1>
            {data.rating_count !== 0 && (<div className="d-flex align-items-center gap-10 mt-4">
                <span className="d-flex align-items-center gap-6 bg-theme1 w-auto px-1 br-5 font-primary text-white">
                    {data.average_rating?.toFixed(1)} <Star fill={"white"} size={"13"} />
                </span>
                <span className="font-large text-black fw-3">{data.rating_count} Ratings & {data.review_count} Reviews</span>
            </div>)}
            <div className="my-4 font-primary des_list fw-3" dangerouslySetInnerHTML={{__html : data.short_description}}></div>

            {data.variations.length > 0 && (
                <div className="d-flex gap-20  mt-3">
                    <p className="mb-0 fw-3 font-large" style={{ color: "#494642" }}>Size:</p>
                    <div className="d-flex flex-wrap row-gap-14 gap-14 align-items-center">
                    {data.variations.map((item) => (
                        <div key={`Attname_${item.id}`} >
                            <span
                                onClick={() => handleVariationChange(item)}
                                className={`fw-4 font-primary border-border2-solid py-1 px-2 pointer br-5 ${actVariation.sku === item.sku ? 'bg-theme2 text-theme1' : ''}`}>
                                {item.size}
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
            )}

            <div className="font-normal fw-3 d-flex gap-10 text-black align-items-center mt-3">
                {data.sale_price ? (
                    <>
                        <h5 className="text-black font-h3 mt-2 mb-1">Special Price</h5>
                        <span>₹{formatPriceIndian(data.sale_price)}</span>
                        <s>₹{formatPriceIndian(data.regular_price)}</s>
                        <span className="font-small bg-theme2 px-1 br-5">
                            {getDiscount(Number(data.regular_price), data.sale_price)}%
                        </span>
                    </>
                ) : (<>
                    {data.variations.length > 0 ? (<span>{formatPriceIndian(actVariation.regular_price)}</span>
                    ) : (<span>{formatPriceIndian(data.regular_price)}</span>)}
                </>
                )}
            </div>

            <QuanityHandler stock={actVariation.stock} variationId={actVariation.id} count={count} setCount={setCount} />
            <ActionButtons Apiinfo={cartAPiinfo} category={data.categories[0].name} productid={data.id} image={data.images[0]} variation={actVariation} name={data.name} setCount={setCount}/>
            <Options handleMsg={SetWishmsg} handleToast={setShow} id={data.id} userid={Number(userid)} price={Number(data.regular_price)} images={data.images} title={data.name} />
            <Toaster show={show} msg={wishmsg} handleClose={handleToastClose}/>

        </div>
    );
}
