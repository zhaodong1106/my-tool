import React, { useEffect, useState } from 'react'
import {useForm,r} from 'react-hook-form';

const FormTest = () => {
    const {register,handleSubmit,setValue}=useForm();
   
    const onSUbmit=(e)=>{
        console.log(JSON.stringify(e));

    }
    useEffect(()=>{
        setValue('name',"zhaodong");
        setValue("age",11);
    },[])
  return (
    <div>
        <form  onSubmit={handleSubmit(onSUbmit)}>
            <input type="text"  {...register('name')} disabled/>
            <input type="text" {...register('age')}/>
            <input type="text" {...register('phone')}/>
            <input type="submit" value="submit" />
        </form>
    </div>
  )
}

export default FormTest