import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      category: "Laptop",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      category: "Smartphone",
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      category: "Smartphone",
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      category: "Headset",
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      category: "Watch",
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      category: "Tablet",
    },
    {
      id: 7,
      name: "MacBook Air 16",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      category: "Laptop",
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      category: "Smartphone",
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      category: "Smartphone",
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      category: "Headset",
    },
    {
      id: 11,
      name: "Apple Watch Series 9",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      category: "Watch",
    },
    {
      id: 12,
      name: "iPad Promax",
      image: "/ipad_pro.jpg",
      price: 15999999,
      category: "Tablet",
    },
  ]);
  const [idSquence, setIdSequence] = useState(products.length);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showBy, setShowBy] = useState("");
  const [page, setPage] = useState(1);
  const [newItem, setNewItem] = useState();
  // const [editedProduct, setEditedProduct] = useState();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.category.includes(showBy) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <div className="products">
      <header>
        <Button onClick={() => setNewItem({ id: idSquence })}>Tambah</Button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
          <label>
            Kategori:
            <select value={showBy} onChange={(e) => setShowBy(e.target.value)}>
              <option value="">Semua</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Headset">Headset</option>
              <option value="Watch">Watch</option>
            </select>
          </label>
        </section>
        <section>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <section>
          <Button onClick={() => setIsCartOpen(true)}>
            Keranjang: {cart.reduce((a, p) => a + p.count, 0)}
          </Button>
        </section>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setProducts={setProducts}
                  product={product}
                  filteredSortedProducts={filteredSortedProducts}
                  // setEditedProduct={setEditedProduct}
                  cart={cart}
                  setCart={setCart}
                />
              ))
          : "Tidak ada produk ditemukan."}
      </main>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % 4 === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Berikutnya
        </Button>
      </footer>

      {/* {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )} */}

      {isCartOpen && (
        <div className="card dialog">
          <button onClick={() => setIsCartOpen(false)}>tutup</button>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          // menggunakan indeks:
                          // setCart(
                          //   cart.with(i, { ...product, count: product.count - 1 })
                          // );
                          // menggunakan ID product:
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      min
                    </button>
                    <button
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      plus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}

      {newItem && (
        <form
          className="card dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setNewItem([...products, newItem]);
            setNewItem();
            setIdSequence(idSquence + 1);
          }}
        >
          <h1>Tambah Item</h1>
          <label>
            ID
            <input type="text" value={newItem.id} readOnly />
          </label>
          <label>
            Nama
            <input
              type="text"
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              required
            />
          </label>
          <div>
            <button onClick={() => setNewItem()}>Batal</button>
            <button>Simpan</button>
          </div>
        </form>
      )} */}
    </div>
  );
}
