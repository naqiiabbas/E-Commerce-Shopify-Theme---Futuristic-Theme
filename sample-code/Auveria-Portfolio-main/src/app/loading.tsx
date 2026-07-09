export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-6 py-20 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-[30px] border border-[var(--color-border-soft)] bg-[var(--color-surface)]"
          />
        ))}
      </div>
    </div>
  );
}
