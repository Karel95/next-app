import { notFound } from 'next/navigation';
import { prisma } from '@/libs/prisma';
import type { Product as PrismaProduct } from "@/generated/prisma/client";
import React from 'react'
import ProductForm from '@/components/ProductForm';

interface ProdPageProps {
  params: {
    productid: string;
  };
}

async function loadProduct(id: number): Promise<PrismaProduct | null> {
  const res = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return res;
}

async function EditPage({ params }: ProdPageProps) {
  const productId = parseInt(params.productid, 10);
  const product = await loadProduct(productId);
  if (!product) {
    notFound();
  }

  return (
      <div className="flex items-center justify-start h-auto">
        <ProductForm key={product?.id} product={product} />
      </div>
    );
}

export default EditPage