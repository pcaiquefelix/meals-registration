"use client";

import { useState } from "react";
import { User } from "lucide-react";
import InputForm from "@/components/form/InputForm";
import InputPasswordForm from "@/components/form/InputPasswordForm";
import SubmitButtonForm from "@/components/form/SubmitButtonForm";
import CredentialLoader from "@/components/common/CredentialLoader";
import { NextApiHandler } from "@/services/NextApiHandler";

const MainForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsValidator, setCredentialsValidator] = useState({
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await NextApiHandler.post("/api/authentication/login", {
        email: email,
        password: password,
      });

      if (response instanceof Error) {
        const errorMessage = response.message;
        const credentialsValidatorUpdate = {
          status: "error",
          message:
            errorMessage === "ECONNREFUSED"
              ? "Connection refused"
              : errorMessage,
        };

        if (errorMessage === "ECONNREFUSED")
          alert(
            "The connection to the server was refused. Please contact the administrator."
          );

        setCredentialsValidator(credentialsValidatorUpdate);
        return alert(credentialsValidatorUpdate.message);
      }

      localStorage.setItem("user_info", JSON.stringify(response));
      const credentialsValidatorUpdate = { status: "success", message: "" };
      setCredentialsValidator(credentialsValidatorUpdate);

      return window.location.assign("/");
    } catch (error) {
      console.error("Captured error:");
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);

      const credentialsValidatorUpdate = {
        status: "error",
        message: "An unexpected error occurred",
      };
      setCredentialsValidator(credentialsValidatorUpdate);
    }
  };

  const handleButtonClick = () => {
    if (email && password) {
      const credentialsValidatorUpdate = {
        status: "idle",
        message: "",
      };
      setCredentialsValidator(credentialsValidatorUpdate);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputForm
          type="email"
          id="email"
          labelText="Email"
          value={email}
          iconComponent={
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          }
          handleOnChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <InputPasswordForm
          id="password"
          labelText="Password"
          value={password}
          handleOnChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        {credentialsValidator.status && (
          <CredentialLoader
            status={credentialsValidator.status}
            message={credentialsValidator.message}
          />
        )}

        <SubmitButtonForm
          buttonText="Login"
          handleOnClick={handleButtonClick}
        />
      </form>
    </div>
  );
};

export default MainForm;
