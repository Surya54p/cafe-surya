"use client";
import PrimaryButton from "@/components/PrimaryButton";
import Modal from "@/components/Modal";
import DropdownFilter from "@/components/DropdownFilter";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
import { Info, Edit, Trash, Check } from "lucide-react";

type Order = {
  id: number;
  menu: string;
  name: string;
  qty: number;
  price: number;
  total: number;
  status: 'Pending' | 'Approved';
  payment: 'Cash' | 'Transfer';
};


export default function OrdersdAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filterOptions, setFilterOptions] = useState([
    { value: "all", label: "Semua" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ]);


  const orders: Order[] = [
    {
      id: 1,
      name: 'Surya',
      menu: 'kentang goreng',
      qty: 2,
      price: 25000,
      total: 50000,
      status: 'Pending',
      payment: 'Cash',
    }, {
      id: 2,
      name: 'aura',
      menu: 'kentang goreng jumbo',
      qty: 2,
      price: 25000,
      total: 50000,
      status: 'Approved',
      payment: 'Transfer',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-xl font-bold text-black">Orderan</div>
      {/* header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PrimaryButton variant="primary" onClick={() => setIsModalOpen(true)}>
            Save data
          </PrimaryButton>
          <Modal
            isOpen={isModalOpen}
            title="Choose format"
            onClose={() => setIsModalOpen(false)}
          >
            <div className="flex flex-col gap-2">
              <PrimaryButton variant="secondary">PDF</PrimaryButton>
              <PrimaryButton variant="secondary">Excel</PrimaryButton>
            </div>
          </Modal>

          <DropdownFilter
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
        </div>
        {/* input search component  */}
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search some data..."
        />
      </div>
      {/* body */}
      <div >
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="">No</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="w-[300px]">Menu</TableHead>
              <TableHead className="">Qty</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="">Total</TableHead>
              <TableHead className="">Status</TableHead>
              {/* <TableHead className="">Payment</TableHead> */}
              <TableHead className=" text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="">{order.id}</TableCell>
                <TableCell className="">{order.name}</TableCell>
                <TableCell className="">{order.menu}</TableCell>
                <TableCell className="">{order.qty}</TableCell>
                <TableCell className="">
                  Rp {order.price.toLocaleString('id-ID')}
                </TableCell>
                <TableCell className="font-semibold">
                  Rp {order.total.toLocaleString('id-ID')}
                </TableCell>
                {/* <TableCell>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                      }`}
                  >
                    {order.status}
                  </span>
                </TableCell> */}
                <TableCell>
                  <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    {order.payment}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <PrimaryButton variant="secondary"><Info size={18} /></PrimaryButton>
                    <PrimaryButton variant="secondary"><Edit size={18} /></PrimaryButton>
                    <PrimaryButton variant="secondary"><Check size={18} /></PrimaryButton>
                    <PrimaryButton variant="secondary"><Trash size={18} /></PrimaryButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}
