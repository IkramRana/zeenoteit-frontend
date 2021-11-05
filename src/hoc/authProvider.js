import authContext from "../context/authContext";
import useProvideAuth from "../hooks/useProvideAuth";


export default function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}