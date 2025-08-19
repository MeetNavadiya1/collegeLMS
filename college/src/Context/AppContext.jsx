import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [student, setStudent] = useState(false);
    const [professor, setProfessor] = useState(false);
    const [admin, setAdmin] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const value = {
        backendURL,
        student,
        setStudent,
        professor,
        setProfessor,
        admin,
        setAdmin
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;