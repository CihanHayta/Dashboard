import { getUsers } from "@/utils/service";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import TableWrapper from "./table-wrapper";
import BanButton from "../button/ban-button";


const UserTable = async () => {
  const user = getUsers();

  return (
    <TableWrapper>
      <thead>
        <tr className="border-b border-zinc-300 shadow">
          <th className="py-4">No</th>
          <th className="py-4">İsim</th>
          <th>Eposta</th>
          <th>Ülke</th>
          <th>Şehir</th>
          <th>Sipariş Sayısı</th>
          <th>Eylem</th>
        </tr>
      </thead>

      <tbody>
        {(await user).map((user, key) => (
          <tr key={key} className=" border-b border-zinc-300">
            <td className="py-8">{key + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address.country}</td>
            <td>{user.address.city}</td>
            <td>{user.orders.length}</td>

            <td>
              <div className="flex gap-3 items-center">
                <Link href={`?show=${user.id}`}
                className="button hover:bg-zinc-300"
                >
                  <FaEye />
                </Link>
                <BanButton user={user} id={user.id}/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default UserTable;
