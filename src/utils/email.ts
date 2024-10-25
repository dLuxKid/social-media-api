import nodemailer from "nodemailer";
import AppError from "./error-handlers/app-error";

export default class Email {
  private to: string;
  private name: string;
  private from: string;
  private url?: string;
  private otp?: string;

  constructor({
    user,
    url,
    otp,
  }: {
    user: { email: string; displayname: string };
    url?: string;
    otp?: string;
  }) {
    this.to = user.email;
    this.name = user.displayname;
    this.url = url;
    this.from = `godkid <${process.env.GMAIL_EMAIL}>`;
    this.otp = otp;
  }

  newTransport() {
    return nodemailer.createTransport({
      // @ts-ignore
      service: "gmail",
      host: process.env.GMAIL_HOST,
      port: process.env.GMAIL_PORT || 587,
      // secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  send(subject: string, text: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    this.newTransport()
      .sendMail(mailOptions)
      .then(() => console.log("sent"))
      .catch((error: any) => {
        console.log(error);
        return new AppError(`Error: ${error}`, 400);
      });
  }

  sendWelcome() {
    this.send(
      "WELCOME",
      `Hello ${this.name}, welcome to my own twitter. Please complete your profile by clicking this link ${this.url}`
    );
  }

  sendResetPasswordOTP() {
    this.send(
      "PASSWORD RESET OTP",
      `YOUR RESET PASSWORD OTP (Valid for 10 minutes) is ${this.otp}`
    );
  }
}
