import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://placeholder/create-product', productData);
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to add product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Request Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Picture</th>
            <th>URL</th>
            <th>Currency</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requestProducts.map((requestProduct) => (
            <tr key={requestProduct.id}>
              <td>{requestProduct.name}</td>
              <td>{requestProduct.price}</td>
              <td><img src={requestProduct.pictureUrl} alt={requestProduct.name} width="50"/></td>
              <td>{requestProduct.url}</td>
              <td>{requestProduct.currency}</td>
              <td>
                <button onClick={() => addProductToSystem(requestProduct)}>
                  Add Product to System
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReqProdAdmin;
