
import Attributes from "./attributes";
import Selected from "./selectedAttributes";
import patterns from "@/app/datas/category/patterns.json";
import types from "@/app/datas/category/types.json";
import colors from "@/app/datas/category/colors.json";
import materials from "@/app/datas/category/materials.json";
import shapes from "@/app/datas/category/shapes.json";
import size from "@/app/datas/category/carpetsize.json";
import ClearAll from "./clearAllbtn";
import MobileFilter from "./MobileFIlter";


export default function Filter() {

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
                    <Attributes attribute={patterns} />
                    <Attributes attribute={types} />
                    <Attributes attribute={colors} />
                    <Attributes attribute={materials} />
                    <Attributes attribute={shapes} />
                    <Attributes attribute={size} />
                </div>
            </div>
        </>
    )
}