interface IButton {
  children: string;
}

export default function Button({ children }: IButton) {
  return <button className="py-4 px-10 rounded-xl bg-purple-600 font-extrabold text-lg my-5 max-w-65">{children}</button>;
}
