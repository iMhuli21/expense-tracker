import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useRef, useState, useContext } from "react";
import { toast } from "react-toastify";
import { options } from "../App";
import { updateContext, tokenContext } from "../context/contex";

const AddTransaction = () => {
  const [openModal, setOpenModal] = useState(undefined);
  const [user, setUser] = useContext(tokenContext);
  const [update, setUpdate] = useContext(updateContext);
  let transactionCostRef = useRef();
  let transactionDateRef = useRef();
  let transactionDescRef = useRef();
  let transactionTypeRef = useRef();

  const addTransaction = async () => {
    if (
      !transactionCostRef.current.value ||
      !transactionDateRef.current.value ||
      !transactionDescRef.current.value ||
      !transactionTypeRef.current.value
    ) {
      toast.error("All Fields are required", options);
    } else {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        body: JSON.stringify({
          cost: transactionCostRef.current.value,
          date: transactionDateRef.current.value,
          description: transactionDescRef.current.value,
          transactionType: transactionTypeRef.current.value
        }),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.msg) {
        toast.error(data.msg, options);
      } else {
        toast.success("Transaction has been added to the system", options);

        setOpenModal(undefined);
        setUpdate(true);
        setTimeout(() => {
          setUpdate(false);
        }, 2000);
      }
    }
  };
  return (
    <>
      <button
        onClick={() => setOpenModal("form-elements")}
        className="bg-white p-2 text-blue-500 rounded-lg border border-gray-300 hover:opacity-80 hover:shadow-[5px_5px_gray] hover:transition-all hover:duration-300"
      >
        Add Transaction
      </button>
      <Modal
        show={openModal === "form-elements"}
        popup
        size="lg"
        onClose={() => setOpenModal(undefined)}
        className="font-poppins"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl text-lightBlack">Add Transaction</h3>
            <div>
              <div className="mb-2 block ">
                <Label
                  htmlFor="Value"
                  value="Value"
                  className="text-lightBlack text-sm"
                />
              </div>
              <TextInput
                id="Value"
                required
                type="number"
                ref={transactionCostRef}
                sizing="md"
                placeholder="R2000.00"
              />
            </div>

            <div>
              <div className="mb-2 block ">
                <Label
                  htmlFor="transactionDate"
                  value="Transaction date"
                  className="text-lightBlack text-sm"
                />
              </div>
              <TextInput
                id="transactionDate"
                required
                type="date"
                ref={transactionDateRef}
                sizing="md"
              />
            </div>
            <div>
              <div className="mb-2 block ">
                <Label
                  htmlFor="description"
                  value="Transaction description"
                  className="text-lightBlack text-sm"
                />
              </div>
              <TextInput
                id="description"
                required
                type="text"
                ref={transactionDescRef}
                sizing="md"
                placeholder="Uber eats"
              />
            </div>

            <div>
              <div className="mb-2 block ">
                <Label
                  htmlFor="transactionType"
                  value="Transaction type"
                  className="text-lightBlack text-sm"
                />
              </div>
              <Select id="transactionType" required ref={transactionTypeRef}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Select>
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                className="bg-emerald-700 hover:bg-emerald-800 font-medium p-2 text-white rounded-lg"
                onClick={addTransaction}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTransaction;
