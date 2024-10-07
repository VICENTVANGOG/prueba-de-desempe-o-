import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LikeButtonProps } from '@/interfaces/LikeButtonProps';

const LikeButton: React.FC<LikeButtonProps> = ({ productId, initialLikes, isLiked }) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(isLiked);

  useEffect(() => {
    const cookieLiked = Cookies.get(`liked-${productId}`);
    if (cookieLiked) {
      const parsedLiked = cookieLiked === 'true';
      setLiked(parsedLiked);
      setLikeCount(parsedLiked ? initialLikes + 1 : initialLikes);
    }
  }, [productId, initialLikes]);

  const handleLike = async () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1];

    if (!token) {
      alert('Token no encontrado');
      return;
    }

    try {
      const method = liked ? 'DELETE' : 'POST';
      const response = await fetch(`api/like/${productId}`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(liked ? 'Error al quitar like del producto' : 'Error al dar like al producto');
      }

      const data = await response.json();
      console.log('Like enviado:', data);

      setLiked(prev => {
        const newLiked = !prev;
        setLikeCount(newLiked ? likeCount + 1 : likeCount - 1);
        Cookies.set(`liked-${productId}`, newLiked.toString(), { expires: 7 });
        return newLiked;
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button 
        onClick={handleLike} 
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
        }}
      >
        {liked ? (
          <FaHeart style={{color: 'red', fontSize: '38px' }} />
        ) : (
          <FaRegHeart style={{ color: 'white', fontSize: '38px' }} />
        )}
      </button>
      <span>{likeCount}</span> 
    </div>
  );
};

export default LikeButton;
