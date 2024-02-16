import SigninForm from "@/app/components/SigninForm";
import Link from "next/link";


interface Props {
   searchParams: {
      callbackUrl?:string
   }
}

const SigninPage = ({searchParams}: Props) => {
   console.log({searchParams});
   
  return (
    <div className="flex items-center justify-center flex-col w-1/2 mx-auto">
      <SigninForm searchParams={searchParams.callbackUrl}/>
      <Link href={"/auth/forgotPassword"}>Forgot your password</Link>
    </div>
  );
};

export default SigninPage;
