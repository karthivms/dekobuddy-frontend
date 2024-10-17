import ScrollWrapper from "../scrollanimation";
import NavigationMenu from "./navigationMenu";
import { CategoryItem } from "@/app/types/types";




export default function CategoryMenu({category}:{category:CategoryItem[]}){
    const height = "280px"
    return(
        <div className="mt-4 pt-3"> 
        <ScrollWrapper direction={-20}>
        <h2 className="text-uppercase font-h2 text-center text-theme1 fw-4">Product Category</h2>
        </ScrollWrapper>
        <ScrollWrapper direction={20}>
        <NavigationMenu links={category} height={height} id={"category"}/>
        </ScrollWrapper>

        </div>
    )
}