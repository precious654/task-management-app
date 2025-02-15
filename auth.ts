import NextAuth from "next-auth"
import { v4 as uuid } from "uuid"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"
import { userSchema } from "@/lib/schema";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import bcrypt from "bcrypt";
import {encode} from "next-auth/jwt";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [
        Google,
        GitHub,
        Credentials({
            type: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                try {
                    const validatedCredentials = userSchema.parse(credentials);
                    const user = await db.user.findFirst({
                        where: {
                            email: validatedCredentials.email,
                        }
                    });
                    const isValid = await bcrypt.compare(credentials.password, user?.password);
                    if (isValid) {
                        return user;
                    }
                } catch(error) {
                    console.log(error);
                }
                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if(account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },

    jwt: {
        encode: async function (params) {
            if(params.token?.credentials) {
                const sessionToken = uuid();

                if(!params.token.sub) {
                    throw new Error("No User ID found in token");
                };

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date( Date.now() + 30 * 24 * 60 * 60 * 1000 ),
                });

                if(!createdSession) {
                    throw new Error("Failed to create session");
                }
                return sessionToken;
            }
            return encode(params);
        }
    }
})
