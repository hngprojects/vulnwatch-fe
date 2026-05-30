export type Message = {
  id: string;
  role: "user" | "ai" | "streaming";
  text: string;
};
