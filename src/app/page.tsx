import icon1 from "@/assets/images/icon-1.webp";
import icon2 from "@/assets/images/icon-2.webp";
import icon3 from "@/assets/images/icon-3.webp";
import icon4 from "@/assets/images/icon-4.png";
import { InfoCardItem } from "@/types";
import InfoCard from "../components/card/Info-Card";
import SalesChart from "@/components/home/sale-chart";
import CategoryChart from "@/components/home/category-chart";
import { getValue } from "@/utils/service";

export default async function Home() {

 const value = await getValue()

 console.log(value);
 

  const cards: InfoCardItem[] = [
    {
      icon: icon1,
      label: "Toplam Kullanıcı",
      value: value.total_users *90,
    },
    {
      icon: icon2,
      label: "Toplam Sipariş",
      value: value.total_orders *72,
    },
    {
      icon: icon3,
      label: "Toplam Satış",
      value: `${value.total_price} $`,
    },
    {
      icon: icon4,
      label: "Toplam Ürün",
      value: value.total_products *52,
    },
  ];

  return (
    <div className="page">
      <h1 className="title">Admin Paneli </h1>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
        {cards.map((i, key) => (
          <InfoCard item={i} key={key} />
        ))}
      </section>

      <section className="grid lg:grid-cols-14 gap-5 my-10">
        
      <div className="lg:col-span-5">
          <SalesChart/>
        </div>

        <div className="lg:col-span-5">
          <CategoryChart/>
        </div>

      </section>

    </div>
  );
}
