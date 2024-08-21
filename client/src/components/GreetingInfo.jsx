const GreetingInfo = ({ userName, currentRoom }) => {
    return (
        <div className="headers-wrapper">
            {userName && <h2>Hello, {userName}!</h2>}
            {currentRoom && <h2>You`re in room: {currentRoom}</h2>}
        </div>
    );
};

export default GreetingInfo;
