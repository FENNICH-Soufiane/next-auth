"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { forgotPassword } from "@/lib/actions/authAction";
import { toast } from "react-toastify";


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

  // const submitRequest:SubmitHandler<InputType> =async (data) => {
  //   // console.log(data) pour afficher les données saisi
  //   try {
  //     const result = await forgotPassword(data.email);
  //     if(result) toast.success('Reset password link was send to your email');
  //     console.log(result);
  //     reset();
  //   } catch(e) {
  //     toast.error("Something went wrong!");
  //     // console.log(e);
  //   }
  // }
  
// const submitRequest: SubmitHandler<InputType> = async (data) => {
//   try {
//     const result = await forgotPassword(data.email);
//     console.log("cest vreais");
//     if (result !== undefined) {
//       toast.success('Reset password link has been sent to your email');
//       console.log("++++++++" + result);
//       reset(); // Réinitialiser le formulaire après l'envoi réussi
//     } else {
//       console.log("+" + result);
//       toast.error('Failed to send reset password link. Please try again later.');
//     }
//   } catch (error) {
//     toast.error('Something went wrong while sending reset password link. Please try again later.');
//     console.error(error);
//   }
// }

const submitRequest: SubmitHandler<InputType> = async (data) => {
  try {
    const result = await forgotPassword(data.email);
    // if (result) toast.success("Reset password link was sent to your email.");
    toast.success("Reset password link was sent to your email.");
    reset();
  } catch (e) {
    console.log(e);
    toast.error("Something went wrong!");
  }
};

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
