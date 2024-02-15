"use server";

import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { compileActivationTemplate, sendMail } from '../mail';
import { signJwt, verifyJwt } from '../jwt';

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">) {
    const result = await prisma?.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10)
        }
    });

    const jwtUserId = signJwt({
        id: result.id
    })

    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
    const body = compileActivationTemplate(user.firstName, activationUrl);
    await sendMail({to: user.email, subject: "Acivate Your Account", body});
    return result;
}

type ActivateUserFun = (
    jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser:ActivateUserFun = async (jwtUserID) => {
    const payload = verifyJwt(jwtUserID);
    const userId = payload?.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if(!user) return "userNotExist";
    if(user.emailVerified) return "alreadyActivated";
    const result = await prisma.user.update({
        where: {
            id:userId
        },
        data: {
            emailVerified: new Date()
        }
    })
    return "success";
}