const Header = ({
    onChangeInputUserValue,
    inputUserName,
    onClickSetUserName,
    onChangeRoom,
    room,
    joinRoom,
}) => {
    return (
        <div className="header">
            <div className="wrapper">
                <input
                    type="text"
                    placeholder="Your username"
                    onChange={(event) =>
                        onChangeInputUserValue(event.target.value)
                    }
                    value={inputUserName}
                />
                <button onClick={onClickSetUserName}>Submit</button>
            </div>
            <div className="wrapper">
                <input
                    type="text"
                    onChange={(event) => onChangeRoom(event.target.value)}
                    value={room}
                    placeholder="Room number"
                />
                <button onClick={joinRoom}>Join room</button>
            </div>
        </div>
    );
};

export default Header;
