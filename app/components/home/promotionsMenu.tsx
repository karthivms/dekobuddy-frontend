import NavigationMenu from "./navigationMenu";
import promotion from "@/app/datas/home/promotionmenu.json";

export default function PromotionMenu() {
    const height = "220px"
    return (
        <NavigationMenu links={promotion} height={height} id={"promotion"} />
    )
}