import ProductForm from "@/components/ProductForm";
import { prisma } from "@/libs/prisma";
import type { Product as PrismaProduct } from "@/generated/prisma/client";
import { ProductCard } from "@/components/ProductCard";


async function loadProducts(): Promise<PrismaProduct[]> {
  const data = await prisma.product.findMany();
  return data;
}

async function ProductsPage() {
  // Load products when the component mounts
  const products = await loadProducts();
  console.log(`Products:\n${JSON.stringify(products, null, 2)}`);

  return (
    <>
      <ProductForm />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
