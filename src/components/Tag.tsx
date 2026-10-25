interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-stone-500 border border-rose-200">
      {label}
    </span>
  );
}
