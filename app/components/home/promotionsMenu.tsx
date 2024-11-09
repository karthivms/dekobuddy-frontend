import { navigationItem } from "@/app/types/types";
import NavigationMenu from "./navigationMenu";

export default function PromotionMenu({data}:{data:navigationItem[]}) {
    const height = "220px"
    return (
        <NavigationMenu  links={data} source={'promotion'} height={height} id={"promotion"} />
    )
}