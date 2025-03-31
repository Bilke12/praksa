import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''

    })

    const [isSearched,setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const[showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    useEffect(() => {
        setJobs(jobsData)
    }, [])
    

    const fetchJobs =async () => {
        setJobs(jobsData)
    }

    useEffect(() =>{
        fetchJobs()
    }, [])

    const value = {
        setSearchFilter,searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}