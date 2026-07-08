import {Request, Response} from "express";
import {BakongKHQR,  khqrData, KHQRResponse, MerchantInfo} from "bakong-khqr";


export class PaymentController {

    generateQR(req: Request, res: Response) {

        const KHQRData: khqrData = {
            currency: {
                usd: 840,
                khr: 116,
            },
        }

        const time = Date.now() + (30 * 60 * 1000)

        const individualInfo: MerchantInfoV2 = {
            amount: 0.01,
            currency: KHQRData.currency.usd,
            merchantID: "123456",
            acquiringBank: "BAKONG Bank",
            merchantName: "Heng Kakada",
            merchantCity: "Phnom Penh",
            bakongAccountID: "hou_menghor@bkrt",
            expirationTimestamp: time.toString()
        }

        const bank = new BakongKHQR();
        const generateInfo: KHQRResponse = bank.generateMerchant(individualInfo);

        return res.json(generateInfo);
    }

    checkMd5Payment(req: Request, res: Response) {
        const {qr} = req.body;

        if(!qr){
            res.status(400).send("No qr");
        }

        console.log(qr)

        const verify = BakongKHQR.verify(qr);

        return res.status(200).json(verify);
    }

    decodePayment(req: Request, res: Response) {
        const {qr} = req.body;

        if(!qr){
            res.status(400).send("No qr");
        }

        console.log(qr)

        const decode = BakongKHQR.decode(qr);

        return res.status(200).json(decode);
    }
}

interface MerchantInfoV2 extends MerchantInfo {
    expirationTimestamp: string;
}
