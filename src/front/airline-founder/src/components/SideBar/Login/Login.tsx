import {NavLink} from "react-router-dom";

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'block',
    padding: '10px 16px',
    margin: '2px 8px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    color: '#94A3B8',
    background: 'transparent',
});

function Login() {
    return <>
        <NavLink to="/login" style={navLinkStyle}>LOGIN</NavLink>
    </>
}

export default Login;