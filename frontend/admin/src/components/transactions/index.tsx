import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetTransactions } from "../../lib/hooks/transaction";
import Spinner from "../micro/spinner";
import clsx from "clsx";
import dayjs from "dayjs";

const Transactions = () => {
  const { data: transactions, isLoading } = useGetTransactions();
  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="mt-10">
      <h1 className="text-2xl mb-5 font-bold">All Transactions</h1>
      <TableContainer>
        <Table
          sx={{ minWidth: 1000, cursor: "pointer" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Transaction Date</TableCell>
              <TableCell align="left"> Reference</TableCell>
              <TableCell align="left">Email Address</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Fees</TableCell>
              <TableCell align="left">Payment Channel</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">
                  {dayjs(transaction.transactionDate).format(
                    "MMM DD, YYYY • hh:mm A"
                  )}
                </TableCell>
                <TableCell align="left">{transaction.reference}</TableCell>
                <TableCell align="left">{transaction.email}</TableCell>
                <TableCell align="left">{transaction.amount}</TableCell>
                <TableCell align="left">{transaction.fees}</TableCell>
                <TableCell align="left">{transaction.paymentChannel}</TableCell>
                <TableCell
                  align="left"
                  className={clsx("!text-white", {
                    "bg-green-700/80": transaction.status === "SUCCESSFUL",
                    "bg-amber-400/70": transaction.status === "PENDING",
                    "bg-red-500/70": transaction.status === "FAILED",
                    "bg-blue-500/70": transaction.status === "AWAITING_PAYMENT",
                  })}
                >
                  {transaction.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transactions;
