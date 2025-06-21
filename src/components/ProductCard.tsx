import { Button, Card } from "flowbite-react";
import type { Product as PrismaProduct } from "@/generated/prisma/client";
import RatingStars from "./RatingStars";
import Link from "next/link";

type ProductCardProps = {
  product: PrismaProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      className="max-w-sm m-5"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc="/images/products/apple-watch.png"
    >
      <Link href={`/projects/products/${product.id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </Link>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      <RatingStars rating={product.rating} />
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${product.price}
        </span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
      <hr />
      <div className="flex items-end justify-end gap-2 mt-2">
        <Button color={"blue"}>Edit</Button>
        <Button color={"red"}>Delete</Button>
      </div>
    </Card>
  );
}
