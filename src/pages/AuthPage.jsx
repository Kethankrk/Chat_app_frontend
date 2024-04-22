import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postReq } from "../helper/httpReq";

function AuthPage() {
  const [currentPage, setCurretnPage] = useState("login");
  if (currentPage == "login") return <LoginPage changePage={setCurretnPage} />;
  else return <SignupPage changePage={setCurretnPage} />;
}

function LoginPage({ changePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginHandler = async () => {
    const data = {
      email,
      password,
    };
    const url = import.meta.env.VITE_URL;
    try {
      const response = (await axios.post(`${url}/login/`, data)).data;
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.data.id);
      console.log(response);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <main className="flex justify-center items-center min-h-screen bg-green-400">
      <div className="p-10 rounded-md max-w-[650px] min-w-[500px] bg-green-600">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await LoginHandler();
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Email
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Password
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-green-800 rounded-md px-4 py-1 text-white"
              onClick={() => LoginHandler()}
            >
              LOGIN
            </button>
          </div>
        </form>
        <p
          className="text-center cursor-pointer hover:underline mt-4 font-light"
          onClick={() => changePage("signup")}
        >
          Create a account
        </p>
      </div>
    </main>
  );
}

function SignupPage({ changePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password != cpassword) {
      alert("Password mismatch");
      return;
    }
    const data = {
      email,
      username,
      password,
      image,
      bio,
    };

    const response = await postReq("signup", data);
    if (response.error) {
      console.log(response.error);
      return;
    }
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.user.id);

    navigate("/");
  };
  return (
    <main className="flex justify-center items-center min-h-screen bg-green-400">
      <div className="p-10 rounded-md max-w-[650px] min-w-[500px] bg-green-600">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignup();
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Email
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Username
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Password
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Conform Password
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="conform password"
              onChange={(e) => setCpassword(e.target.value)}
              value={cpassword}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Image
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="image url"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-white font-semibold mt-5">
              Bio
            </label>
            <input
              type="text"
              className="px-4 py-1 rounded-lg bg-transparent border border-black text-white placeholder:text-white"
              placeholder="bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-green-800 rounded-md px-4 py-1 text-white"
              onClick={handleSignup}
            >
              SIGNUP
            </button>
          </div>
        </form>
        <p
          className="text-center cursor-pointer hover:underline mt-4 font-light"
          onClick={() => changePage("login")}
        >
          Already have an account? login.
        </p>
      </div>
    </main>
  );
}

export default AuthPage;
