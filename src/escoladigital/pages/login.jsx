import React from "react";
import { parseCookies, setCookie } from "nookies";
import nookies from "nookies";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rotas = useRouter();

  const options = {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: true,
  };

  const HandleRememberMe = (e) => {
    if (e.target.checked) {
      setCookie("rememberMe", "true", options);
    } else {
      setCookie("rememberMe", "false");
    }
  };

  //func to run on page lodads if user has token != null
  useEffect(() => {
    const { token } = parseCookies();
    if (token == "" || token == null || token == undefined) {
      //dot nothing
    } else {
      rotas.push("/user/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCookie("email", email, options);

    const user = {
      email: email,
      password: password,
    };

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        nookies.set(null, "token", data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: true,
        });
        nookies.set(null, "_id", data._id, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: true,
        });
        rotas.push("/user/dashboard");
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 ">
           <Head>
      <title>AEB@Digital</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className="w-full mt-32 p-6 m-auto bg-[#ECF0F3] rounded-md  ring-2 ring-[#0073A5] lg:max-w-xl shadow-xl shadow-gray-400">
        <div className=" flex-col items-center justify-center">
          <img
            className="mx-auto h-70 w-auto"
            rel="preconnect"
            src="/assets/logoEscolaDigital(3).png"
            alt="logo"
            height="auto"
            width="auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na tua conta
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            Ou{" "}
            <Link href="/register" legacyBehavior>
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Criar conta!
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Endereço de email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                onClick={HandleRememberMe}
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar de mim
              </label>
            </div>
            <br />
          </div>

          <div className=" md:mx-36 m-5  items-center justify-center">
            <Link href="/api/login" legacyBehavior>
              <a
                onClick={handleSubmit}
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Iniciar Sessão</span>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
