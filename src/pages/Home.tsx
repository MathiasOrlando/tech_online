import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../hooks/useCart";

export function Home() {
  const { productsByCategory, loading } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="space-y-8">
      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
