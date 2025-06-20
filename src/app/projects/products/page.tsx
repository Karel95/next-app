import ProductForm from '@/components/ProductForm'
import { prisma } from "@/libs/prisma";
import type { Product as PrismaProduct } from '@/generated/prisma/client';


async function loadProducts(): Promise<PrismaProduct[]> {
  const data = await prisma.product.findMany();
  return data;
}

async function ProductsPage() {
  // Load products when the component mounts
  const products = await loadProducts()
  console.log(`Products:\n${products}`)

  return (
    <>
      <ProductForm />
    </>
  )
}

export default ProductsPage