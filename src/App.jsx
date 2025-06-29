import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const API_KEY = 'MU6ZTVuvKagKmMwjiowI3Sr-TeMymymZdQ8ITXW87nc';
const BASE_URL = 'https://api.unsplash.com/search/photos';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchImages = async (searchQuery, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(BASE_URL, {
        params: {
          query: searchQuery,
          page: pageNum,
          per_page: 12,
          client_id: API_KEY,
        },
      });

      const newImages = response.data.results;
      
      if (pageNum === 1) {
        setImages(newImages);
      } else {
        setImages(prev => [...prev, ...newImages]);
      }
      
      setHasMore(newImages.length === 12);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    searchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    searchImages(query, page + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      
      {error && <ErrorMessage message={error} />}
      
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      
      {loading && <Loader />}
      
      {hasMore && images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      
      {isModalOpen && selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
