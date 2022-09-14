import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendReq = useCallback(async (url, config, reqData) => {
    console.log("send");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, (config && config) || { method: "GET" });
      if (!res.ok) {
        // const err = res.json();
        // console.log(err);
        throw new Error("Pls try again later");
      }
      const data = await res.json();
      reqData(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    sendReq: sendReq,
  };
};

export default useHttp;
