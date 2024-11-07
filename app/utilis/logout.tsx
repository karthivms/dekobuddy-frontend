'use server'
import { redirect	 } from 'next/navigation';


import { cookies } from "next/headers";


export const LogoutUser = async () => {


        cookies().set('_acdkb', '', {
            path: '/',
            expires : new Date(0)
        })
        redirect('/');
 
  
}


