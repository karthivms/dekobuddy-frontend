import Menubar from "./header/menubar";
import Topbar from "./header/topbar";
import "@/app/sass/components/header.scss"



export default function Header() {
   
    return (
        <header>
           <Topbar/>
           <Menubar/>
        </header>
    )
}