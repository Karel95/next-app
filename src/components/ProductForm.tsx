"use client";
import { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Label,
  Select,
  Textarea,
  TextInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

function ProductForm() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState("center");
  const [products, setProducts] = useState({
    name: "",
    price: "",
    description: "",
  });
  const form = useRef<HTMLFormElement | null>(null);

  // Handle input changes and update the products state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert price to a float and prepare the payload
    const payload = {
      ...products,
      price: parseFloat(products.price),
    };

    // Execute the API call to add a new product
    axios
      .post('/api/products', payload)
      .then((response) => {
        console.log("Product added successfully:", response.data.product);
        // Reset the form fields
        form.current?.reset();
        // // Optionally you can close the modal after submission
        // setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <div className="flex flex-wrap gap-4 m-5">
        <div className="w-40">
          <Select
            defaultValue="center"
            onChange={(event) => setModalPlacement(event.target.value)}
          >
            <option value="center">Center</option>
            <option value="top-left">Top left</option>
            <option value="top-center">Top center</option>
            <option value="top-right">Top right</option>
            <option value="center-left">Center left</option>
            <option value="center-right">Center right</option>
            <option value="bottom-right">Bottom right</option>
            <option value="bottom-center">Bottom center</option>
            <option value="bottom-left">Bottom left</option>
          </Select>
        </div>
        <Button onClick={() => setOpenModal(true)}>Add New Product</Button>
      </div>

      {/* <!-- Main modal --> */}
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
        dismissible
      >
        {/* <!-- Modal content --> */}
        <ModalBody className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <ModalHeader>Create New Product</ModalHeader>
          {/* <!-- Modal body --> */}
          <form onSubmit={handleSubmit} ref={form}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </Label>
                <TextInput
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-0 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </Label>
                <TextInput
                  type="float"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-0 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </Label>
                <Select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-0 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </Select>
              </div>
              <div className="col-span-2">
                <Label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                  onChange={handleChange}
                ></Textarea>
              </div>
            </div>
            <ModalFooter>
              <Button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add New Product
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProductForm;
