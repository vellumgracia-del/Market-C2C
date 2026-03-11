import { useState, useEffect } from "react";

export function useCart() {
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const stored = localStorage.getItem("segari_cart");
        if (stored) {
            try { setCart(JSON.parse(stored)); } catch (e) { }
        }
    }, []);

    const addToCart = (id: string, quantity: number = 1) => {
        setCart((prev) => {
            const newCart = { ...prev, [id]: (prev[id] || 0) + quantity };
            localStorage.setItem("segari_cart", JSON.stringify(newCart));
            // Trigger storage event so other tabs/components update
            window.dispatchEvent(new Event("storage"));
            return newCart;
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => {
            const newCart = { ...prev };
            delete newCart[id];
            localStorage.setItem("segari_cart", JSON.stringify(newCart));
            window.dispatchEvent(new Event("storage"));
            return newCart;
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) => {
            const newCart = { ...prev, [id]: quantity };
            localStorage.setItem("segari_cart", JSON.stringify(newCart));
            window.dispatchEvent(new Event("storage"));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart({});
        localStorage.removeItem("segari_cart");
        window.dispatchEvent(new Event("storage"));
    };

    // Listen for storage events from other components/tabs
    useEffect(() => {
        const handleStorage = () => {
            const stored = localStorage.getItem("segari_cart");
            if (stored) {
                try { setCart(JSON.parse(stored)); } catch (e) { }
            } else {
                setCart({});
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return { cart, addToCart, removeFromCart, updateQuantity, clearCart, isClient };
}
