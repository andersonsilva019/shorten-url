import { Request, Response } from 'express'
import { URLModel } from '../models/URL';
import redis from '../lib/redis';

export class GetOriginalURLController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {

      const { id } = req.params;

      const shortUrl = `http://localhost:3333/${id}`;

      const cachedURL = await redis.get(shortUrl);

      if (cachedURL) {
        return res.status(301).set('location', cachedURL).send();
      }
      
      const document = await URLModel.findOne({
        shortURL: shortUrl
      })

      if (!document) {
        return res.status(404).json({ message: 'URL not found' });
      }

      await document.updateOne({ $inc: { clicks: 1 } });

      return res.status(301).set('location', document.longURL as string).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}