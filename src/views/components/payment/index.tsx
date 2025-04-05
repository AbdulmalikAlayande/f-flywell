import axios from 'axios';
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa6';

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

    const initiateTransaction = async (): Promise<string> => {

        setIsProcessing(true);
        setErrorMessage('');

        try{
            const response = await axios.post('/api/', {
                userId: props.userId,
                email: props.email,
                reservationId: props.reservationId,
            })

            const data = await response.data;

            if (response.status !== 200) {
                throw new Error(data.message || 'Failed to initialize transaction');
            }

            return data.access_code;
        }catch (error: unknown){
            
            setErrorMessage((error as Error).message || 'Payment initialization failed');
            setIsProcessing(false);
            return "";
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