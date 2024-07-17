import React from 'react';
import './css/Placeholder-chatWindow.css';

const Placeholder = () => {
    return (
        <div className="placeholder-container">
            <div className="placeholder-content">
                <div className="placeholder-image">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 0C5.371 0 0 5.371 0 12C0 18.629 5.371 24 12 24C18.629 24 24 18.629 24 12C24 5.371 18.629 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"
                            fill="#4CAF50"
                        />
                        <path
                            d="M12 6C9.794 6 8 7.794 8 10H10C10 8.897 10.897 8 12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 12.897 10 14V15H12V14C12 13.897 12.897 13 14 13C15.103 13 16 12.103 16 11C16 9.794 14.206 8 12 8C10.897 8 10 7.103 10 6H12C12 7.103 12.897 8 14 8C15.103 8 16 7.103 16 6C16 4.897 14.206 4 12 4C10.897 4 10 4.897 10 6H8C8 4.206 9.794 3 12 3C14.206 3 16 4.794 16 7C16 9.206 14.206 11 12 11C9.794 11 8 12.794 8 15H10C10 12.794 11.794 11 14 11C16.206 11 18 9.206 18 7C18 4.794 16.206 3 14 3C11.794 3 10 4.794 10 7C10 7.897 10.897 8 12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 12.897 10 14V15C10 16.103 10.897 17 12 17H14V16C14 14.897 13.103 14 12 14C10.897 14 10 13.103 10 12V11H8V14C8 15.103 8.897 16 10 16H12C13.103 16 14 15.103 14 14V13H16V12H12V11Z"
                            fill="#4CAF50"
                        />
                    </svg>
                </div>
                <div className="placeholder-text">
                    <h1>Chat App</h1>
                    <p>Select a contact to see your messages with them</p>
                    {/*<p>Use your app on up to 4 linked devices and 1 phone at the same time.</p>*/}
                </div>
            </div>
            <div className="placeholder-footer">
                <p>Your personal messages are end-to-end encrypted</p>
            </div>
        </div>
    );
};

export default Placeholder;
