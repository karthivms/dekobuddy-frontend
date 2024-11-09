import AddAddress from "@/app/components/account/addAddress";
import Address from "@/app/components/account/address";
import { getUser } from "@/app/utilis/auth";



export default async function Page() {
    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        userid = userData.user_id;
    }


    return (
        <>
            <h1 className='font-h3 fw-4 text-theme1 mb-3'>Manage Addresses</h1>
            <Address  userid={userid}/>
            <AddAddress userid={userid} />
        </>
    )
}