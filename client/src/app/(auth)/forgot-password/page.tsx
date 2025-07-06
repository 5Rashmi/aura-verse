"use client";
import Form from "@/components/ui/auth/Form";
import Heading from "@/components/ui/auth/Heading";
import Input from "@/components/ui/auth/Input";
import Toast from "@/components/ui/Toast";
import config from "@/utils/config";
import { isValidEmail } from "@/utils/validation";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const res = await axios.post(config.URL.auth.forgotPassword, { email });
      if (res.data?.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Reset link sent to email");
      }
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.error) ||
          "Failed to send reset link"
      );
    }
  };

  return (
    <>
      <Toast />
      <Form
        onSubmit={handleSubmit}
        buttonProps={{
          name: "Send Reset Link",
          fullWidth: true,
        }}
        noValidate
      >
        <Heading heading={"Need Help Signing In?"} />
        <Input
          type="email"
          name="email"
          value={email}
          label="Email"
          icon={<FiUser />}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form>
    </>
  );
};

export default ForgotPassword;
