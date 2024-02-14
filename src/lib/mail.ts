import nodemailer from "nodemailer";

export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_GMAIL_PASS } = process.env;
  
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_GMAIL_PASS,
    },
  });
   // ce code pour verifie le transport
  try {
   const testResult = await transport.verify();
   console.log("Test Result Of Transport", testResult)
  } catch(e) {
   console.log("error ", e)
  }

  try {
   const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body
   });
   console.log(sendResult);
  } catch (error) {
   console.log(error);
  }
}
