import {auth} from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session && <p>Welcome {session.user?.name} &#128075;</p>}
    </div>
  );
}
