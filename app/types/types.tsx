
// category Item
export interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    active: boolean
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
    categories: CategoryItem[]
    short_description: string;
    variations: variations[]
    sale_price: number
    no_of_reviews: number;
    regular_price: string;
    average_rating: null | number;
    rating_count: number;
    review_count: number;
}

export interface cartdata {
    id: number,
    productid : number,
    product: cartProduct,
    user_id: number
}

export interface wishlistdata {
    id: number,
    productid : number,
    product: wishListProduct,
    user_id: number
}

export interface cartProduct {
    id: number,
    name: string,
    categories: string,
    size: string,
    regular_price: number,
    images: {
        id: number,
        image: string
    },
    quantity: number

}

export interface cartItem {
    id: number,
    product: cartProduct,
}


export interface wishListProduct {
    id: number,
    name: string,
    regular_price: number,
    images: productimage[]
}

export interface rating {
    user_name:string,
    rating:number
}


export interface wishlistItem {
    id: number,
    products: wishListProduct,
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

export interface Attribute {
    id: number;
    name: string;
    values: string[];
}

export interface orderItem{
    id: number,
    product_id: number,
    product_name: string,
    size: string,
    price: string,
    quantity: number,
    total: number,
    images: productimage[]
}

export interface address {
    name: string,
    address: string,
    city: string,
    state: string,
    pincode: string,
    country: string,
    email: string,
    phone: string,
    address_type: string
}

export interface order {
    id: number,
    user_id: number,
    order_id: string,
    amount: string,
    bill_amount: string,
    order_status: string,
    order_date: string,
    order_items: orderItem[],
    billing_address: address
}

export interface profile {
    first_name: string,
    last_name: string,
    email: string,
    phone: string
}