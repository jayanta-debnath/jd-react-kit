export function MainLayout(params: { title: string }) {
  return (
    <div>
      <label>Hello, {params.title}</label>
    </div>
  );
}
