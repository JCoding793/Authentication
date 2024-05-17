"use client"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
 import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
const AdminPage = () =>{
    const onApiRouteClick = ()=>{
        fetch("/api/admin").then((response)=>{
            if(response.ok){
               console.log("Allowed")
            }else{
                console.error("FORBIDDEN")
            }
        })
    }
    return (
       <Card>
        <CardHeader >
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
        </CardHeader>
        <CardContent className=" space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
                <FormSuccess message="You are allowed to see this content" />
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
                    Admin-only Api Route
                </p>
                <Button onClick={onApiRouteClick}>
                    Click to test
                </Button>
             </div>       
        </CardContent>
       </Card>
    )
}
export default AdminPage;