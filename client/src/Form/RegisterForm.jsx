import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../Schema/AuthSchema";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";

const RegisterForm = ({ submitHandler, Processing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        name="fullname"
        register={register}
        error={errors?.fullname?.message}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        name="email"
        register={register}
        error={errors?.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        name="password"
        register={register}
        error={errors?.password?.message}
      />

      <Button
        type="submit"
        loading={Processing}
        fullWidth
        className="mt-2"
      >
        {Processing ? "Creating Account..." : "Sign Up"}
      </Button>

      <div className="text-center mt-6 text-sm text-gray-600">
        Already have an account?
        <NavLink to="/login" className="text-zinc-700 font-semibold hover:text-black ml-1 transition-colors">
          Sign in
        </NavLink>
      </div>
    </form>
  );
};

export default RegisterForm;
