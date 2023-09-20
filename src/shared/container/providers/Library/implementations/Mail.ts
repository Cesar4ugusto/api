import fs from "fs";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import { AppError } from "@/shared/errors/AppError";
import { IMail } from "../Interface";


class Mail implements IMail {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = transporter;
            })
            .catch(err => {
                throw new AppError("Email error");
            });
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const template = fs.readFileSync(path).toString("utf-8");
        const parser = handlebars.compile(template);
        const body = parser(variables);

        await this.client.sendMail({
            to,
            from: "Dev Planet <noreplay@devplanet.com.br>",
            subject,
            html: body,
        });
    }
}

export { Mail };
