import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ReqProdUser.module.css';

export default function ReqProdUser() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    pictureUrl: '',
    price: '',
    url: '',
    currency: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/request-product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/request-product', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        pictureUrl: '',
        price: '',
        url: '',
        currency: '',
      });
    } catch (error) {
      console.error('Error creating request product:', error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/request-product/${id}`, updatedProduct);
      setProducts(products.map((product) => (product.id === id ? response.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating request product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/request-product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Request Products</h1>
      <div className={styles.formContainer}>
        <h2>Make A Request</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={newProduct.pictureUrl}
          onChange={(e) => setNewProduct({ ...newProduct, pictureUrl: e.target.value })}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="URL"
          value={newProduct.url}
          onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
          className={styles.input}
        />
        <select
          value={newProduct.currency}
          onChange={(e) => setNewProduct({ ...newProduct, currency: e.target.value })}
          className={styles.input}
        >
          <option value="IDR">IDR</option>
          <option value="JPY">JPY</option>
          <option value="USD">USD</option>
        </select>
        <button onClick={createProduct} className={styles.button}>Create</button>
      </div>

      <h2>Your Request Products</h2>
      <div className={styles.cardContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <h3>{product.name}</h3>
            <img src={product.pictureUrl} alt={product.name} width="100" className={styles.image}/>
            <p>Price: {product.price} {product.currency}</p>
            <p>URL: <a href={product.url}>{product.url}</a></p>
            <button onClick={() => deleteProduct(product.id)} className={styles.button}>Delete</button>
            <button onClick={() => setEditingProduct(product)} className={styles.button}>Edit</button>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className={styles.formContainer}>
          <h2>Edit Request Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Picture URL"
            value={editingProduct.pictureUrl}
            onChange={(e) => setEditingProduct({ ...editingProduct, pictureUrl: e.target.value })}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="URL"
            value={editingProduct.url}
            onChange={(e) => setEditingProduct({ ...editingProduct, url: e.target.value })}
            className={styles.input}
          />
          <select
            value={editingProduct.currency}
            onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value })}
            className={styles.input}
          >
            <option value="IDR">IDR</option>
            <option value="JPY">JPY</option>
            <option value="USD">USD</option>
          </select>
          <button onClick={() => updateProduct(editingProduct.id, editingProduct)} className={styles.button}>Save</button>
        </div>
      )}
    </div>
  );
}
