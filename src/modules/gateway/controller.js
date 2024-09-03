


import constant from '../../utilities/constant.js';
import { customResponse, customPagination } from "../../utilities/customResponse.js";
import cashfree from './../../config/cashfree.js'
import { Cashfree } from "cashfree-pg"; 

export const createOrder = async (req, res) => {
    try{
        const { orderAmount, customerEmail, customerPhone } = req.body;

        Cashfree.XClientId = process.env.CASHFREE_CLIENTID;
        Cashfree.XClientSecret = process.env.CASHFREE_SECRETID;
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

        const generateOrderId = (mobileNumber) => {
            const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
            return `ORD-${mobileNumber.slice(-4)}-${datePart}-${randomPart}`; 
            // e.g., 'ORD-9999-20240830-1234' (uses last 4 digits of mobile number)
        };

        const order_id = generateOrderId(customerPhone);
        var request = {
            "order_amount": orderAmount,
            "order_currency": "INR",
            "order_id": order_id,
            "customer_details": {
                "customer_id": "my123e3234", 
                "customer_phone": customerPhone
            },
            "order_meta": {
                "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={orde7456}"
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
export const orderDetails = async (req,res)=>{
    try{
        console.log(req.body,'===>wehook data')
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: 'Success'
        }));
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
    createOrder,orderDetails
}