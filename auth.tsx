
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { apiRequest } from "./app/api/apiConfig"
import { cookies } from "next/headers";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, profile, account }) {
            if (account?.provider === 'google') {
                try {
                    const response = await apiRequest('POST', '/google/', { email: user.email, username: user.name });
                    cookies().set('_acdkb', response.access, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/',
                    })
                    return response;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
})