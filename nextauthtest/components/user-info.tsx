import { ExtendeUser } from "@/next-auth";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
    user? : ExtendeUser;
    label: string;
}

export const UserInfo = ({
   user,
   label
}:UserInfoProps)=>{
  return (
     <Card>
        <CardHeader>
            <p className=" text-2xl font-semibold text-center">{label}</p>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
               Id:
                </p>
                <p className=" truncate text-xs max-w[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.id}</p>
            </div>
             <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
               Name:
                </p>
                <p className=" truncate text-xs max-w[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.name}</p>
            </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
               Email:
                </p>
                <p className=" truncate text-xs max-w[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.email}</p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
              Role:
                </p>
                <p className=" truncate text-xs max-w[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">
               Two Factor Authentication:
                </p>
                <p className=" truncate text-xs max-w[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
            </div>
           
        </CardContent> 
     </Card>
  )
}