import Menubar from "./header/menubar";
import Topbar from "./header/topbar";
import "@/app/sass/components/header.scss"
import { getUser } from "../utilis/auth";



export default async function Header() {

    let username: string = "";
    let userid : string = ""
    
        const userData = await getUser()

        if(userData){
            username = userData.username;
            userid = userData.user_id;
        }
     
    return (
        <header>
           <Topbar/>
           <Menubar username={username } userid={userid}/>
        </header>
    )
}