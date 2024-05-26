import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ReqProdAdmin.module.css';

const ReqProdAdmin = () => {
  const [requestProducts, setRequestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequestProducts();
  }, []);

  const fetchRequestProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/request-product');
      setRequestProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching request products', error);
      setLoading(false);
    }
  };

  const addProductToSystem = async (requestProduct) => {
    const productData = {
      productName: requestProduct.name,
      productPrice: requestProduct.price,
      productStock: 1,
      productPictureUrl: requestProduct.pictureUrl,
      productDiscount: 0.0,
      productDiscountDaysLeft: 0,
    };

    try {
      await axios.post('https://product-microservice.faizi.biz.id/create-product', productData);
      await deleteProduct(requestProduct.id);
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to add product');
    }

    const deleteProduct = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/api/request-product/${id}`);
          setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Admin Page</h1>
      <h2 className={styles.header}>Request Products</h2>
      <div className={styles.cardContainer}>
        {requestProducts.map((requestProduct) => (
          <div key={requestProduct.id} className={styles.card}>
            <h3>{requestProduct.name}</h3>
            <img src={requestProduct.pictureUrl} alt={requestProduct.name} className={styles.image} />
            <p>Price: {requestProduct.price} {requestProduct.currency}</p>
            <p>URL: <a href={requestProduct.url}>{requestProduct.url}</a></p>
            <button onClick={() => addProductToSystem(requestProduct)} className={styles.button}>
              Add Product to System
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReqProdAdmin;
