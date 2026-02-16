import { type ReactNode } from "react";
import DataNotFound from "./data-not-found";
import { TableSkeleton } from "./table-skeleton";

type TableWrapperProps<T> = {
  isLoading: boolean;
  data?: T[];
  table: (data: T[]) => ReactNode;
  skeletonRow: number;
  skeletonCol: number;
  notFoundMessage?: string;
  emptyComponent?: ReactNode;
};

const TableWrapper = <T,>({
  isLoading,
  data,
  table,
  skeletonRow,
  skeletonCol,
  notFoundMessage = "No data found",
  emptyComponent,
}: TableWrapperProps<T>) => {
  if (isLoading) {
    return <TableSkeleton row={skeletonRow} col={skeletonCol} />;
  }

  if (!data?.length) {
    return <>{emptyComponent ?? <DataNotFound message={notFoundMessage} />}</>;
  }

  return table(data);
};

export default TableWrapper;
