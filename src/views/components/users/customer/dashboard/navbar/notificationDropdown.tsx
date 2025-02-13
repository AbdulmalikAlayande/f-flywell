import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import OutsideClickHandler from '../../../../reusables/outsideClickHandler';
import { format } from 'date-fns';

const notifications = [
    { id: 1, title:'', message: 'New user registered', type: 'info', dateTime: format(new Date(), 'PPpp') },
    { id: 2, title:'', message: 'Server error reported', type: 'error', dateTime: format(new Date(), 'PPpp') },
    { id: 3, title:'', message: 'New order received', type: 'success', dateTime: format(new Date(), 'PPpp') },
];


const NotificationDropdown: React.FC = () => {
    
    const [visible, setVisible] = useState<boolean>(true);
    const [notifying, setNotifying] = useState<boolean>(false);
    
    const handleVisibleChange = () => {
        setNotifying(!notifying);
        setVisible(!visible);
    };

    return (
        <OutsideClickHandler onClick={() => setNotifying(false)} className={'relative'}>

            <div className="relative inline-block text-left">
                <button
                    className="flex items-center p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                    onClick={handleVisibleChange}
                >
                    <FaBell size={'20px'}/>
                    {/* <span className="ml-2 bg-red-600  rounded-full px-2 py-1"> */}
                        <span className={`absolute -top-0.5 right-0 z-1 h-4 w-4 text-white text-xs rounded-full bg-red-600 ${visible === false ? 'hidden' : 'inline'}`}>
                            <span className="absolute -z-1 inline-flex items-center  h-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                                {notifications.length}
                            </span>
                        {/* </span> */}
                </button>
                
                {notifying && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            {notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-2 text-sm ${notification.type === 'info' ? 'text-blue-500' : notification.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
                                >
                                    {notification.message}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </OutsideClickHandler>
    );
};

export default NotificationDropdown;