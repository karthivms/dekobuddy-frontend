import { Col } from "react-bootstrap";
import "@/app/sass/components/productskeleton.scss";

export default function AddressSkeleton({ array}:{ array : number}) {
    return (
        <>
            {[...Array(array)].map((_, index) => (

                    <div key={`address_skeleton_${index}`} className="bg-white br-8">
         
                        <div className="skeleton h-80 w-100 mt-3">

                        </div>
    
                    </div>
            ))}

        </>

    )
}