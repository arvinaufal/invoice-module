import { IoChevronBack } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { useEffect, useState } from "react";
import ComboBox from "../mui/autocomplete";
import ProductsJSON from "../../../data/products.json";
import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useSelector, useDispatch } from 'react-redux';
import { showInvoiceList } from '../../../redux/visibilitySlice';

export default function Form() {
  const showList = useSelector((state) => state.visibility.showInvoiceList);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    salespersonName: "",
    selectedProducts: [],
    date: "",
    note: ""
  });

  const [errors, setErrors] = useState({
    customerName: false,
    salespersonName: false,
    date: false,
    products: false 
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      selectedProducts: selectedProducts,
    }));
  }, [selectedProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate customerName
    if (!form.customerName.trim()) {
      newErrors.customerName = true;
      valid = false;
    }

    // Validate salespersonName
    if (!form.salespersonName.trim()) {
      newErrors.salespersonName = true;
      valid = false;
    }

    // Validate date
    if (!form.date.trim()) {
      newErrors.date = true;
      valid = false;
    }

    // Validate selectedProducts
    if (selectedProducts.length === 0) {
      newErrors.products = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSelect = (selectedProducts) => {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      quantity: product.quantity || 1,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (productId, increment) => {
    setSelectedProducts((prevSelected) => {
      const updatedProducts = prevSelected.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + increment),
            }
          : product
      );

      return updatedProducts.filter((product) => product.quantity > 0);
    });
  };

  const addInvoice = () => {
    if (validateForm()) {
      axios.post('http://localhost:3000/invoices/add', form)
        .then(response => {
          Report.success(
            'Success',
            response.data.message,
            'Okay',
            () => {
              setForm({
                customerName: "",
                salespersonName: "",
                selectedProducts: [],
                date: "",
                note: ""
              });
              setSelectedProducts([]);
              dispatch(showInvoiceList());
            }
          );

        })
        .catch(error => {
          Report.failure(
            'Failed',
            response.data.message,
            'Okay',
          );
        });

    } else {
      console.log('Form has errors. Please fill in all required fields.');
    }
  };

  return (
    <section id="form" className="flex flex-col w-full min-h-screen">
      <div className="flex flex-row justify-center items-center mt-6 mb-4 pr-4 gap-4">
        <div className="flex flex-row p-1 bg-blue-400 rounded-full justify-center items-center shadow-lg cursor-pointer hover:bg-blue-500 transition-all duration-500 ease-in-out" onClick={() => {
            setForm({
              customerName: "",
              salespersonName: "",
              selectedProducts: [],
              date: "",
              note: ""
            });
            setSelectedProducts([]);
            dispatch(showInvoiceList());
          }}>
          <IoChevronBack size={40} color="white" className="relative right-1" />
        </div>
        <div className="flex flex-row px-6 pt-1 pb-2 bg-blue-400 rounded-full justify-center items-center shadow-lg">
          <span className="italic font-bold text-3xl text-white cursor-default">Invoice Form</span>
        </div>
      </div>
      <div className="w-full flex items-center px-44 mt-8 mb-10">
        <div className="flex w-1/2 justify-start">
          <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="date" className="text-xl font-semibold text-sky-700">Date :</label>
            <input
              type="date"
              name="date"
              id="date"
              className={`border-[1.5px] border-sky-200 rounded-lg py-1 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out outline-none ${
                errors.date ? 'border-red-500' : ''
              }`}
              onChange={handleChange}
              value={form.date}
            />
          </div>
            {errors.date && (
              <div className="text-red-500 text-sm">Date is required!</div>
            )}
          </div>
        </div>
        <div className="flex w-1/2 justify-end ">
          <div
            className="px-4 py-1 bg-sky-500 hover:bg-sky-600 rounded-full cursor-pointer flex justify-center items-center gap-4 shadow-xl"
            onClick={addInvoice}
          >
            <TiPlus size={24} color="white" />
            <span className="text-white text-xl italic">Add Invoice</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-14 mx-16 mb-12">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="flex flex-col w-2/3 gap-3">
            <label
              htmlFor="customerName"
              className="text-lg font-semibold italic text-sky-600 flex flex-row justify-center items-center gap-3"
            >
              <FaRegUserCircle size={24} />
              <span className="gap-0">
                Customer Name
                <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              className={`px-3 border-[1.5px] border-sky-200 rounded-lg py-1 focus:bg-sky-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out outline-none bg-sky-50 ${
                errors.customerName ? 'border-red-500' : ''
              }`}
            />
            {errors.customerName && (
              <div className="text-red-500 text-sm">Customer Name is required!</div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="flex flex-col w-2/3 gap-3">
            <label
              htmlFor="salespersonName"
              className="text-lg font-semibold italic text-sky-600 flex flex-row justify-center items-center gap-3"
            >
              <FaClipboardUser size={24} />
              <span className="gap-0">
                Salesperson Name
                <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              id="salespersonName"
              name="salespersonName"
              value={form.salespersonName}
              onChange={handleChange}
              className={`px-3 border-[1.5px] border-sky-200 rounded-lg py-1 focus:bg-sky-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out outline-none bg-sky-50 ${
                errors.salespersonName ? 'border-red-500' : ''
              }`}
            />
            {errors.salespersonName && (
              <div className="text-red-500 text-sm">Salesperson Name is required!</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-16 mb-8">
        <div className="flex flex-col w-full justify-center px-16 items-center">
          <div className="flex flex-col w-full gap-3">
            <label
              htmlFor="note"
              className="text-lg font-semibold italic text-sky-600 flex flex-row justify-center items-center gap-3"
            >
              <FaNoteSticky size={24} />
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={handleChange}
              className="px-3 py-2 border-[1.5px] border-sky-200 rounded-lg focus:bg-sky-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out outline-none bg-sky-50 h-32 resize-none"
              placeholder="Enter your note here..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-16 mt-4 justify-center items-center">
        <div className="flex flex-row justify-center items-center w-1/2 mb-2">
          <div className="flex w-full flex-col gap-4 items-start">
            <label
              className="text-lg font-semibold italic text-sky-600 flex flex-row justify-center items-center gap-3"
            >
              <FaCartPlus size={24} />
              <span className="gap-0">
                Products
                <span className="text-red-600">*</span>
              </span>
            </label>
            <ComboBox
              products={ProductsJSON}
              onSelect={handleSelect}
              selectedProducts={selectedProducts}
              className={`${
                errors.products ? 'border-red-500' : ''
              }`}
            />
            {errors.products && (
              <div className="text-red-500 text-sm">At least one product is required!</div>
            )}
          </div>
        </div>
        <div className="mt-4 w-1/2 overflow-y-auto h-48 mx-16">
          {selectedProducts.map((product) => (
            <div key={product.id} className="p-2 border rounded mb-2">
              <div className="flex justify-between items-center">
                <div>
                  {product.name} - ${product.price} (Stock: {product.stock})
                </div>
                <div className="flex items-center">
                  <button
                    className={`flex w-full px-2 py-1 bg-blue-500 text-white rounded-md mr-2 disabled:bg-blue-300 ${
                      product.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className={`px-2 py-1 bg-blue-500 text-white rounded-md ml-2 disabled:bg-blue-300 ${
                      product.quantity === product.stock ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleQuantityChange(product.id, 1)}
                    disabled={product.quantity === product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

