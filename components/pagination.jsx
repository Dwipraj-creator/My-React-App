import React, { useEffect, useState } from 'react';
import './pagination.css'; 

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setPosts(data.results);
    };
    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="pagination-container">
      <h2>Posts (Page {currentPage})</h2>
      <div className="posts-grid">
        {currentPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.name} className="post-image" />
            <p className="post-name">{post.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
    f      </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;

