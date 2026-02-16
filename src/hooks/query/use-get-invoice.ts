import { dynamicQueryEndpoint } from "@/lib/utils";
import apis from "@/services/api-services";
import type { QueryParams } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import numeral from "numeral";
import { useState } from "react";
import { createQuery } from "react-query-kit";

export const useGetInvoice = () => {
  const [query, setQuery] = useState<QueryParams>({
    page: 1,
  });

  const updateQuery = <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K],
  ) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  const { data, ...rest } = useQuery({
    queryKey: ["get-invoice", query],
    queryFn: async () => {
      // @ts-expect-error typescript is not smart enough to infer the type of query
      const res = await apis.invoice.getInvoice(dynamicQueryEndpoint(query));
      return res.data;
    },
  });

  const csvData = data?.doc?.map((invoice) => ({
    Date: format(invoice?.date, "MMM d, yyyy"),
    "Invoice Number": invoice?.invoiceNumber,
    "Total Amount": `₦${numeral(invoice?.totalAmount).format("0,0.00")}`,
    Status: invoice?.status,
  }));

  return {
    ...rest,
    data,
    updateQuery,
    query,
    csvData,
  };
};

export const useGetInvoiceOverview = createQuery({
  queryKey: ["get-invoice-overview"],
  fetcher: async () => {
    const res = await apis.invoice.getInvoiceOverview();
    return res.data;
  },
});
