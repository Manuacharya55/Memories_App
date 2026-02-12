import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { loginSchema } from "../Schema/AuthSchema";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";

const LoginForm = ({ submitHandler, Processing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        name="email"
        register={register}
        error={errors?.email?.message}
      />

      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          register={register}
          error={errors?.password?.message}
        />
        <div className="flex justify-end mt-1">
          <button type="button" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Forgot password?
          </button>
        </div>
      </div>

      <Button
        type="submit"
        loading={Processing}
        fullWidth
        className="mt-2"
      >
        {Processing ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center mt-6 text-sm text-gray-600">
        Don't have an account?
        <NavLink to="/register" className="text-zinc-700 font-semibold hover:text-black ml-1 transition-colors">
          Create account
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
