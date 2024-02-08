"use client";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from 'next/link';
import { useState } from "react";
import { z, refine  } from "zod";
import validator from 'validator';

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(45, "First name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No specail character allowed!"),
  lastName: z
    .string()
    .min(2, "Last name must be atleast 2 characters")
    .max(45, "Last name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No specail character allowed!"),
  email: z
    .string().email("Please enter a valid email address"),
  phone: z
    .string().refine(
      value => validator.isMobilePhone(value, 'ar-MA'),
      {
        message: 'Veuillez saisir un numéro de téléphone valide pour le Maroc!'
      }),
  password: z
    .string().min(6, "Password must be at least 6 characters")
    .max(6, "Password must be at less 6 characters"),
  confirmPassword: z
    .string().min(6, "confirm Password must be at least 6 characters")
    .max(6, "confirm Password must be at less 6 characters"),
  accepted: z.
    literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
    })
  })
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password doesn't match",
  // afficher l'erreur sur password et confirm password
  path: ["password", "confirmPassword"]
});


const SignUpForm = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
  const toggleVisiblePass = () => setIsVisiblePass(prev => !prev);
  const toggleVisibleConfirmPass = () => setIsVisibleConfirmPass(prev => !prev);
  return (
    <form className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        className="col-span-2"
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        className="col-span-2"
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
      />
      <Input
        className="col-span-2"
        label="Password"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={!isVisiblePass ? <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
        : 
        (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />)}
      />
      <Input
        className="col-span-2"
        label="Confirm Password"
        type={isVisibleConfirmPass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        endContent={!isVisibleConfirmPass ? <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisibleConfirmPass} />
        : 
        (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisibleConfirmPass} />)}
      />
      <Checkbox className="col-span-2">I Accept The <Link href="/terms" className="text-sky-600">Terms</Link></Checkbox>
      <div className="flex justify-center col-span-2">
         <Button color="primary" className="w-48" type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
