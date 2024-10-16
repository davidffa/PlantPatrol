import { ReactNode } from "react";

type Props = {
  title: string;
  data: string;
  sender: string;
  description: string;
  thanks: string;
  name: string
}

export function AlertCollapse({ title, data,sender, description, thanks, name }: Props) {
  return (
    <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border  mb-4">
      <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex justify-between items-center">
          <div><p>{title}</p></div>
          <div><p className="text-slate-500 text-sm">{data}</p></div>
          </div>
        <div className="collapse-content">
          <hr className="mb-4"/>
          <p>Sent to: {sender}</p>
          <p>Description:</p>
          <p>{description}</p>
          <br/>
          <p>{thanks}</p>
          <p>{name}</p>
        </div>
      </div>
  );
}