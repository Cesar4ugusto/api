import fs from "fs";
import { resolve } from "path";
import { IStorage } from "../Interface";
import upload from "@/config/upload";

class Storage implements IStorage {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(resolve(upload.tmpFolder, file), resolve(`${upload.tmpFolder}/${folder}`, file));
        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
        try {
            await fs.promises.stat(filename);
        } catch {
            return;
        }
        await fs.promises.unlink(filename);
    }
}

export { Storage }
