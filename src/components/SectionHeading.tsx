interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-8 h-0.5 bg-rose-400" aria-hidden="true" />
        <span className="block w-1.5 h-1.5 rounded-full bg-rose-400" aria-hidden="true" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-rose-950 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-neutral-400 text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
