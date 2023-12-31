type Action = "increase" | "decrease";

type Props = {
  id: string;
  type: Action;
  onAction: (value: number) => void;
  value: number;
};

export default function Button({ id, type, onAction, value }: Props) {
  return (
    <button
      id={id}
      className="rounded-md bg-indigo-400 px-4 py-4 ring-2 ring-indigo-600 ring-offset-2 hover:bg-indigo-500"
      onClick={() => onAction(value)}
    >
      {type === "increase" ? "+" : "-"}
    </button>
  );
}
