import { Router } from 'express'
import { ShortenUrlController } from '../controllers/shortenUrl'
import { GetOriginalURLController } from '../controllers/getOriginalUrl'

const urlRoutes = Router();

const shortenUrlController = new ShortenUrlController();
const getOriginalURLController = new GetOriginalURLController();

urlRoutes.post('/shorten', shortenUrlController.handle)
urlRoutes.get('/:id', getOriginalURLController.handle)

export { urlRoutes }