import { createContext, ReactNode, useEffect, useState } from "react";
import { IAuthContextData, IAuthResponse } from "../interfaces/login";
import { IUserMessageResponse } from "../interfaces/messages";
import { api } from "../services/api";

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider) {
  const [user, setUser] = useState<IUserMessageResponse | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=28d309ad07bf864fa594`;

  async function signIn(githubCode: string) {
    const response = await api.post<IAuthResponse>("authenticate", {
      code: githubCode,
    });
    const { token, user } = response.data;
    localStorage.setItem("@dowhile:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<IUserMessageResponse>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");
    if (hasGithubCode) {
      const [urlWithouCode, githubCode] = url.split("?code=");
      window.history.pushState({}, "", urlWithouCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
