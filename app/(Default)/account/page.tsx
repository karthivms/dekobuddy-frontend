import { apiRequest } from "@/app/api/apiConfig";
import Profile from "@/app/components/account/profileForm";
import { getUser } from "@/app/utilis/auth";
const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;



export async function GetProfileData(userid : string){

    const response = await apiRequest('GET', `${baseurl}/profile/${userid}`);
    return response;
}



export default async function page() {

    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        userid = userData.user_id;
    }

    const profiledata = await  GetProfileData(userid);

    return (
        <>
            <h1 className='font-h3 fw-4 text-theme1 mb-3'>Profile Information</h1>
            <Profile userid={userid} data={profiledata}/>
        </>
    )
}