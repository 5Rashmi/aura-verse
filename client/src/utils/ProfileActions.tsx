import { deleteCookie, getCookie } from "./cookies";
import config from "./config";
import api from "./api";
import axios from "axios";

type Profile = {
  id: string;
  updatedData?: {
    name?: string;
    email?: string;
    description?: string;
    avatar?: string;
  };
};

const token = getCookie({ name: "token" });

export const getProfile = async () => {
  if (!token) {
    console.warn("No token found — user might not be logged in.");
    return null;
  }

  try {
    const res = await api.get(config.URL.auth.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching profile", error);
    return null;
  }
};

export const updateProfile = async ({ id, updatedData }: Profile) => {
  try {
    const res = await api.put(config.URL.auth.update(id), updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching edit", error);
    return null;
  }
};

export const deleteProfile = async ({ id }: Profile) => {
  try {
    const res = await axios.delete(config.URL.auth.delete(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    deleteCookie({ name: "token" });
    return res.data;
  } catch (error) {
    console.error("Error fetching edit", error);
    return null;
  }
};
