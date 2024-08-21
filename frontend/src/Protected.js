import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate('/');
    }
  }, [navigate]);

  return <Component />;
}
