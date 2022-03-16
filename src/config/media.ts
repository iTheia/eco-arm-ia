import { diskStorage } from 'multer';
import { registerAs } from '@nestjs/config';
import { trimString } from '@const/util';
import { mkdirSync } from 'fs';

export default registerAs('media', () => ({
  storage: diskStorage({
    destination: (req: any, _, callback) => {
      const user = req.user;
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      let path = trimString(user.username) + year + month;
      mkdirSync(`./static/images/${path}`, { recursive: true });
      callback(null, `./static/images/${path}`);
    },
    filename: (_, file, callback) => {
      const fileName = trimString(file.originalname);
      callback(null, fileName);
    },
  }),
}));
