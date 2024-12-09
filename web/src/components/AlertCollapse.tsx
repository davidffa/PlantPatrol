type Props = {
  title: string;
  data: string;
  sentTo: string;
  description: string;
  sender: boolean;

}

export function AlertCollapse({ title, data, sentTo, description, sender }: Props) {
  return (
    <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border  mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <div><p>{title}</p></div>
        <div><p className="text-slate-500 text-sm">{data}</p></div>
      </div>
      <div className="collapse-content">
        <hr className="mb-4" />
        <p>Sent to: {sentTo}</p>
        <br />
        <p>Description:</p>
        <p>{description}</p>
        <br />
        {sender ?
          <p>Message generated from system!</p>
          :
          <>
            <p>From:</p>
            <p>João Ramalho</p>
          </>
        }
      </div>
    </div>
  );
}