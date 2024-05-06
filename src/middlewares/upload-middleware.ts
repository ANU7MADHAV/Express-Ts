import { Request } from "express";
import multer from "multer";

type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
