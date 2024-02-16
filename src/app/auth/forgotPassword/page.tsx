"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";


const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest:SubmitHandler<InputType> =async (data) => {
    console.log(data)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center">
      <form className="flex flex-col gap-2 p-2 border m-2 rounded-md shadow" onSubmit={handleSubmit(submitRequest)}>
        <div>Enter Your Email</div>
        <Input
          label="Email"
          {...register("email")}
          startContent={<EnvelopeIcon className="w-4" />}
          errorMessage={errors.email?.message}
        />
        <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit" color="primary">
          {isSubmitting ? "Please..." : "Submit"}
        </Button>
      </form>
      <Image src={"/Forgot_password.png"} width={500} height={500} className="col-span-2" alt="forgot_password"/>
    </div>
  );
};

export default ForgotPassword;
