import '../styles/UserRoleSelection.css';
import { useNavigate } from 'react-router';

function UserRoleSelection() {
    const navigate = useNavigate();

    const handleLibrarianClick = () => {
        navigate('/Dashboard');
    }

    const handleMemberClick = () => {
        navigate('/availbooks');
    }

    return (
        <div>
            <h1>Choose Your User Role</h1>

            <div className='role-buttons'>
                <button onClick={handleLibrarianClick}>Librarian</button>
                <button onClick={handleMemberClick}>Member</button>
            </div>
        </div>
    )
}

export default UserRoleSelection