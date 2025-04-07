import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export async function auth() {
    return getServerSession(authOptions);
}
