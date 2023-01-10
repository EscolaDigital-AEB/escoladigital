import React from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import Link from "next/link";
import { useState} from "react";
import Head from 'next/head'
const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [name, setName] = useState("");

  const rota = useRouter();

  //loading animation

  

  const VerificarEmail = (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      alert("Os emails devem ser iguais");
    } else {
      setError("");
    }
  };

  const VerificarPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As passwords devem ser iguais");
      //show error
      console.log(setError);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    VerificarPassword(e);
    VerificarEmail(e);

    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
            alert("O email ja existe  ");
          } else {
            nookies.set(null, "token", data.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: true,
            });
            rota.push("/login");
          }
        });
    } catch (error) {
      console.log(error);
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
            Crie a tua conta
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            Ou{" "}
            <Link href="/login" legacyBehavior>
              <a
                
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Entre na tua conta
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
              />
            </div>
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
              <label htmlFor="confirmEmail" className="sr-only">
                Confirmar Email
              </label>
              <input
                id="confirmEmail"
                name="confirmEmail"
                type="email"
                autoComplete="email"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Email"
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
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
            <br />
          </div>

          <div className=" md:mx-36 m-5  items-center justify-center">
            <Link href="/api/register" legacyBehavior>
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
                <span className="relative">Criar Conta!</span>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
