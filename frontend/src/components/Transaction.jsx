import EditTransaction from "./EditTransaction";
import DeleteTransaction from "./DeleteTransaction";

const Transaction = ({ transaction }) => {
  return (
    <div
      className={
        transaction.transactionType === "Income"
          ? "transaction flex items-center justify-between w-full md:w-11/12 text-lightBlack bg-white shadow px-2 rounded border-l-4 border-green-600 cursor-pointer"
          : "transaction flex items-center justify-between w-full md:w-11/12 text-lightBlack bg-white shadow px-2 rounded border-l-4 border-red-600 cursor-pointer"
      }
    >
      <div className="info flex flex-col items-start pt-2">
        <span className="font-bold tracking-wide">{transaction.description}</span>
        <span className="text-sm">{`R ${transaction.cost}`}</span>
      </div>

      <div className="icons flex items-center space-x-4 mr-3">
        <EditTransaction transaction={transaction} />
        <DeleteTransaction transaction={transaction}/>
      </div>
    </div>
  );
};

export default Transaction;
