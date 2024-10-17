
// category Item
export interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    active:boolean
}


// Login User
export interface User {
    username: string;
    password: string;
  }


  export interface Product {
    id: number;
    name: string;
    images: productimage[];
    categories:CategoryItem[]
    short_description:string;
    variations:variations[]
    props: string;
    sale_price: number
    no_of_reviews: number;
    regular_price: number;
    discount: number;
}


export interface variations {
    id: number,
    sku: string,
    regular_price: string,
    stock: number,
    size: string
}

export interface productimage {
    id: number,
    image: string
}