import { auth } from "@/server/auth";
import PaymentVoucherPageClient from "./components/payment-voucher-page-client";

export const metadata = {
  title: "Payment Voucher",
};

const PaymentVoucherPage = async () => {
  const session = await auth();
  return <PaymentVoucherPageClient {...{ session }} />;
};

export default PaymentVoucherPage;
