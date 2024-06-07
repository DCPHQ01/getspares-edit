const useGetToken = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("token") || "{}");
  }
  return {};
};
export default useGetToken;
