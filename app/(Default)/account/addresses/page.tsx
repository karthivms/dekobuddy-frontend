import AddAddress from "@/app/components/account/addAddress";
import Address from "@/app/components/account/address";

export default function Page() {
    return (
        <>
            <h1 className='font-h3 fw-4 text-theme1 mb-3'>Manage Addresses</h1>
            <Address />
            <AddAddress />
        </>
    )
}