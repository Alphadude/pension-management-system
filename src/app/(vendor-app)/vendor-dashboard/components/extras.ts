export const invoiceTableHeadings = [
  "Date",
  "Invoice Number",
  "Amount",
  "Status",
];

export const getInvoiceStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "success":
      return "border-[#BBF7D0] bg-[#DCFCE7] text-[#13A382]";
    case "awaiting":
      return "border-[#FCEFC7] bg-[#FFF9E6] text-[#FFC107]";
    case "rejected":
      return "border-[#FECDD3] bg-[#FEE2E2] text-[#DC2626]";
    default:
      return "";
  }
};
