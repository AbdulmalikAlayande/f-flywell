import React, { useState, useRef } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../utils/constants';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Logger from '../../../utils/logger';

const ActivateUserAccount = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputs.current[index + 1].focus();
      } else {
        sendOTPToBackend(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index] === '') {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const sendOTPToBackend = (otp: string) => {
    axios
      .post(`${SERVER_BASE_URL}customer/activate-account/${otp}`)
      .then((response) => {
        if (response.data.statusCode === 201) {
          navigate(`/${response.data.responseData.email}/dashboard`);
          Logger.success('Response Data: ' + response.data);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        Logger.error(error);
      });
  };

  const resendOTP = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement resend OTP functionality here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Account Activation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => el && (inputs.current[index] = el)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          ))}
        </div>
        <button
          onClick={resendOTP}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default ActivateUserAccount;
