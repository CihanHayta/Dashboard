import { getProducts } from "@/utils/service";

import { ChartData } from "@/types";
import DoughnutGraph from "../graphic/doughnut-graoh";

export default async function CategoryChart() {
  const products = await getProducts();

  const labels = [...new Set(products.map((Product) => Product.category))];


  const object: Record<string, number> = {};

  /*  urunleri gatorisine ve miktarina gore ayridik electorni:5 gibi ve yukaridaki object dizisiin icinde yaptik   */

  products.forEach((Product) => {
    object[Product.category] = (object[Product.category] || 0) + 1;
  });

  /*   object nesnesiin icindeki elektorink:5 verisini valuesunu aldik yani sadece 5 sayisini o 5 ise yukaridaki fonsyonun 
  
   kategorileri filterdek topladigi sayidi

      const values = Object.values(object);
  */

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: "Kategorideki Ürün Sayısı",
        data: Object.values(object),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-5">
      <h2 className="subtitle">Kategori Grafiği</h2>

      <DoughnutGraph data={data} />
    </div>
  );
}
