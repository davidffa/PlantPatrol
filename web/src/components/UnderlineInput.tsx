import { InputHTMLAttributes } from "react";

export function UnderlineInput({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="p-2 border-b border-b-slate-300 outline-none w-full"
      {...rest}
    />
  );
}
