"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(formData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await fetch("/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
        return;
      } else {
        router.refresh();
        router.push("/auth/signIn");
      }

    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <form
        action=""
        className="md:w-6/12 flex flex-col gap-5 w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name..."
          className="form-input"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email..."
          className="form-input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password..."
          className="form-input"
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="p-1 rounded-lg" />
          <label htmlFor="terms" className="text-gray-300 underline">
            I agree to privacy policy & terms
          </label>
        </div>
        <button
          type="submit"
          className="bg-[#f26f57] text-[#ebeeed] py-3 rounded-lg"
        >
          Continue
        </button>
      </form>
    </>
  );
};
export default SignUpForm;
