import { useState, useEffect } from 'react';
import { getProducts, getBlogs, getCertificates, getEnquiries, syncStoreWithCloud } from './adminStore';

export function useStoreProducts() {
  const [products, setProducts] = useState(() => {
    const list = getProducts();
    return Array.isArray(list) ? list : [];
  });

  useEffect(() => {
    // Initial active sync with live Firebase Firestore
    syncStoreWithCloud();

    const handleUpdate = () => {
      const list = getProducts();
      setProducts(Array.isArray(list) ? list : []);
    };
    window.addEventListener('priya_store_updated', handleUpdate);
    return () => window.removeEventListener('priya_store_updated', handleUpdate);
  }, []);

  return Array.isArray(products) ? products : [];
}

export function useStoreBlogs() {
  const [blogs, setBlogs] = useState(() => {
    const list = getBlogs();
    return Array.isArray(list) ? list : [];
  });

  useEffect(() => {
    syncStoreWithCloud();

    const handleUpdate = () => {
      const list = getBlogs();
      setBlogs(Array.isArray(list) ? list : []);
    };
    window.addEventListener('priya_store_updated', handleUpdate);
    return () => window.removeEventListener('priya_store_updated', handleUpdate);
  }, []);

  return Array.isArray(blogs) ? blogs : [];
}

export function useStoreCertificates() {
  const [certs, setCerts] = useState(() => {
    const list = getCertificates();
    return Array.isArray(list) ? list : [];
  });

  useEffect(() => {
    syncStoreWithCloud();

    const handleUpdate = () => {
      const list = getCertificates();
      setCerts(Array.isArray(list) ? list : []);
    };
    window.addEventListener('priya_store_updated', handleUpdate);
    return () => window.removeEventListener('priya_store_updated', handleUpdate);
  }, []);

  return Array.isArray(certs) ? certs : [];
}

export function useStoreEnquiries() {
  const [enquiries, setEnquiries] = useState(() => {
    const list = getEnquiries();
    return Array.isArray(list) ? list : [];
  });

  useEffect(() => {
    syncStoreWithCloud();

    const handleUpdate = () => {
      const list = getEnquiries();
      setEnquiries(Array.isArray(list) ? list : []);
    };
    window.addEventListener('priya_store_updated', handleUpdate);
    return () => window.removeEventListener('priya_store_updated', handleUpdate);
  }, []);

  return Array.isArray(enquiries) ? enquiries : [];
}
