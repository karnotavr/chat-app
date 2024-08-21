import { FaPaperPlane } from 'react-icons/fa';
const Messenger = ({
    allMessages,
    userName,
    currentRoom,
    onChangeMessageInput,
    inputValue,
    sendMessage,
}) => {
    const formatDate = (date) => {
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else {
            return date.toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <ul>
                {allMessages.map((el, idx) => (
                    <li
                        className={el.isReceived ? 'align-left' : 'align-right'}
                        key={idx}
                    >
                        <div>
                            <span className="username">{el.userName}</span>
                            <br />
                            {el.message}
                            <br />
                            <span className="time">
                                {formatDate(el.currentDate)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="wrapper-message">
                {userName && currentRoom && (
                    <div className="message-container">
                        <input
                            onKeyDown={handleKeyDown}
                            placeholder="Message..."
                            onChange={(event) =>
                                onChangeMessageInput(event.target.value)
                            }
                            value={inputValue}
                        />
                        <button onClick={sendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Messenger;
