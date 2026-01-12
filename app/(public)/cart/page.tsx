"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, Order } from "@/context/CartContext";
import { Trash2, ArrowLeft, Info, Download } from "lucide-react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, placeOrder, orders } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        discountCode: "",
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        let discount = 0;
        if (formData.discountCode === "HEMAT") {
            discount = totalPrice * 0.1; // 10% discount
        }
        return totalPrice - discount;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Keranjang belanja Anda kosong.");
            return;
        }

        // Simulate API call/DB save
        // In a real app, you would send this to the backend

        placeOrder(formData.name);
        setIsSuccessModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsSuccessModalOpen(false);
        // Do NOT route to home, just stay to show history or whatever current behavior
        // Actually user said "Pesan Selesai di tekan ... muncul seperti list pesanan"
        // So keeping them here is fine, but maybe scroll to history?
    };

    const generatePDF = (order: Order) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Cafe Surya - Struk Pemesanan", 14, 22);

        doc.setFontSize(11);
        doc.text(`Tanggal: ${new Date(order.date).toLocaleString("id-ID")}`, 14, 32);
        doc.text(`Nama Pelanggan: ${order.customerName}`, 14, 38);

        const tableColumn = ["No", "Menu", "Harga", "Qty", "Total"];
        const tableRows: any[] = [];

        order.items.forEach((item, index) => {
            const itemData = [
                index + 1,
                item.name,
                `Rp ${item.price.toLocaleString("id-ID")}`,
                item.quantity,
                `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
            ];
            tableRows.push(itemData);
        });

        // Add total row
        tableRows.push(["", "", "", "Total Bayar", `Rp ${order.totalPrice.toLocaleString("id-ID")}`]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 45,
        });

        doc.save(`Struk-${order.customerName}-${new Date().getTime()}.pdf`);
    };

    return (
        <div className="px-6 py-12 max-w-5xl mx-auto">
            <Link href="/menu" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition">
                <ArrowLeft size={20} /> Kembali ke Menu
            </Link>

            <h1 className="text-3xl font-bold mb-8">Keranjang Pesanan</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items Table */}
                <div className="lg:col-span-2">
                    {cart.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center mb-8">
                            <p className="text-gray-500 mb-4">Keranjang Anda kosong saat ini.</p>
                            <Link href="/menu" className="inline-block px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                                Mulai Pesan
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Produk</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Harga</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700 text-center">Qty</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Total</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {cart.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-16 h-16 relative shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                        </div>
                                                        <span className="font-medium text-gray-800">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">Rp {item.price.toLocaleString("id-ID")}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-orange-600">
                                                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50/50">
                                        <tr>
                                            <td colSpan={3} className="px-6 py-4 text-right font-bold text-gray-800">Total Keseluruhan:</td>
                                            <td colSpan={2} className="px-6 py-4 text-xl font-bold text-orange-600">
                                                Rp {totalPrice.toLocaleString("id-ID")}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Order History Section */}
                    {orders.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Riwayat Pesanan Hari Ini</h2>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold text-gray-700">Nama</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700">Total Belanja</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Struk</th>
                                                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4 font-medium text-gray-800">
                                                        {order.customerName}
                                                        <div className="text-xs text-gray-500 font-normal">
                                                            {new Date(order.date).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-orange-600 font-bold">
                                                        Rp {order.totalPrice.toLocaleString("id-ID")}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => generatePDF(order)}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm font-medium"
                                                        >
                                                            <Download size={16} /> PDF
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition"
                                                        >
                                                            <Info size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Checkout Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Informasi Pemesanan</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                                <select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-white"
                                >
                                    <option value="">Pilih...</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Diskon (Opsional)</label>
                                <input
                                    type="text"
                                    name="discountCode"
                                    value={formData.discountCode}
                                    onChange={handleInputChange}
                                    placeholder="Contoh: HEMAT"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                />
                                {formData.discountCode === 'HEMAT' && <p className="text-xs text-green-600 mt-1">Diskon 10% aktif!</p>}
                            </div>

                            <div className="border-t pt-4 mt-2">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                                </div>
                                {formData.discountCode === "HEMAT" && (
                                    <div className="flex justify-between mb-2 text-green-600">
                                        <span>Diskon (10%)</span>
                                        <span>-Rp {(totalPrice * 0.1).toLocaleString("id-ID")}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                                    <span>Total Bayar</span>
                                    <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cart.length === 0}
                            >
                                Pesan Sekarang
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <Modal isOpen={isSuccessModalOpen} onClose={handleCloseModal} title="Pesanan Berhasil Disimpan!">
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-lg text-gray-700 mb-2">Terima kasih, <strong>{formData.name}</strong>!</p>
                    <p className="text-gray-600 mb-6">
                        Pesanan Anda telah kami simpan di riwayat.
                    </p>
                    <button
                        onClick={handleCloseModal}
                        className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    >
                        Lihat Riwayat
                    </button>
                </div>
            </Modal>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Detail Pesanan">
                    <div className="py-4">
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 text-lg">Nota Pembelian</h3>
                            <p className="text-gray-500 text-sm">{new Date(selectedOrder.date).toLocaleString("id-ID")}</p>
                        </div>

                        <div className="border rounded-lg overflow-hidden mb-4">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold">Menu</th>
                                        <th className="px-4 py-2 text-center font-semibold">Qty</th>
                                        <th className="px-4 py-2 text-right font-semibold">Harga</th>
                                        <th className="px-4 py-2 text-right font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {selectedOrder.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2 text-center">{item.quantity}</td>
                                            <td className="px-4 py-2 text-right">Rp {item.price.toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-2 text-right font-medium">
                                                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50 font-bold">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-right">Total Keseluruhan</td>
                                        <td className="px-4 py-3 text-right text-orange-600">
                                            Rp {selectedOrder.totalPrice.toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-sm font-medium"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
