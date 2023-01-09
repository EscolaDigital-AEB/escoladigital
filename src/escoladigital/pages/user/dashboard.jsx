import React from "react";
import { useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import nookies from "nookies";
import { useRouter } from "next/router";

const dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
 

  const [loadingCount, setLoadingCount] = useState(true);
  //const to contain the result of the fecth of all users
   
  const [usersAll, setUsersAll] = useState([]);


  // Get user _id cokie
  const { _id } = parseCookies();

  //check if user has token

  const rotas = useRouter();

  //if user dont have token go to login page
  React.useEffect(() => {
    const { token } = parseCookies();
    if (token == "" || token == null || token == undefined) {
      rotas.push("/login");
    } else {
      try {
        fetch("/api/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: _id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data == null) {
              rotas.push("/login");
            } else {
              setUser(data);
              setLoading(false);
            }
            if (data.role != "admin") {
              rotas.push("/user/tickets");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  //get user data

  React.useEffect(() => {
    try {
      fetch("/api/getusersAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  

          setUsersAll(data);
         

        

          setLoadingCount(false);
        });
    } catch (err) {
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
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    rotas.push(`/user/edit/${id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
  };

  return (
    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-2 sm:px-6 lg:px-4 ">
      <br />

      <div className="flex pt-10 space">
        <div className="flex flex-col h-screen p-3  fixed left-[5%] bg-white shadow w-60 ">
          <div className="space-y-3 ">
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
                            href="#"
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
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>Settings</span>
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
        <div className="container mx-12  mt-12">
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total users
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                {loadingCount ? (
                  <div className="flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">carregando...</span>
                  </div>
                ) : (
                  usersAll.length
                )}
              
              </div>


               
                    


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default dashboard;
