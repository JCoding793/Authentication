"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {BeatLoader}  from "react-spinners"
import { CardWrapper } from "./card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
const NewVerificationForm = ()=>{
    const [error , setError] = useState<string | undefined>();
    const [success , setSuccess] = useState<string | undefined>();

    const searchParms = useSearchParams();
    const token = searchParms.get("token");
    const onSubmit = useCallback(()=>{
        if(!token) {
            setError("Missing token!");
            return;
        }
        newVerification(token).then((data)=>{
            setSuccess("Data Successfull");
            setError(data?.error);
        }).catch(()=>{
            setError("Something went worng")
        })
        console.log(token);

    }, [token]);
    useEffect(()=>{
        onsubmit;
    }, [onSubmit])
    return (
        <CardWrapper 
        headerLabel="Confirming you verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        >
        <div className="flex items-center w-full justify-center">
          {!success && !error && (<BeatLoader />)}
 
          <FormSuccess message={success}/>
          <FormError message={error} />
        </div>
        </CardWrapper>
    )
}

export default NewVerificationForm;