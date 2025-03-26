import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDetails {
    email: string;
    publicId: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    token?: string;
    setUserDetails: (details: Partial<UserDetails>) => void;
    clearUserDetails: () => void;
}

export const userDetailsStore = create<UserDetails>()(
    persist((set) => ({
        email: "",
        publicId: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        token: "",
        setUserDetails: (details) => set((state) => ({ ...state, ...details })),
        clearUserDetails: () => set({
            email: "",
            publicId: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            token: "",
        }),
    }), 
    {
        name: 'user-details',
        partialize: (state) => ({
            email: state.email,
            publicId: state.publicId,
            firstName: state.firstName,
            lastName: state.lastName,
            phoneNumber: state.phoneNumber,
        })
    }
));