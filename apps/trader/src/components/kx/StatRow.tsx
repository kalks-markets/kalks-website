/** A row of glass number tiles on the blue field (page heroes). Numbers come from content/facts.ts. */
export function StatRow({ items }: { items: { v: string; l: string }[] }) {
  return (
    <dl className="kx-stats">
      {items.map((s) => (
        <div key={s.l}>
          <dt>{s.l}</dt>
          <dd>{s.v}</dd>
        </div>
      ))}
    </dl>
  );
}
