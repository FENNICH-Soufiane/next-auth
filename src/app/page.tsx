import { sendMail } from "@/lib/mail";
import Image from "next/image";

export default async function Home() {
  await sendMail({to:"fennich.soufiane.fs@gmail.com", subject: "test", body: "hello word"});
  return (
    <>Fennich soufiane va devenir un tres bon developpeur informatique</>
  );
}
