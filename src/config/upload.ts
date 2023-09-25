import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";
import { AppError } from "@/shared/errors/AppError";

type FileNameCallback = (error: Error | null, fileName: string) => void;
type FileFilterCallback = (error: Error | AppError | null, acceptFile: boolean) => void;

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request: Express.Request, file: Express.Multer.File, callback: FileNameCallback) => {
            const fileHash = crypto.randomBytes(16).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            callback(null, fileName);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        const mimes = ["text/csv", "image/jpeg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "application/pdf", "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

        if (mimes.includes(file.mimetype)) {
            return callback(null, true);
        } else {
            return callback(new AppError("Tipo de arquivo não permitido."), false);
        }
    },
};
