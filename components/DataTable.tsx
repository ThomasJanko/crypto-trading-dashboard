import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <Table className={cn('custom-scrollbar', tableClassName)}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className={headerClassName}>
        <TableRow className={cn('hover:bg-transparent!', headerRowClassName)}>
          {columns.map((column) => (
            <TableHead
              key={column.header as string}
              className={cn(
                'bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5',
                headerCellClassName,
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={rowKey(row, index)}
            className={cn(
              'overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30! relative',
              bodyRowClassName,
            )}
          >
            {columns.map((column) => (
              <TableCell
                key={column.header as string}
                className={cn('py-4 first:pl-5 last:pr-5', bodyCellClassName)}
              >
                {column.cell(row, index)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
