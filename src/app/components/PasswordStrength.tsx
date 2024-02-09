import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
// import { cn } from "clsx-tailwind-merge";

interface Props {
  passStrength: number;
}

const PasswordStrength = ({ passStrength }: Props) => {
  return (
   <div
  className={twMerge("col-span-2 flex gap-2", clsx({
   //  "justify-around": passStrength === 3,
   //  "justify-start": passStrength < 3,
  }))}
>
  {Array.from({ length: passStrength + 1 }).map((i, index) => (
    <div
      key={index}
      className={twMerge("h-2 w-32 rounded-md", clsx({
        "bg-red-500": passStrength === 0,
        "bg-orange-500": passStrength === 1,
        "bg-yellow-500": passStrength === 2,
        "bg-green-500": passStrength === 3,
      }))}
    ></div>
  ))}
</div>
  );
};

export default PasswordStrength;