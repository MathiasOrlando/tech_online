import { useCart } from "../hooks/useCart";

export function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Tu carrito está vacío</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${item.price}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg font-semibold">Total: ${total.toFixed(2)}</p>
      <button
        onClick={handleClearCart}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Limpiar carrito
      </button>
    </div>
  );
}
