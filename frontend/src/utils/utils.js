import io from "socket.io-client";
export const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

console.log(process.env.REACT_APP_LOCALBACKEND);
export const socket = io("http://onestopfaishon.com", {
  path: "/backend",
});
// export const socket = io("http://localhost:4000");
