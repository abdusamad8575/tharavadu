
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/gallery/clientFetch`, {
          params: { page: currentPage, limit: 12 }
        });
        setItems(response.data.gallery);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching gallery data', error);
      }
    };

    fetchGallery();
  }, [currentPage]);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <NavBar />
      <div className="gallery-container">
        <h1 className="gallery-title">Our Gallery</h1>
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div className="gallery-item" key={index} onClick={() => openModal(item)}>
              {item.mimetype.startsWith('image/') ? (
                <img src={`${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${item.filename}`} alt={item.filename} className="gallery-image" />
              ) : (
                <video controls src={`${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${item.filename}`} className="gallery-video" />
              )}
            </div>
          ))}
        </div>
        {selectedItem && (
          <div className="modal" onClick={closeModal}>
            <span className="close">&times;</span>
            {selectedItem.mimetype.startsWith('image/') ? (
                <img src={`${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${selectedItem.filename}`} alt={selectedItem.filename} className="gallery-image" />
              ) : (
                <video controls src={`${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${selectedItem.filename}`} className="gallery-video" />
              )}
          </div>
        )}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
