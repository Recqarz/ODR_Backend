
import { Cashfree } from "cashfree-pg"; 

Cashfree.XClientId = process.env.CASHFREE_CLIENTID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRETID;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export default Cashfree