"use client";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import DropdownFilter from "@/components/DropdownFilter";
import SearchInput from "@/components/SearchInput";
import Modal from "@/components/Modal";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // shadcn/ui table

interface ContentFormData {
  name: string;
  price: string;
  description: string;
  type: string;
  status: string;
}

interface MenuItem {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  status: string;
}

export default function ContentManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Cheeseburger",
      type: "food",
      price: 5,
      description: "Juicy beef burger with cheese",
      status: "available",
    },
    {
      id: 2,
      name: "Cappuccino",
      type: "drink",
      price: 3,
      description: "Hot coffee with milk foam",
      status: "unavailable",
    },
  ]);

  const [formData, setFormData] = useState<ContentFormData>({
    name: "",
    price: "",
    description: "",
    type: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Reset form
    setFormData({ name: "", price: "", description: "", type: "", status: "" });
    setIsModalOpen(false);
  };

  const filterOptions = [
    { value: "all", label: "Semua" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    // nanti bisa buka modal edit
    alert(`Edit menu with ID: ${id}`);
  };
  return (
    <div className="space-y-8">
      <div className="text-xl font-bold text-black">Content management</div>
      {/* HEADER CONTENT MANAGEMENT */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PrimaryButton variant="primary" onClick={() => setIsModalOpen(true)}>
            Add content
          </PrimaryButton>
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
          placeholder="Cari konten..."
        />
      </div>
      {/* table */}
      <div className="mt-4 ">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="flex justify-center items-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id} className="border-b border-gray-300">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <PrimaryButton
                    variant="secondary"
                    onClick={() => handleEdit(item.id)}
                  >
                    <Pencil size={18} />
                  </PrimaryButton>
                  <PrimaryButton
                    variant="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash size={18} />
                  </PrimaryButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Menu"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Menu Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter menu name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter menu description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select type</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
