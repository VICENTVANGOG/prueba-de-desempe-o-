import React, { useEffect, useState } from 'react';
import { Product as ProductType } from '@/interfaces/producto';
import { useTranslation } from 'next-i18next';
import { FaShoppingCart, FaCoins } from 'react-icons/fa'; 
import { MdStar } from 'react-icons/md'; 
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import LikeButton from '@/components/like/likebuttom'; 

import './Product.scss';

const categoryColors: Record<string, string> = {
  "men's clothing": "#e0f7fa",
  "jewelery": "#fce4ec",
  "electronics": "#f0f4c3",
  "women's clothing": "#ffe0b2"
};

const renderStars = (rating: number) => {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => (
        <MdStar
          key={index}
          className={index < Math.round(rating) ? 'star filled' : 'star'}
          size={16}
        />
      ))}
    </div>
  );
};

const Product: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('Token no encontrado en las cookies');
        }

        const response = await fetch('/api/post', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="loading-message">{t('loading')}...</p>;
  if (error) return <p className="error-message">{t('error', { message: error })}</p>;

  const filteredProducts = selectedCategory === 'all products' || selectedCategory === '' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: ProductType) => {
    dispatch(addItem({ ...product, quantity: 1 })); 
  };

  return (
    <div className="product-list">
      {filteredProducts.length === 0 && (
        <p>{t('noProducts')}</p>
      )}
      {filteredProducts.map(product => (
        <div key={product.id} className="product-card" style={{ backgroundColor: categoryColors[product.category] }}>
          <div className="product-image-container">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-overlay">
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                <FaShoppingCart size={20} />
                {t('addToCart')}
              </button>
              
            </div>
          </div>
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">
              ${product.price.toFixed(2)} 
              <FaCoins size={16} className="price-icon" />
            </p>
            <div className="product-rating">
              {renderStars(product.rating.rate)}
              <span className="rating-count">({product.rating.count})</span>
            </div>
            <div>
              <LikeButton 
                productId={product.id} 
                initialLikes={0} 
                isLiked={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
