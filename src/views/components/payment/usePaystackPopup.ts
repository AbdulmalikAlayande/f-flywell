import { useCallback } from 'react';
import PaystackPop from "@paystack/inline-js";


const usePaystackPopup = () => {

    const initializePaystack = useCallback(() => {
        const paystack = new PaystackPop();
        return paystack;
    }, []);

    return initializePaystack();
}

export default usePaystackPopup