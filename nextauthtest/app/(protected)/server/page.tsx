import {auth} from "@/auth"
import { UserInfo } from "@/components/user-info";
    const ServerPage = async () =>{
        const session =  await auth();
    return (
        <div>
           <UserInfo 
          label="💻 Server Component"
          user={session?.user}/> 
        </div>
    )
}
    
export default ServerPage;