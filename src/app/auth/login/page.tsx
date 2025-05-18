"use client";
import React from "react";
import { Inputs } from "../register/page";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {

  const router = useRouter();

  const {
      register,
      handleSubmit,
      // watch,
      formState: { errors },
    } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data) => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        alert(res.error);
      } else if (res?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Something went wrong");
      }
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              // value={formData.email}
              // onChange={handleChange}
              {...register("email", {
                required: { 
                  value: true, 
                  message: "Email is required" 
                }
              })}
              placeholder="johndoe@email.com"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              // value={formData.password}
              // onChange={handleChange}
              {...register("password", { required: true })}
              placeholder="********"
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.email && <span>This field is required</span>}
          {errors.password && <span>This field is required</span>}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-center bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don&apos;t you have an account?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
