


import constant from '../../utilities/constant.js';
import { customResponse, customPagination } from "../../utilities/customResponse.js";
import cashfree from './../../config/cashfree.js'
import { Cashfree } from "cashfree-pg"; 

export const creatOrder = async (req, res) => {
    try{
        // const { orderAmount, customerEmail, customerPhone } = req.body;

        Cashfree.XClientId = process.env.CASHFREE_CLIENTID;
        Cashfree.XClientSecret = process.env.CASHFREE_SECRETID;
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


        var request = {
            "order_amount": 1000,
            "order_currency": "INR",
            "order_id": "orde745",
            "customer_details": {
                "customer_id": "my123e3234",
                "customer_phone": "9999999999"
            },
            "order_meta": {
                "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
            }
        };
        Cashfree.PGCreateOrder("2022-09-01", request).then((response) => {
            console.log('Order Created successfully:',response.data)
            return res.status(constant.HTTP_200_CODE).send(customResponse({
                code: constant.HTTP_200_CODE,
                message: 'Dont know i',
                data:response.data
            }));

        }).catch((error) => {
            console.error('Error:', error.response.data.message);
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: 'Not generated',
                err:error
            }));
        });

    }
    catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
}

export default {
    creatOrder
}