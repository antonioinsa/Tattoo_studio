import { Router } from "express";
import { tattooArtistProducts,
    getProducts,
    onlyTattooProducts,
    onlyPiercingProducts
} from "../controllers/productsController";


const router = Router()

router.post('/tattooArtistProducts', tattooArtistProducts)
router.get('/products', getProducts)
router.get('/onlytattoo', onlyTattooProducts)
router.get('/onlypiercing', onlyPiercingProducts)

export { router }