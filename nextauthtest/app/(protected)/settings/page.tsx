"use client"
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { startTransition, useTransition } from "react";
const SettingPage =() =>{
const onClick =() =>{
  startTransition(()=>{
    
  })
}
    return (
        <Card>
   <CardHeader>
   <p> 🛃 Setting</p>
   </CardHeader>
<CardContent>
   <Button >
    Update Name
   </Button>
</CardContent>
        </Card>
    )
}
export default SettingPage;