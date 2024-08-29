import Button from "./Button";

export default function Product({
  id,
  name,
  image,
  price,
  category,
  cart,
  // filteredSortedProducts,
  product,
  setProducts,
  // setEditedProduct,
  setCart,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>
          ({id}) {name}
        </h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
        <h2>({category})</h2>
        <div>
          {/* <Button
            variant="tonal"
            onClick={() =>
              setEditedProduct({
                id,
                name,
                image,
                price,
              })
            }
          >
            Edit
          </Button> */}
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

          {/* <Button
            onClick={() => {
              confirm(`Apakah Anda yakin ingin menghapus?`) &&
                setProducts(product.filter((p) => p.id !== product.id));
            }}
          >
            hapus
          </Button> */}
        </div>
      </section>
    </div>
  );
}
