"use client";
import Loader from "@/components/Loader";
import Form from "@/components/ui/auth/Form";
import Heading from "@/components/ui/auth/Heading";
import Input from "@/components/ui/auth/Input";
import Toast from "@/components/ui/Toast";
import { UserType } from "@/types/User";
import config from "@/utils/config";
import { isValidEmail } from "@/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiLock } from "react-icons/fi";

const SignIn = () => {
  const [form, setForm] = useState<UserType>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!isValidEmail(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const res = await axios.post(config.URL.auth.signin, form);
      console.log(res.data);
      router.push("/");
    } catch (error: unknown) {
      console.error("Error signing in", error);

      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Toast />
      {loading ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Form
            onSubmit={handleSubmit}
            buttonProps={{
              name: "Sign In",
              fullWidth: true,
            }}
            noValidate
          >
            <Heading heading="Sign In" />
            <div>
              <Input
                type="email"
                name="email"
                value={form.email}
                label="Email"
                icon={<FiUser />}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                value={form.password}
                label="Password"
                icon={<FiLock />}
                onChange={onChange}
                required
              />
            </div>
          </Form>
          <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-4">
            {`Don't have an account?${" "}`}
            <a
              href="/sign-up"
              className="text-sm text-primary hover:underline hover:text-primary/80 dark:text-primary dark:hover:text-primary/70 transition"
            >
              Sign up
            </a>
          </p>
          <p className="text-sm text-center mt-4">
            <a
              href="/forgot-password"
              className="text-sm text-primary hover:underline hover:text-primary/80 dark:text-primary dark:hover:text-primary/70 transition"
            >
              Forgot password?
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default SignIn;
