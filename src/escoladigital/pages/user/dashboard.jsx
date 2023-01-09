import React from 'react'
import { useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import nookies from "nookies";
import { useRouter } from "next/router";

const dashboard = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
   //fecth user count data
    const [count, setCount] = useState({});
    const [loadingCount, setLoadingCount] = useState(true);


    // Get user _id cokie
    const { _id } = parseCookies();

    //check if user has token
 
    const rotas = useRouter();

   //if user dont have token go to login page
    React.useEffect(() => {
        const { token } = parseCookies();
        if (token == "" || token == null || token == undefined) {
            rotas.push("/login");
        }
        else{
            try{
                fetch("/api/getuser", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: _id }),

                })
                .then((res) => res.json())
                .then((data) => {
                   
                    setUser(data);
                    setLoading(false);
                });
            }
            catch(err){
                console.log(err);
            }
        }
    }, []);


    //get user data

    
    React.useEffect(() => {
        try{
            fetch("/api/getusersAll",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    },
            })
            .then((res) => res.json())
            .then((data) => {
                
                setCount(data);

                setLoadingCount(false);
            });
        }
        catch(err){
            console.log(err);
        }
    }, []);
    
    const handleLogout = async (e) => {
        e.preventDefault();
        destroyCookie(null, "token", {
            path: "/",
          });
          destroyCookie(null, "_id", {
            path: "/",
          });
          rotas.push("/login");
    }


  return (

    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-2 sm:px-6 lg:px-4 ">

    <br />

    <div className="flex pt-10 space">
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
        <div className="space-y-3">
            <div className="flex items-center">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <p>{user.name}</p>
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                        <a
                            href="/"
                            className="flex items-center p-2 space-x-5 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>Home</span>
                        </a>
                    </li>


                    <li className="rounded-sm">
                        <a
                            onClick={handleLogout}
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className="container mx-12 mt-12">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total users
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                    {loadingCount ? ( <p>loading...</p> ) : ( <p>{count.quantidade}</p> )}
                </div>
            </div>


        </div>
    </div>
    </div>
    </div>
  )
}

export default dashboard