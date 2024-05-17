import { useCurrentRole } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(){
    const role = await useCurrentRole()
    if(role === UserRole.ADMIN){
        return {error: "ForBidden"}
    }
    return {success: "Allowed"}
}