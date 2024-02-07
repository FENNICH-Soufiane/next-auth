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

const SignUpForm = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const toggleVisiblePass = () => setIsVisiblePass(prev => !prev);
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
        type={isVisiblePass ? "text" : "password"}
        type={!isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
      />
      <Checkbox className="col-span-2">I Accept The <Link href="/terms" className="text-sky-600">Terms</Link></Checkbox>
      <div className="flex justify-center col-span-2">
         <Button color="primary" className="w-48" type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
