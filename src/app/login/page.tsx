"use client";

import { signIn } from "aws-amplify/auth";
import React from "react";

const AuthPage = () => {
  const signInUser = async () => {
    console.log("object");
    try {
      const result = await signIn({
        username: "0945933607",
        password: "hunter2",
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl">
        {/* Login Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                id="login-email"
                type="tel"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-blue-600 border-gray-300 focus:ring focus:ring-blue-200"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() => signInUser()}
            >
              Login
            </button>
          </form>
        </div>

        {/* Sign Up Section */}
        <div className="w-1/2 p-8 bg-blue-50 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
