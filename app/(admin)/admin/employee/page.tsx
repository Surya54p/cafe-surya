"use client";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import DropdownFilter from "@/components/DropdownFilter";
import SearchInput from "@/components/SearchInput";
import { Info, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Employee {
  id: number;
  name: string;
  role: "Admin" | "Owner";
  email: string;
  lastLogin: string;
  status: "Active" | "Inactive";
}

export default function EmployeesManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Owner",
      email: "john@company.com",
      lastLogin: "2026-01-10 21:30",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Admin",
      email: "jane@company.com",
      lastLogin: "2026-01-10 09:12",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Lee",
      role: "Admin",
      email: "michael@company.com",
      lastLogin: "2026-01-08 17:45",
      status: "Inactive",
    },
  ]);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "admin", label: "Admin" },
    { value: "owner", label: "Owner" },
  ];

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (id: number) => {
    alert(`Edit employee with ID: ${id}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Employee Management</h1>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <PrimaryButton variant="primary">Add Employee</PrimaryButton>

          <DropdownFilter
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
        </div>

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search employee..."
        />
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-300">
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id} className="border-b border-gray-200">
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.lastLogin}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {emp.status}
                </span>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <PrimaryButton
                  variant="secondary"
                  onClick={() => handleEdit(emp.id)}
                >
                  <Info size={18} />
                </PrimaryButton>{" "}
                <PrimaryButton
                  variant="secondary"
                  onClick={() => handleEdit(emp.id)}
                >
                  <Pencil size={18} />
                </PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  onClick={() => handleDelete(emp.id)}
                >
                  <Trash size={18} />
                </PrimaryButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
