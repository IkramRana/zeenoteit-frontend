import { useState } from "react";
import { Service } from "config/service";

export default function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    const signin = (token, plan) => {
        setUser(token);
        setPlan(plan);
    };

    const signout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('regD');
        localStorage.clear()
        // eslint-disable-next-line no-unused-expressions
        user ? setUser(null) : null;
    };

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) return user ? setUser(null) : null;
            const { status, message } = await Service.verifyToken({ token: token });
            if (status) signin(message);
            else signout();
        } catch (err) {
            if (user) setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        plan,
        loading,
        signin,
        signout,
        verifyToken,
    };
}