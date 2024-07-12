import React from 'react';
import { useNavigate } from 'react-router-dom';


function Navbar({ onSearch }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
      };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Note App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            <div className="form-group ">
                                <input type="text" className="form-control" placeholder="Search" onChange={handleSearchChange} />
                            </div>
                        </ul>
                    </div>
                    <div>

                        <span className="navbar-text">
                            {user.firstName} {user.lastName}
                            <button className="btn btn-outline-success ms-2 me-2" type="button" onClick={handleLogout}>Logout</button>
                        </span>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
