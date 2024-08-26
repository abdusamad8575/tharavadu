import React, { useState } from 'react'
import './Gallery.css'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Gallery() {
    const images = [
        { id: 1, src: 'https://media.istockphoto.com/id/459005973/photo/theyyam-ritual-in-kerala.jpg?s=612x612&w=0&k=20&c=uF19sDXt99iyg6K_-yCBLO4aRHPo7P4LH-ghe3uRP3U=', alt: 'Kerala Backwaters' },
        { id: 2, src: 'https://media.istockphoto.com/id/488513942/photo/onum-celebrations.jpg?s=612x612&w=0&k=20&c=e2xnaj6lILvlUJZReiQwBG3BaF2duA3y6GFzbcRkM5Y=', alt: 'Tea Plantations' },
        { id: 3, src: 'https://media.istockphoto.com/id/804652886/photo/indian-elephant-festival.jpg?s=612x612&w=0&k=20&c=NnPJYoTBYfnLLJlw_HTxQDbwMP1_DrkGev13EBJEzs8=', alt: 'Kerala Beach' },
        { id: 4, src: 'https://media.istockphoto.com/id/507181584/photo/theyyam-performance.jpg?s=612x612&w=0&k=20&c=DjAU8bhtHhnPDIGiwYbzGI5KXFuC-Ia1gmBeXYCHqQQ=', alt: 'Traditional Dance' },
        { id: 5, src: 'https://media.istockphoto.com/id/534192312/photo/thrissur-pooram.jpg?s=612x612&w=0&k=20&c=pxLTky3d0ASzZ5SgkJMTn5e3C_LvZwUQ5NCe83Ep1c0=', alt: 'Kerala Cuisine' },
        { id: 6, src: 'https://media.istockphoto.com/id/503219304/photo/traditional-kathakali-dance-on-new-year-carnival.jpg?s=612x612&w=0&k=20&c=RgxVoXvUEfI901fjNAoAZv8O7UYLF-aKsjHO1Z6hfzY=', alt: 'Elephant Sanctuary' },
        { id: 5, src: 'https://media.istockphoto.com/id/1051574672/photo/kathakali-artist-looks-puzzled.jpg?s=612x612&w=0&k=20&c=fYY40yH3CUi6mWgiFw7r9D86fgIr7pe3OfgBTUFrnEk=', alt: 'Kerala Cuisine' },
        { id: 6, src: 'https://media.istockphoto.com/id/503326882/photo/musicians-performing-with-on-the-streets-of-fort-kochi-india.jpg?s=612x612&w=0&k=20&c=eaV0qDpdEiHxszdTwwuXggBOEpwo5ca_u31bSJGAkPI=', alt: 'Elephant Sanctuary' },
      ]

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image.src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
     <NavBar/>
        <div className="gallery-container">
          <h1 className="gallery-title">Our Gallery</h1>
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div className="gallery-item" key={index} onClick={() => openModal(image)}>
                <img src={image.src} alt={`Gallery ${index}`} className="gallery-image" />
              </div>
            ))}
          </div>
    
          {selectedImage && (
            <div className="modal" onClick={closeModal}>
              <span className="close">&times;</span>
              <img className="modal-content" src={selectedImage} alt="Preview" />
            </div>
          )}
        </div>
       <Footer/> 
    </>
  )
}

export default Gallery
