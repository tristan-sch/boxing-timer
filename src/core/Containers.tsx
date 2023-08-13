import clsx from "clsx";

type Props = {
  className?: string;
  children?: JSX.Element | React.ReactNode | string | undefined;
};

export default function Container({ className, children, ...props }: Props) {
  return (
    <div className={clsx("px-4 py-8", className)} {...props}>
      {children}
    </div>
  );
}
