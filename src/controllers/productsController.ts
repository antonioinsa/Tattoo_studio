import { Request, Response } from "express";
import { Portfolio } from "../models/Portfolio";
import { Product } from "../models/Product";



const tattooArtistProducts = async (req: Request, res: Response) => {
    try {
        const { tattoo_artist_id } = req.body;
        const artistId = parseInt(tattoo_artist_id, 10);

        const portfolios = await Portfolio.find({
            where: { tattoo_artist_id: artistId },
            relations: ["productPortfolio"],

        })

        if (!portfolios || portfolios.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No portfolios found for specified tattoo artist",
            })
        }

        const productsInfo = portfolios.map((portfolio) => ({
            product_id: portfolio.product_id,
            descriptionProduct: portfolio.productPortfolio
             
        }))

        return res.status(200).json({
            success: true,
            message: "Product information received successfully",
            data: productsInfo,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Could not fetch product information",
            error: error
        })
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({

            select: ["id", "article", "description", "intervention_type"]
        })

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Products retrieved",
                    data: products
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Products cant be retrieved",
                    error: error
                }
            )
    }
}

const onlyTattooProducts = async (req: Request, res: Response) => {
    try {
        const tattooProducts = await Product.find({
            where: { intervention_type: 'tattoo'},
            select: ["id", "article", "description"]
        })

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Tattoos retrieved",
                    data: tattooProducts
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Tattoos cant be retrieved",
                    error: error
                }
            )
    }
}

const onlyPiercingProducts = async (req: Request, res: Response) => {
    try {
        const piercingProducts = await Product.find({
            where: { intervention_type: 'piercing'},
            select: ["id", "article", "description"]
        })

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Piercings retrieved",
                    data: piercingProducts
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Piercings cant be retrieved",
                    error: error
                }
            )
    }
}

export { tattooArtistProducts, getProducts, onlyTattooProducts, onlyPiercingProducts }