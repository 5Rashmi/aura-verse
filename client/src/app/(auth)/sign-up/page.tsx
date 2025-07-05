"use client";
import Form from "@/components/ui/auth/Form";
import Heading from "@/components/ui/auth/Heading";
import Input from "@/components/ui/auth/Input";
import Textarea from "@/components/ui/auth/Textarea";
import Toast from "@/components/ui/Toast";
import { UserType } from "@/types/User";
import config from "@/utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiUserCheck, FiFileText } from "react-icons/fi";

const SignUp = () => {
  const [form, setForm] = useState<UserType>({
    username: "",
    password: "",
    name: "",
    description: "",
    avatar: "",
  });

  const router = useRouter();

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

    try {
      const res = await axios.post(config.URL.auth.signup, form);
      console.log(res.data);
      router.push("/");
    } catch (error: unknown) {
      console.error("Error signing up", error);

      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("An unexpected error occured");
      }
    }
  };
  return (
    <div>
      <Toast />
      <Form
        onSubmit={handleSubmit}
        buttonProps={{
          name: "Sign Up",
          fullWidth: true,
        }}
      >
        <Heading heading="Create an account" />
        <div>
          <Input
            type="text"
            name="username"
            value={form.username}
            label="Username"
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
        <div>
          <Input
            type="text"
            name="name"
            value={form.name || ""}
            label="Name"
            icon={<FiUserCheck />}
            onChange={onChange}
          />
        </div>
        <div>
          <Textarea
            name="description"
            value={form.description || ""}
            onChange={onChange}
            rows={3}
            label="Description"
            icon={<FiFileText />}
          />
        </div>
      </Form>
      <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-4">
        Already have an account?{" "}
        <a
          href="/sign-in"
          className="text-primary font-medium hover:underline hover:text-primary/80 transition"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
