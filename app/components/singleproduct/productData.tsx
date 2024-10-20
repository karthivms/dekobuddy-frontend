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
    }, [params, data.variations]);

    const handleVariationChange = (item: variations) => {
        const currentParams = new URLSearchParams(params.toString());
        currentParams.set('variation', item.sku);
        router.push(`?${currentParams}`);
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

    return (
        <div className="ps-5 product_details">
            <h1 className="text-black font-medium fw-4 font-sm-h2 line-normal">{data.name}</h1>
            <div className="d-flex align-items-center gap-10 mt-4">
                <span className="d-flex align-items-center gap-6 bg-theme1 w-auto px-1 br-5 font-primary text-white">
                    3.4 <Star fill={"white"} size={"13"} />
                </span>
                <span className="font-large text-black fw-3">35 Ratings & {data.no_of_reviews} Reviews</span>
            </div>
            <p className="my-3">{data.short_description}</p>

            {data.variations.length > 0 && (
                <div className="d-flex gap-20 align-items-center mt-3">
                    <p className="mb-0 fw-3 font-large" style={{ color: "#494642" }}>Size:</p>
                    {data.variations.map((item) => (
                        <div key={`Attname_${item.id}`}>
                            <span
                                onClick={() => handleVariationChange(item)}
                                className={`fw-4 font-primary border-border2-solid py-1 px-2 pointer br-5 ${actVariation.sku === item.sku ? 'bg-theme2 text-theme1' : ''}`}>
                                {item.size}
                            </span>
                        </div>
                    ))}
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

            <QuanityHandler count={count} setCount={setCount} />
            <ActionButtons Apiinfo={cartAPiinfo} productdata={data} />
            <Options title={data.name} />
        </div>
    );
}
