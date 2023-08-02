import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { options } from "../App";
import { useContext } from "react";
import { updateContext , tokenContext} from "../context/contex";

const DeleteTransaction = ({ transaction }) => {
  const [openModal, setOpenModal] = useState(undefined);
  const [user, setUser] = useContext(tokenContext);
  const [update, setUpdate] = useContext(updateContext);

  const deleteTransaction = async () => {
    const response = await fetch(
      `http://localhost:3000/transactions/${transaction._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (data.msg) {
      toast.error(data.msg, options);
    } else {
      toast.success("Transaction has been deleted", options);
      setOpenModal(undefined);
      setUpdate(true);
      setTimeout(() => {
        setUpdate(false);
      }, 2000);
    }
  };
  return (
    <>
      <div className="delete-btn bg-gray-200 p-2 rounded hover:bg-opacity-80 hover:cursor-pointer transition-opacity duration-75 ">
        <FaTrash
          className="text-lightBlack xl:text-xl hover:text-red-600 transition-colors duration-300"
          onClick={() => setOpenModal("pop-up")}
        />
      </div>
      <Modal
        show={openModal === "pop-up"}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
        className="font-poppins"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Transaction?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteTransaction}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteTransaction;
