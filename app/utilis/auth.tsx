'use server'

import { cookies } from "next/headers";

export const getUser = () => {

  const token = cookies().get("_acdkb")?.value;

    if (!token) return null;
  
    try {
      const payload = token.split('.')[1]; 
      return JSON.parse(atob(payload));    
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  };
