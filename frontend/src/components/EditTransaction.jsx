import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { options } from "../App";
import { BsPencilSquare } from "react-icons/bs";
import { useContext } from "react";
import { updateContext, tokenContext } from "../context/contex";

const EditTransaction = ({ transaction }) => {
  const [openModal, setOpenModal] = useState(undefined);
  const [user, setUser] = useContext(tokenContext);
  const [update, setUpdate] = useContext(updateContext);

  let transactionCost = useRef();
  let transactionDate = useRef();
  let transactionDesc = useRef();
  let transactionType = useRef();

  const updateTransaction = async () => {
    if (
      !transactionCost.current.value ||
      !transactionDate.current.value ||
      !transactionDesc.current.value ||
      !transactionType
    ) {
      toast.error("All Fields are required", options);
    } else {
      const response = await fetch(
        `http://localhost:3000/transactions/${transaction._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            cost: transactionCost.current.value,
            date: transactionDate.current.value,
            description: transactionDesc.current.value,
            transactionType: transactionType.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (data.msg) {
        toast.error(data.msg, options);
      } else {
        toast.success("Transaction has been updated", options);
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
      <div className="edit-btn bg-gray-200 p-2 rounded hover:bg-opacity-80 hover:cursor-pointer transition-opacity duration-75">
        <BsPencilSquare
          className="text-lightBlack xl:text-xl"
          onClick={() => setOpenModal("form-elements")}
        />
      </div>

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
            <h3 className="text-xl text-lightBlack">Edit Transaction</h3>
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
                ref={transactionCost}
                sizing="md"
                placeholder="R2000.00"
                defaultValue={transaction.cost}
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
                ref={transactionDate}
                sizing="md"
                defaultValue={transaction.date}
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
                ref={transactionDesc}
                sizing="md"
                placeholder="Uber eats"
                defaultValue={transaction.description}
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
              <Select
                id="transactionType"
                required
                ref={transactionType}
                defaultValue={transaction.transactionType}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Select>
            </div>

            <div className="w-full flex items-center justify-center">
              <button
                className="bg-emerald-700 hover:bg-emerald-800 font-medium p-2 text-white rounded-lg"
                onClick={updateTransaction}
              >
                Update Transaction
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTransaction;
