import Redis from 'ioredis';
import crypto from 'node:crypto'
import { Request, Response } from 'express'
import { convertToBase62 } from '../utils/conveterTobase62';
import { URLModel } from '../models/URL';
import { validateUrl } from '../utils/validateUrl';
import redis from '../lib/redis';

export class ShortenUrlController {
  public async handle(req: Request, res: Response): Promise<Response> {

    const { longUrl } = req.body;

    if(validateUrl(longUrl) === false) {
      return res.status(400).json({ message: 'Invalid URL' });
    }

    const identifier = crypto.randomBytes(8).toString('hex');

    const identifierBase62 = convertToBase62(parseInt(identifier, 16));
    
    const shortUrl = `http://localhost:3333/${identifierBase62}`;

    const doc = new URLModel({
      id: identifier,
      longURL: longUrl,
      shortURL: shortUrl
    });

    const result = await doc.save();

    const success = await redis.set(shortUrl, longUrl, 'EX', 60);

    if(success === 'OK') console.log('URL saved in cache');

    if (!result.id) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.json({ shortUrl });
  }
}