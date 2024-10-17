import { cookies } from "next/headers";
import Menubar from "./header/menubar";
import Topbar from "./header/topbar";
import "@/app/sass/components/header.scss"
import { getUser } from "../utilis/auth";



export default function Header() {

    const token = cookies().get("_acdkb")?.value;
    let username: string = "";
    if (token) {
        const userData = getUser(token)
        username = userData.username
    }

    return (
        <header>
           <Topbar/>
           <Menubar username={username }/>
        </header>
    )
}