import Menubar from "./header/menubar";
import Topbar from "./header/topbar";
import "@/app/sass/components/header.scss"
import { getUser } from "../utilis/auth";
import { apiRequest } from "../api/apiConfig";

async function getMenu() {
    const response = await apiRequest('GET', '/menus/')
    return response;
}

export default async function Header() {

    let username: string = "";
    let userid : string = ""
    
        const userData = await getUser()

        if(userData){
            username = userData.username;
            userid = userData.user_id;
        }

        const menus = await getMenu()


    return (
        <header>
           <Topbar/>
           <Menubar categoryMenu={menus} username={username } userid={userid}/>
        </header>
    )
}