import Button from "./Button";

export default function Product({ id, name, image, price, category, cart, setCart }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
        <p>#{category}</p>
        <div >
          <Button
            onClick={() => {
              if (cart.find((p) => p.id === id)) {
                setCart(
                  cart.map((p) =>
                    p.id === id
                      ? {
                          ...p,
                          count: p.count + 1,
                        }
                      : p
                  )
                );
              } else {
                setCart([
                  ...cart,
                  {
                    id,
                    name,
                    image,
                    price,
                    count: 1,
                  },
                ]);
              }
            }}
            title="Tambahkan ke keranjang"
          >
            Beli
          </Button>
        </div>
      </section>
    </div>
  );
}
