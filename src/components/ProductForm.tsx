"use client";
import { useEffect, useRef, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
import type { Product as PrismaProduct } from "@/generated/prisma/client";
import { FileInp } from "./FileInp";

interface ProductFormProps {
  product?: PrismaProduct | null;
}

function ProductForm({ product }: ProductFormProps) {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState("center");
  const [products, setProducts] = useState({
    name: "",
    price: "",
    rating: "",
    description: "",
  });
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const params = useParams();

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
      rating: parseFloat(products.rating),
    };

    if (!product) {
      // Execute the API call to add a new product
      axios
        .post("/api/products", payload)
        .then((response) => {
          console.log("Product added successfully:", response.data.product);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
      resetRedirect();
    } else {
      // Execute the API call to update an existing product
      axios
        .put(`/api/products/${product.id}`, payload)
        .then((response) => {
          console.log("Product updated successfully:", response.data.product);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
      resetRedirect(product.id);
    }
  };

  function handleCancelBtnClick() {
    if (!product) {
      resetRedirect();
    } else {
      resetRedirect(product.id);
    }
  }

  useEffect(() => {
    if (product) {
      console.log("Params found:", params);
      console.log(`Product:\n${JSON.stringify(product, null, 2)}`);
      // Here we can use two different approaches to handle the product data
      // Approach 1: Use the existing product data received from the parent component
      // Approach 2: Use the params object to fetch the product data.
      // In this example, we will use the first approach.
      const payload = {
        ...product,
        price: String(product.price),
        rating: String(product.rating),
        description: product.description || "",
      };
      // Update the form fields with the product data
      setProducts(payload);
      setOpenModal(true);
    } else {
      console.log("No params found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  function resetRedirect(productId?: number) {
    // Reset the form fields
    form.current?.reset();
    // Optionally you can close the modal after submission
    setOpenModal(false);
    // Redirect to the specific product page
    if (productId) {
      router.push(`/projects/products/${productId}`);
      router.refresh();
    } else {
      router.push("/projects/products");
    }
  }

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
          <div className="flex items-center justify-center my-3">
            <FileInp />
          </div>
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
                  value={products.name}
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
                  placeholder="$9.99"
                  value={products.price}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label
                  htmlFor="rating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rating
                </Label>
                <Select
                  id="rating"
                  name="rating"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-0 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={products.rating}
                  onChange={handleChange}
                >
                  <option value="">Select Rating</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
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
                  value={products.description}
                  onChange={handleChange}
                ></Textarea>
              </div>
            </div>
            <ModalFooter className="flex justify-end">
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
                {product ? "Update" : "Create"}
              </Button>
              <Button
                color="alternative"
                onClick={() => handleCancelBtnClick()}
              >
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
