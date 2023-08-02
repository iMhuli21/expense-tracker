import Navbar from "../components/Navbar";
import Transaction from "../components/Transaction";
import AddTransaction from "../components/AddTransaction";
import TransactionHeader from "../components/TransactionHeader";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../App";
import { toast } from "react-toastify";
import { updateContext, tokenContext } from "../context/contex";


const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [update, setUpdate] = useContext(updateContext);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);

  let totalExpenses = [];
  let totalIncome = [];

  const getData = async () => {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (data.msg) {
      toast.error(data.msg, options);
    } else {
      setTransactions(data);

      totalExpenses = [];
      totalIncome = [];

      data.forEach((item) => {
        if (item.transactionType === "Expense") {
          totalExpenses.push(Number(item.cost));
        } else {
          totalIncome.push(Number(item.cost));
        }
      });

      totalExpenses.length !== 0
        ? setExpenses(totalExpenses.reduce((total, num) => total + num))
        : setExpenses(0);

      totalIncome.length !== 0
        ? setIncome(totalIncome.reduce((total, num) => total + num))
        : setIncome(0);
    }
  };

  const logout = () => {
    //remove token
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (user.token) {
      getData();
    } else {
      navigate("/login");
    }
  }, [user, update]);

  return (
    <tokenContext.Provider value={[user, setUser]}>
      {user.token && (
        <div>
          <Navbar currentPage={"home"} />
          <div className="container mx-auto flex flex-col items-center justify-center mt-10 font-poppins space-y-4 pb-4 px-5">
            <TransactionHeader income={income} expenses={expense} />
            <span>Transactions</span>
            <div className="transactions flex flex-col items-center w-full md:w-7/12 space-y-4 bg-gray-100 rounded-lg overflow-scroll h-72 p-4">
              {transactions.length === 0
                ? "No transactions...."
                : transactions.map((item) => (
                    <Transaction key={item._id} transaction={item} />
                  ))}
            </div>
            <AddTransaction />
          </div>
          <div className="flex flex-col items-center space-y-4 font-poppins md:hidden">
            <span className="text-sm font-normal">Logged In as <span className="border-b-2 border-lightBlack">{user.email}</span></span>
            <button
              className="text-sm font-poppins font-medium uppercase tracking-wide border-2 border-red-600 p-2 rounded hover:bg-red-500 hover:text-white hover:transition-all hover:duration-300"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </tokenContext.Provider>
  );
};

export default Home;
