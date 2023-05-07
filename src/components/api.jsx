export async function getProducts() {
  try {
    const res = await fetch(
      "https://products1-f84b0-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    const data = await res.json();
    const productsArray = [];
    for (let id in data) {
      productsArray.push({ id, ...data[id] });
    }
    return productsArray;
  } catch (err) {
    console.error(err);
  }
}
