import { Col } from "react-bootstrap";
import "@/app/sass/components/productskeleton.scss";

export default function WishlistSkeleton({grid, array}:{grid:number, array : number}) {
    return (
        <>
            {[...Array(array)].map((_, index) => (
                <Col lg={grid} key={`product_skeleton_${index}`} sm={6} xs={6} className="p-1 mb-1 product_item ">

                    <div className="bg-white br-8 p-3 pt-1">
         
                        <div className="skeleton h-207 mt-3 br-10">

                        </div>
                        <div className="skeleton h-20 mt-3 br-3">

                        </div>
                        <div className="skeleton h-20 wc-30 mt-3 br-3">

                        </div>
                    </div>
                </Col>
            ))}

        </>

    )
}