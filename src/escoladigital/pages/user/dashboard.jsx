import React from "react";
import { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from 'next/head'
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const rotas = useRouter();

  //if user dont have token go to login page
  useEffect(() => {
    const { token } = parseCookies();

    const { _id } = parseCookies();

    if (token == "" || token == null || token == undefined || _id == "" || _id == null || _id == undefined)  {
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
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  //get user data

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

  return (
    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-2 sm:px-6 lg:px-4 ">
      <br />
      <Head>
      <title>AEB@Digital</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

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
                  <Link href="/" legacyBehavior>
                    <a
                      
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
                  </Link>
                </li>

                <li className="rounded-sm">
                  <Link href="/user/edit/editar" legacyBehavior>
                    <a

                     
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
                      <span>Configurações</span>
                    </a>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link href="/login"  legacyBehavior>
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
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-screen p-3  center ">
          <div className="space-y-3 ">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Bem vindo ao seu Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
