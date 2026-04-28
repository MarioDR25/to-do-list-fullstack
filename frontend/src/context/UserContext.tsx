"use client";
import { createContext, useContext, useState } from "react";
import { User } from "@/types/user";

interface UserContextType {
    isOpen: boolean;
    selectedUser: User | null;
    openModal: (user?: User) => void;
    closeModal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const openModal = (user?: User) => {
        setSelectedUser(user || null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <UserContext.Provider value={{ isOpen, selectedUser, openModal, closeModal }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext debe usarse dentro de UserProvider");
    return context;
};