import { createContext, useState } from "react";


export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { }
});

function AuthContextProvider({children}) {

    const [authTocken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
    }

    const value = {
        token: authTocken,
        isAuthenticated: !!authTocken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider  value={value}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;