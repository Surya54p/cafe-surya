"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    date: string;
    items: CartItem[];
    totalPrice: number;
}

interface CartContextType {
    cart: CartItem[];
    orders: Order[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    placeOrder: (customerName: string) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    // Load cart and orders from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cafe_surya_cart");
        const savedOrders = localStorage.getItem("cafe_surya_orders");

        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart", error);
            }
        }

        if (savedOrders) {
            try {
                const parsedOrders: Order[] = JSON.parse(savedOrders);
                // Filter orders older than 1 day
                const validOrders = parsedOrders.filter(order => {
                    const orderDate = new Date(order.date).getTime();
                    const oneDay = 24 * 60 * 60 * 1000;
                    return (Date.now() - orderDate) < oneDay;
                });
                setOrders(validOrders);
            } catch (error) {
                console.error("Failed to parse orders", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cafe_surya_cart", JSON.stringify(cart));
    }, [cart]);

    // Save orders to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cafe_surya_orders", JSON.stringify(orders));
    }, [orders]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const placeOrder = (customerName: string) => {
        const newOrder: Order = {
            id: crypto.randomUUID(),
            customerName,
            date: new Date().toISOString(),
            items: [...cart],
            totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };

        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                orders,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                placeOrder,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
