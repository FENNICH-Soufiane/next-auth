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
   
   /*
   const { SMTP_EMAIL, SMTP_GMAIL_PASS } = process.env;
   const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: SMTP_EMAIL,
         pass: SMTP_GMAIL_PASS,
    },
  });
  */
  const { SMTP_USER, SMTP_PASS } = process.env;

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  // ce code pour verifie le transport
  // si tout va bien il renvoie <Test Result Of Transport true>
  try {
    const testResult = await transport.verify();
    console.log("Test Result Of Transport", testResult);
  } catch (e) {
    console.log("error ", e);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
