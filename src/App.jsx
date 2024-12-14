import React, { useState, useEffect } from "react";
import FilterLogo from "../public/Filter.svg";
import Plus from "../public/Button.svg";
import Search from "../public/search.svg";
import Delete from "../public/Delete.svg";
import Edit from "../public/Edit.svg";
const App = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    description: "",
    rate: "",
    balance: "",
    deposit: "",
    status: "ACTIVE",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
    console.log(customers);
  }, []);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  function validate() {
    if (newCustomer.name.length < 4) {
      alert("Name 4 ta belgidan kichik bolishi mumkin emas");
      return false;
    }
    if (newCustomer.description.length < 10) {
      alert("Izoh 10 ta belgidan kichik bolishi mumkin emas");
      return false;
    }
    if (newCustomer.rate == 0) {
      alert("Rate 0ga teng yoki kichik bolishi mumkin emas");
      return false;
    }
    if (newCustomer.balance == 0) {
      alert("Balance 0 ga teng yoki kichik bolishi mumkin emas");
      return false;
    }
    if (newCustomer.deposit == 0) {
      alert("Depozit 0 ga teng yoki kichik bolishi mumkin emas");
      return false;
    }
    return true;
  }
  function handleAddCustomer() {
    if (validate()) {
      if (editIndex !== null) {
        const updatedCustomers = [...customers];
        updatedCustomers[editIndex] = newCustomer;
        setCustomers(updatedCustomers);
        setEditIndex(null);
      } else {
        setCustomers([...customers, newCustomer]);
      }
      setNewCustomer({
        name: "",
        description: "",
        rate: "",
        balance: "",
        deposit: "",
        status: "ACTIVE",
      });
    }
    setIsModalActive(true);
  }

  const handleEdit = (index) => {
    setNewCustomer(customers[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Rost dan ham ochirmoqchimisiz?")) {
      const updatedCustomers = customers.filter((_, i) => i !== index);
      setCustomers(updatedCustomers);
    }
  };

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-xl font-bold mb-4">Customer List</h1>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-8">
          <img src={FilterLogo} alt="filter icon" width={20} height={20} />
          <div className="flex items-center gap-2 rounded-md border-gray-300 border px-2 py-1">
            <img src={Search} alt="search icon" />
            <input
              type="search"
              className="outline-none"
              placeholder="Search"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsModalActive(!isModalActive);
          }}
          className="button bg-[#0A65FF] text-white rounded-[4px] p-3 flex items-center gap-2"
        >
          <img src={Plus} alt="plus" width={20} height={20} />
          Add Customer
        </button>
      </div>

      {isModalActive && (
        <div className="absolute w-[400px]  left-[40%] top-[20%] bg-slate-600 right-[30%]">
          <div className="mb-4 flex items-center  flex-col px-5 pt-16 pb-10 gap-4 relative">
            <button
              onClick={() => {
                setIsModalActive(false);
              }}
              className="absolute top-4 right-5 text-2xl text-white"
            >
              X
            </button>
            <input
              className="border border-black rounded-lg w-full input p-2"
              name="name"
              placeholder="Name"
              type="text"
              value={newCustomer.name}
              onChange={handleInputChange}
            />
            <input
              className="border border-black rounded-lg w-full input p-2"
              name="description"
              placeholder="Description"
              value={newCustomer.description}
              onChange={handleInputChange}
            />
            <input
              className="border border-black rounded-lg w-full input p-2"
              name="rate"
              type="number"
              placeholder="Rate"
              value={newCustomer.rate}
              onChange={handleInputChange}
            />
            <input
              className="border border-black rounded-lg w-full input p-2"
              name="balance"
              placeholder="Balance"
              type="number"
              value={newCustomer.balance}
              onChange={handleInputChange}
            />
            <input
              className="border border-black rounded-lg w-full input p-2"
              name="deposit"
              placeholder="Deposit"
              type="number"
              value={newCustomer.deposit}
              onChange={handleInputChange}
            />
            <select
              className="border border-black rounded-lg w-full input p-2 bg-white"
              name="status"
              value={newCustomer.status}
              onChange={handleInputChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => {
                handleAddCustomer();
                setIsModalActive(false);
              }}
            >
              {editIndex !== null ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </div>
      )}

      <div className="list-disc pl-6   ">
        <div>
          <ul className="flex items-center justify-around ">
            <li className="text-[#606F89] font-semibold text-[12px]">NAME</li>
            <li className="text-[#606F89] font-semibold text-[12px]">
              DESCRIPTION
            </li>
            <li className="text-[#606F89] font-semibold text-[12px]">RATE</li>
            <li className="text-[#606F89] font-semibold text-[12px]">
              BALANCE
            </li>
            <li className="text-[#606F89] font-semibold text-[12px]">
              DEPOSIT
            </li>
            <li className="text-[#606F89] font-semibold text-[12px]">STATUS</li>
            <li className="text-[#606F89] font-semibold text-[12px]">...</li>
          </ul>
        </div>

        {customers.map((customer, index) => (
          <ul
            key={index}
            className="mb-2 flex items-center justify-around  pl-5 gap-4 mt-5"
          >
            <li className="line-clamp-1 ">{customer.name}</li>
            <li className="line-clamp-2 ">{customer.description}</li>
            <li className="line-clamp-1 ">{customer.rate}</li>
            <li className="line-clamp-1 ">{customer.balance}</li>
            <li className="line-clamp-1 ">{customer.deposit}</li>
            <li className="line-clamp-1 ">{customer.status}</li>
            <div className="mt-2 flex gap-4">
              <button
                className=" text-white px-2 py-1 mr-2"
                onClick={() => {
                  handleEdit(index);
                  setIsModalActive(true);
                }}
              >
                <img src={Edit} alt="edit" width={20} height={20} />
              </button>
              <button
                className=" text-white px-2 py-1"
                onClick={() => handleDelete(index)}
              >
                <img src={Delete} alt="edit" width={20} height={20} />
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;
