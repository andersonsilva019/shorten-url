import { Request, Response } from 'express'
import { URLModel } from '../models/URL';

export class GetOriginalURLController {
  public async handle(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params;
    
    const shortUrl = `http://localhost:3333/${id}`;

    const document = await URLModel.findOne({
      shortURL: shortUrl
    })

    if(!document){
      return res.status(404).json({ message: 'URL not found' });
    }

    return res.status(301).set('location', document.longURL as string).send();
  }
}