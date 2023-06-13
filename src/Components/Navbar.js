import "../CSS/Navbar.css"

function Navbar({ user, logout }) {
    return (
        <>
            <nav>
                <h5>Welcome {user}</h5>
                <button className="logout" onClick={(e) => logout(e)}>Logout</button>
            </nav>
        </>
    )
}


export default Navbar;