import { FaUser } from 'react-icons/fa';
const ActiveUsers = ({ activeUsers }) => {
    return (
        <>
            <h4>Active users in room:</h4>
            <ul>
                {activeUsers.map((userName) => (
                    <div className="user-block" key={userName}>
                        <FaUser />
                        <li key={userName}>{userName}</li>
                    </div>
                ))}
            </ul>
        </>
    );
};

export default ActiveUsers;
