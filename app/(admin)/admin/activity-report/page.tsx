"use client";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import DropdownFilter from "@/components/DropdownFilter";
import SearchInput from "@/components/SearchInput";
import Modal from "@/components/Modal";
import ActivityReportSection from "@/components/ActivityReportSection";
import MoneyReportSection from "@/components/MoneyReportSection";
import SideInfoCard from "@/components/SideInfoCard";

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
export default function LaporanAktivitas() {
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

  const incomeChartData = [
    { name: "08:00", thisYear: 500000, lastYear: 300000 },
    { name: "10:00", thisYear: 1200000, lastYear: 800000 },
    { name: "12:00", thisYear: 2000000, lastYear: 1500000 },
    { name: "14:00", thisYear: 1700000, lastYear: 1300000 },
    { name: "16:00", thisYear: 900000, lastYear: 700000 },
  ];

  const topProductsData = [
    { menuName: "Cappuccino", orders: 120 },
    { menuName: "Cheeseburger", orders: 95 },
    { menuName: "French Fries", orders: 80 },
  ];
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

  const monthlyIncomeData = {
    heading: "Pendapatan Bulan Ini",
    items: [
      {
        title: "Senin, 01-04-2026",
        description: "$304",
      },
      {
        title: "Selasa, 02-04-2026",
        description: "$421",
      },
      {
        title: "Rabu, 03-04-2026",
        description: "$389",
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="text-xl font-bold text-black">Activity report</div>
      {/* HEADER CONTENT MANAGEMENT */}
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="lg:col-span-3">
          <MoneyReportSection
            incomeData={incomeChartData}
            totalIncome={950000}
            topProducts={[]} // boleh kosong
          />
        </div>

        <div className="lg:col-span-1">
          <SideInfoCard
            heading={monthlyIncomeData.heading}
            items={monthlyIncomeData.items}
          />
        </div>
      </div>
      <div>
        <ActivityReportSection />
      </div>
    </div>
  );
}
