import { auth } from "@/auth";
import { db } from "@/lib/db"

const checkUser = async () => {
    const session = await auth();

    if(!session) {
        return null;
    }

    const loggedInUser = await db.user.findUnique({
        where: {
            authId: session.user?.id,
        }
    })
}