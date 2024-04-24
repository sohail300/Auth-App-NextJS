import nodemailer from "nodemailer";
import verificationEmail from "./verificationEmail";
import forgotPasswordEmail from "./forgotPasswordEmail";
import { uuid } from "uuidv4";
import { User } from "@/models/userModel";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ebea0e41e475c0",
    pass: "d1f73d5fc0de45",
  },
});

export async function mailer(email: any, emailType: any, userId: any) {
  try {
    const token = uuid();

    if (emailType === "verify") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      });
    } else {
      const user = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
      });
    }

    const mailOptions = {
      from: "auth@auth.ai",
      to: email,
      subject: emailType === "verify" ? "VERIFY EMAIL" : "CHANGE YOUR PASSWORD",
      html:
        emailType === "verify"
          ? verificationEmail.replace(
              /{{verificationLink}}/g,
              `${process.env.DOMAIN}/verifyEmail?token=${token}`
            )
          : forgotPasswordEmail.replace(
              /{{forgotPasswordLink}}/g,
              `${process.env.DOMAIN}/forgotPassword?token=${token}`
            ),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(info.messageId);
  } catch (error) {
    console.log(`Error sending mail: ${error}`);
  }
}
