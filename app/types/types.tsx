
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
    sale_price: number
    no_of_reviews: number;
    regular_price: string;
}

export interface cartdata {
    data: {
        quantity: number,
        user_id: number
    }
    productid: number
}


export interface cartItem{
    id:number,
    products:Product
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