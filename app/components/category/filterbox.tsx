
import Attributes from "./attributes";
import Selected from "./selectedAttributes";

import size from "@/app/datas/category/carpetsize.json";
import ClearAll from "./clearAllbtn";
import MobileFilter from "./MobileFIlter";
import { CategoryItem } from "@/app/types/types";
import CategoryListing from "./categoryListing";
import PriceRangeSlider from "./priceRange";

export default function Filter({ categories }: { categories: CategoryItem[] }) {

    return (
        <>
            <MobileFilter />
            <div className="bg-theme2 br-10 py-3 px-4 filterbox d-none d-lg-block custom-scrollbar">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="font-secondary fw-4 text-black m-0">Filter</h5>
                    <ClearAll />
                </div>
                <Selected />
                <div className="attributes-section">
                    <CategoryListing category={categories}/>
                    <Attributes attribute={size} />
                    <PriceRangeSlider/>
                </div>
            </div>
        </>
    )
}