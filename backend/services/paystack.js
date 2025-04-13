import PaystackApi from "paystack-api";

export const Paystack = PaystackApi(process.env.PAYSTACK_SECRET_KEY);
