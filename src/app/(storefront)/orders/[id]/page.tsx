export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <main>Order route boundary: {id}</main>;
}
