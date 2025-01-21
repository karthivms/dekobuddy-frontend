import ScrollWrapper from "../scrollanimation";
import NavigationMenu from "./navigationMenu";
import { navigationItem } from "@/app/types/types";




export default function CategoryMenu({ category }: { category: navigationItem[] }) {
    const height = "400px"
    return (
        <div className="mt-4">
            <ScrollWrapper direction={-20}>
                <h2 className="text-uppercase font-h2 text-center text-theme1 fw-4">Product Category</h2>
            </ScrollWrapper>
            <ScrollWrapper direction={20}>
                <NavigationMenu links={category} source={'category'} height={height} id={"category"} />
            </ScrollWrapper>
        </div>
    )
}