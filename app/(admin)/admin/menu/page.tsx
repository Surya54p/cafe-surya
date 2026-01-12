"use client";
import PrimaryButton from "@/components/PrimaryButton";
import DropdownFilter from "@/components/DropdownFilter";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/Modal";

type Menu = {
  id: number;
  name: string;
  status: 'Available' | 'Unavailable';
};

export default function MenuAdmin() {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: 'Kentang Goreng', status: 'Available' },
    { id: 2, name: 'Kentang Goreng Jumbo', status: 'Available' },
    { id: 3, name: 'Es Teh Manis', status: 'Unavailable' },
    { id: 4, name: 'Kopi Susu', status: 'Available' },
    { id: 5, name: 'Roti Bakar', status: 'Available' },
  ]);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [statusToUpdate, setStatusToUpdate] = useState<'Available' | 'Unavailable'>('Available');

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'Available', label: 'Available' },
    { value: 'Unavailable', label: 'Unavailable' },
  ];

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setStatusToUpdate(menu.status);
    setIsEditModalOpen(true);
  };

  const saveStatus = () => {
    if (selectedMenu) {
      setMenus(menus.map(m => m.id === selectedMenu.id ? { ...m, status: statusToUpdate } : m));
      setIsEditModalOpen(false);
      setSelectedMenu(null);
    }
  };

  const filteredMenus = menus.filter(menu => {
    const matchesFilter = filter === 'all' || menu.status === filter;
    const matchesSearch = menu.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="text-xl font-bold text-black">Admin menu management</div>

      {/* Header Tools */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Note: User didn't ask for Add capability in the request, but usually it's there. 
              The prompt only highlighted editing table. I will keep Add button for completeness if needed 
              or remove it if not requested? The previous one had it. I'll keep it but generic.
          */}
          <PrimaryButton variant="primary" onClick={() => { }}>
            Add Menu
          </PrimaryButton>
          <DropdownFilter
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Cari menu..."
        />
      </div>

      {/* Table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Menu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredMenus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{menu.name}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${menu.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {menu.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <PrimaryButton
                    variant="primary"
                    onClick={() => handleEdit(menu)}
                    className="px-4 py-2 text-sm"
                  >
                    Edit
                  </PrimaryButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredMenus.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No menus found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Item Status"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu Name
            </label>
            <input
              type="text"
              value={selectedMenu?.name || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusToUpdate}
              onChange={(e) => setStatusToUpdate(e.target.value as 'Available' | 'Unavailable')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="flex justify-end pt-4">
            <PrimaryButton variant="primary" onClick={saveStatus}>
              Save Changes
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
