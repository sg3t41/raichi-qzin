import { useRouter } from "next/navigation";
import { useToggle } from "react-use";
import { generateRedirectUrl } from "../libs/generateRedirectUrl";
import { generateLoginUrl } from "../libs/generateLoginUrl";
import axios from "axios";
import { useState } from "react";

const useLineLogin = (): {
  isLoading: boolean;
  submit: (
    clientId: string,
    redirectUrl: {
      base: string;
      params: Record<string, string>;
    }
  ) => void;
} => {
  const [isLoginLoading, setIsLoginLoading] = useToggle(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/createStatus");
      return response.data.state.value;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submit = async (
    clientId: string,
    redirectUrl: {
      base: string;
      params: Record<string, string>;
    }
  ) => {
    setIsLoginLoading(true);
    try {
      const state = await fetchData();
      // alert(state);
      console.log(state); // データが取得されているか確認
      if (!state) {
        console.error("stateが不正です");
      }
      const redirectUri = generateRedirectUrl(redirectUrl);
      const url = generateLoginUrl(clientId, state, redirectUri);
      router.push(url);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return { isLoading: isLoginLoading, submit };
};

export default useLineLogin;
