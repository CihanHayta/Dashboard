"use client";

import { deleteProduct } from "@/utils/service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    try {
      setIsLoading(false);
      await deleteProduct(id);
      router.refresh();
    } catch (error) {
      alert("İşlem başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleDelete}
      className="bg-red-600 px-3 py-1 text-white rounded text-sm hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-70"
    >
      {isLoading ? "siliniyor..." : "Sil"}
    </button>
  );
}
