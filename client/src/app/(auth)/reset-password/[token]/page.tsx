"use client";
import Form from "@/components/ui/auth/Form";
import Heading from "@/components/ui/auth/Heading";
import Input from "@/components/ui/auth/Input";
import Toast from "@/components/ui/Toast";
import config from "@/utils/config";
import { validatePassword } from "@/utils/validation";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";

const ResetPasswordPage = () => {
  const navigate = useRouter();
  const params = useParams();
  const token = params.token;
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validatePassword(form.password);
    if (error) {
      toast.error(error);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${config.URL.auth.resetPassword}/${token}`,
        { password: form.password }
      );
      toast.success(res.data.message);
      navigate.push("/sign-in");
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.error) ||
          "Reset failed"
      );
    }
  };
  return (
    <>
      <Toast />
      <Form
        onSubmit={handleReset}
        buttonProps={{
          name: "Reset",
          fullWidth: true,
        }}
        noValidate
      >
        <Heading heading={"Reset Password"} />
        <Input
          type="password"
          name="password"
          value={form.password}
          label="New Password"
          icon={<FiLock />}
          onChange={onChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          label="Confirm Password"
          icon={<FiLock />}
          onChange={onChange}
          required
        />
      </Form>
    </>
  );
};

export default ResetPasswordPage;
