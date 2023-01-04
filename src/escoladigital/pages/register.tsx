import React from 'react'

const register = () => {

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [email , setEmail] = React.useState("");
    const [confirmEmail , setConfirmEmail] = React.useState("");
    const [name , setName] = React.useState("");
  



    //loading animation

    const load = () => {
      return (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    };




    const VerificarEmail = (e: Event) => {
      e.preventDefault();
      if (email !== confirmEmail) {
        alert("Os emails devem ser iguais");
      
      } else {
        setError("");
      }
    };

    const VerificarPassword = (e: Event) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("As passwords devem ser iguais");
        //show error
        alert(setError)
      } else {
        setError("");
      }
    };
   

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      VerificarPassword(e);
      VerificarEmail(e);
      setLoading(true);
      const role = "aluno";
      setError("");
      try {
        const res = await fetch("http://localhost:3000/api/register ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, role }),
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setLoading(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setConfirmEmail("");
          setName("");
          
        }
      } catch (error) {
        console.log(error);
      }
    };

  

  return (
    <div className="min-h-full min-w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full mt-32 p-6 m-auto bg-[#ECF0F3] rounded-md  ring-2 ring-[#0073A5] lg:max-w-xl shadow-xl shadow-gray-400">
        <div className=" flex-col items-center justify-center">
          <img
            className="mx-auto h-70 w-auto"
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
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Entre na tua conta
            </a>
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
            <div className="flex items-center">
            
            </div>
            <br />

          </div>

          <div className=" md:mx-36 m-5  items-center justify-center">
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default register