import "@/app/sass/components/productskeleton.scss";

export default function AddressSkeleton({ array, height}:{ array : number, height : number}) {
    return (
        <>
            {[...Array(array)].map((_, index) => (

                    <div key={`address_skeleton_${index}`} className="bg-white br-8">
         
                        <div className={`skeleton h-${height} w-100 mt-3`}>

                        </div>
    
                    </div>
            ))}

        </>

    )
}