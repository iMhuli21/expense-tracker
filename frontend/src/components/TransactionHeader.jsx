const TransactionHeader = ({income, expenses}) => {
  return (
    <div className="header flex flex-col md:flex-row items-center w-7/12 justify-center">
      <div className="income w-full md:w-6/12 p-2 h-20 flex flex-col items-center justify-center shadow cursor-pointer">
        <span className="font-extrabold text-lightBlack text-xl md:text-[1.07rem]">
          Total Income
        </span>
        <span className="text-green-600 font-bold">{`R ${income.toFixed(2)}`}</span>
      </div>
      <div className="expenses w-full md:w-6/12 p-2 h-20 flex flex-col items-center justify-center shadow cursor-pointer">
        <span className="font-extrabold text-lightBlack text-xl md:text-[1.07rem]">
          Total Expenses
        </span>
        <span className="text-red-600 font-bold">{`R ${expenses.toFixed(2)}`}</span>
      </div>
      <div className="balance w-full md:w-6/12 p-2 h-20 flex flex-col items-center justify-center shadow cursor-pointer">
        <span className="font-extrabold text-lightBlack text-xl md:text-[1.07rem]">
          Your Balance
        </span>
        <span className="text-amber-950 font-bold">{`R ${(income-expenses).toFixed(2)}`}</span>
      </div>
    </div>
  );
};

export default TransactionHeader;
