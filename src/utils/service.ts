import { Order, Product, User, } from "@/types";

const BaseUrl = "http://localhost:9090";

const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BaseUrl}/orders`);
  return res.json();
};

const getProduct =async(id:string):Promise<Product>=>{

  const res = fetch (`${BaseUrl}/products/${id}`);

  return (await res).json();
};

const updateProduct= async(
  id:string,
  product:Partial<Product>
):Promise<Product>=>{

  const res =await fetch (`${BaseUrl}/products/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  return res.json();
}


const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BaseUrl}/products`,{
    
  })

  return res.json();
};

const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(`${BaseUrl}/products/${id}`, {
    method: "DELETE", // GET dışındaki isteklerde methodu belirtmek gerekiyor
  });

  return res.json();
};

const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const res = await fetch(`${BaseUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return res.json();
};


const getUsers= async():Promise<User[]> =>{

  const res = await fetch(`${BaseUrl}/users`);

  return res.json();

}


const deleteUser=async(id:string):Promise<void>=>{

  const res =await fetch(`${BaseUrl}/users/${id}`,{
    method:"DELETE",
  });
   return res.json();
}

const getUser=async(id:string):Promise<User>=>{
  
  const res= await fetch(`${BaseUrl}/users/${id}`)

  return res.json();
}


const getValue =async()=>{
  const users = await getUsers();
  const products = await getProducts();
  const orders = await getOrders();

  return{
    total_users:users.length,
    total_products:products.length,
    total_orders:orders.length,
    total_price:orders.reduce((acc,order)=>acc + order.total_price,0),
    
  }
    
  
}





export { getOrders, getProducts, deleteProduct, createProduct ,getProduct,updateProduct,getUsers,deleteUser,getUser,getValue};
