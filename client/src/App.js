import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import GreetingInfo from './components/GreetingInfo';
import Messenger from './components/Messenger';
import ActiveUsers from './components/ActiveUsers';

const socket = io.connect('http://localhost:3001');

function App() {
    const [inputValue, setInputValue] = useState('');
    const [room, setRoom] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [userName, setUserName] = useState('');
    const [inputUserName, setInputUserName] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.on('active_users', (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.off('active_users');
        };
    }, []);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setAllMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: data.inputValue,
                    isReceived: true,
                    userName: data.userName,
                    currentDate: new Date(data.currentDate),
                },
            ]);
        };

        socket.on('receive_message', handleReceiveMessage);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, []);

    const sendMessage = () => {
        if (inputValue !== '') {
            const currentDate = new Date();
            socket.emit('send_message', {
                inputValue,
                room: currentRoom,
                userName,
                currentDate,
            });
            setAllMessages((prevMessages) => [
                ...prevMessages,
                {
                    message: inputValue,
                    isReceived: false,
                    userName: userName,
                    currentDate: currentDate,
                },
            ]);
            setInputValue('');
        }
    };

    const joinRoom = () => {
        if (room !== '' && room !== currentRoom) {
            if (currentRoom !== '') {
                socket.emit('leave_room', currentRoom);
            }
            socket.emit('join_room', { room, userName });
            setCurrentRoom(room);
            setRoom('');
        }
    };

    const onChangeInputUserValue = (username) => {
        setInputUserName(username);
    };

    const onClickSetUserName = () => {
        socket.emit('change_user_name', inputUserName);
        setUserName(inputUserName);
        setInputUserName('');
    };

    const onChangeRoom = (room) => {
        setRoom(room);
    };

    const onChangeMessageInput = (message) => {
        setInputValue(message);
    };

    return (
        <div className="App">
            <div className="side-bar">
                <GreetingInfo userName={userName} currentRoom={currentRoom} />
                <Header
                    onChangeInputUserValue={onChangeInputUserValue}
                    inputUserName={inputUserName}
                    onClickSetUserName={onClickSetUserName}
                    onChangeRoom={onChangeRoom}
                    room={room}
                    joinRoom={joinRoom}
                />
                <ActiveUsers activeUsers={activeUsers} />
            </div>
            <div className="main">
                <Messenger
                    allMessages={allMessages}
                    userName={userName}
                    currentRoom={currentRoom}
                    onChangeMessageInput={onChangeMessageInput}
                    inputValue={inputValue}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
}

export default App;
