import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"
import { userSchema } from "@/lib/schema";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [
        Google,
        GitHub,
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const validatedCredentials = userSchema.parse(credentials);

                const user = await db.user.findFirst({
                    where: {
                        email: validatedCredentials.email,
                        password: validatedCredentials.password,
                    }
                });
                if(!user) {
                    throw new Error("invalid credentials!!!");
                }
                return user;
            }
        }),
    ]
})
