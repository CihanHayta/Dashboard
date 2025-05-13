import ImagePreview from "@/components/form/image-prewiev";
import { categories, inputs } from "@/utils/constants";
import Link from "next/link";
import Field from "../../../components/form/field";
import { Product } from "@/types";
import { createProduct, getProduct, updateProduct } from "@/utils/service";
import { notFound, redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const handlaSubmit = async (formData: FormData) => {
  "use server"; // server component yaptik

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const rating = formData.get("rating") as string;
  const reviews_count = formData.get("reviews_count") as string;
  const category = formData.get("category") as string;
  const image_url = formData.get("image_url") as string;
  const description = formData.get("description") as string;

  const productData: Omit<Product, "id"> = {
    name,
    brand,
    category,
    description,
    image_url,
    price: parseFloat(price),
    stock: parseInt(stock),
    rating: parseFloat(rating),
    reviews_count: parseInt(reviews_count),
  };



  try {
    if (id) {
      await updateProduct(id, productData);
    } else {
      await createProduct(productData);
    }

    redirect(`/products`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.log(error);
    throw new Error("Ürün oluşturma hatası");
  }
};

function ProductFrom({ product }: { product: Product | null }) {
  return (
    <form action={handlaSubmit} className="space-y-6">
      {/* düzenleme modunda handle submit içerisinde id'yi aktarabilmek için input'u gizli yapıyoruz */}
      {product && <input type="hidden" name="id" value={product?.id} />}

      <div className="grid md:grid-cols-2 gap-6">
        {/*  left part map */}
        <div className="space-y-6">
          {inputs.map((input, key) => (
            <Field key={input.name} htmlFor={input.name} label={input.label}>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                className="input "
                defaultValue={product?.[input.name as keyof Product]}
              />
            </Field>
          ))}
          {/*  selected alani */}
          <Field htmlFor="category" label="Kategori">
            <select
              name="category"
              id="category"
              className="input"
              defaultValue={product?.category}
            >
              <option value="">Kategori Seçiniz</option>
              {categories.map((cat, key) => (
                <option value="cat" key={key}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>
          {/*  selected end */}
        </div>

        {/*  right part  */}
        <div className="space-y-6">
          {/*  image input */}

          <Field htmlFor="image_url" label="Resim URL">
            <input
              type="text"
              name="image_url"
              id="image_url"
              className="input"
              required
              defaultValue={product?.image_url}
            />
          </Field>

          {/*  on izleme   */}

          <ImagePreview imageInputId="image_url" />
          {/*  aciklama  */}

          <Field htmlFor="description" label="Açıklama">
            <textarea
              name="description"
              id="description"
              className="input sm:text-sm md:min-h-[220px]"
              rows={5}
              defaultValue={product?.description}
            ></textarea>
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-md text-white transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
        >
          {product ? "Güncelle" : "Gönder"}
        </button>
      </div>
    </form>
  );
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FormPage({ params }: Props) {
  const { slug } = await params;

  // 0: edit || create urlde ki yazi
  // 1:id url deki id

  // getProduct gelen tek id verileri tutmak icin olusturdugumuz degisken
  let product: Product | null = null;

  if (slug[0] === "edit" && slug[1]) {
    try {
      product = await getProduct(slug[1]);

      if (!product) notFound();
    } catch (error) {
      notFound();
    }
  }

  const pageTitle = product ? "Ürünü Düzenle" : "Yeni Ürün Oluştur";

  return (
    <div className="page container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="title"> {pageTitle} </h1>

        <Link
          href={"/products"}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Geri
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductFrom product={product} />
      </div>
    </div>
  );
}
