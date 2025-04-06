import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa6';
import usePaystackPopup from './usePaystackPopup';
import PaymentService from './paymentService';

interface PaymentProps {
    email: string;
    userId: string;
    reservationId: string;
    amount: number;
    onSuccess: (reference: string) => void;
    onCancel: () => void;
}

const Payment: React.FC<PaymentProps> = (props) => {
  
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const popup = usePaystackPopup();

    const initiateTransaction = async (): Promise<void> => {

        setIsProcessing(true);
        setErrorMessage('');

        try{
            const paymentService = PaymentService.getInstance();
            const initiationResponse = await paymentService.initiateTransaction({
                userId: props.userId,
                email: props.email,
                reservationId: props.reservationId,
            })
            const { accessCode } = initiationResponse.data;

        }catch (error: unknown){
            setErrorMessage((error as Error).message || 'Payment initialization failed');
            setIsProcessing(false);
        }
    }

    return (
        <div className={''}>
            
            <span className={`${!errorMessage ? 'hidden' : 'block'} `}>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </span>
            
            <button 
                onClick={initiateTransaction} 
                disabled={isProcessing}
                className={"button"}
            >
                {isProcessing ? <FaSpinner /> : 'Initiate Payment'}
            </button>
        </div>
    )
}

export default Payment