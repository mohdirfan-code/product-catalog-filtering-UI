import React, { useState, useEffect, useMemo } from 'react';

const ProductCatalog = () => {
  // Mock product data
  const mockProducts = [
    { id: 1, name: "MacBook Pro 16", category: "Electronics", brand: "Apple", price: 2499, rating: 4.8, image: "💻", description: "Powerful laptop for professionals" },
    { id: 2, name: "AirPods Pro", category: "Electronics", brand: "Apple", price: 249, rating: 4.7, image: "🎧", description: "Wireless noise-canceling earbuds" },
    { id: 3, name: "Galaxy S24", category: "Electronics", brand: "Samsung", price: 999, rating: 4.6, image: "📱", description: "Latest flagship smartphone" },
    { id: 4, name: "Nike Air Max", category: "Fashion", brand: "Nike", price: 150, rating: 4.5, image: "👟", description: "Comfortable running shoes" },
    { id: 5, name: "Levi's 501 Jeans", category: "Fashion", brand: "Levi's", price: 80, rating: 4.4, image: "👖", description: "Classic straight-fit jeans" },
    { id: 6, name: "Instant Pot", category: "Home", brand: "Instant Pot", price: 129, rating: 4.9, image: "🍲", description: "Multi-use pressure cooker" },
    { id: 7, name: "Dyson V15", category: "Home", brand: "Dyson", price: 749, rating: 4.7, image: "🧹", description: "Cordless vacuum cleaner" },
    { id: 8, name: "iPad Air", category: "Electronics", brand: "Apple", price: 599, rating: 4.8, image: "📱", description: "Versatile tablet for work and play" },
    { id: 9, name: "Adidas Ultraboost", category: "Fashion", brand: "Adidas", price: 180, rating: 4.6, image: "👟", description: "Premium running shoes" },
    { id: 10, name: "KitchenAid Mixer", category: "Home", brand: "KitchenAid", price: 379, rating: 4.8, image: "🥧", description: "Stand mixer for baking" },
    { id: 11, name: "Sony WH-1000XM5", category: "Electronics", brand: "Sony", price: 399, rating: 4.7, image: "🎧", description: "Premium noise-canceling headphones" },
    { id: 12, name: "Patagonia Jacket", category: "Fashion", brand: "Patagonia", price: 199, rating: 4.5, image: "🧥", description: "Outdoor winter jacket" },
  ];

  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());

  // Extract unique categories and brands
  const categories = [...new Set(mockProducts.map(p => p.category))];
  const brands = [...new Set(mockProducts.map(p => p.brand))];

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseInt(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [searchTerm, selectedCategory, selectedBrands, priceRange, sortBy]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4c1d95 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Embedded Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .btn-primary {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: linear-gradient(45deg, #db2777, #7c3aed);
          transform: scale(1.05);
        }
        .input-glass {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          padding: 12px;
          width: calc(100% - 24px);  // ← This accounts for left + right padding
          transition: all 0.3s ease;
        }
        .input-glass::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        .input-glass:focus {
          outline: none;
          border-color: #ec4899;
          box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.3);
        }
        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .badge-pink {
          background: rgba(236, 72, 153, 0.2);
          color: #fbb6ce;
        }
        .badge-blue {
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .product-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .sidebar {
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        .star-rating {
          color: #fbbf24;
          font-size: 16px;
        }
        .star-empty {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Header */}
      <div className="glass-card" style={{ margin: 0, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🛒
              </div>
              <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                ProductHub
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {filteredProducts.length} products found
              </span>
              <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '4px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: viewMode === 'grid' ? 'white' : 'transparent',
                    color: viewMode === 'grid' ? '#1f2937' : 'white'
                  }}
                >
                  📱 Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: viewMode === 'list' ? 'white' : 'transparent',
                    color: viewMode === 'list' ? '#1f2937' : 'white'
                  }}
                >
                  📃 List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          {/* Filters Sidebar */}
          <div className="sidebar">
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: 0, display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', fontSize: '18px' }}>🔧</span>
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ec4899',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#db2777'}
                  onMouseOut={(e) => e.target.style.color = '#ec4899'}
                >
                  <span style={{ marginRight: '4px' }}>🔄</span>
                  Reset
                </button>
              </div>

              {/* Search */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Search
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '16px'
                  }}>
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-glass"
                    style={{ paddingLeft: '30px' }}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-glass"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#1f2937', color: 'white' }}>All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category} style={{ background: '#1f2937', color: 'white' }}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Brands
                </label>
                <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {brands.map(brand => (
                    <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.9)' }}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer',
                          accentColor: '#ec4899'
                        }}
                      />
                      <span style={{ fontSize: '14px' }}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Price Range
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="input-glass"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="input-glass"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-glass"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="name" style={{ background: '#1f2937', color: 'white' }}>Name (A-Z)</option>
                  <option value="price-low" style={{ background: '#1f2937', color: 'white' }}>Price: Low to High</option>
                  <option value="price-high" style={{ background: '#1f2937', color: 'white' }}>Price: High to Low</option>
                  <option value="rating" style={{ background: '#1f2937', color: 'white' }}>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {filteredProducts.length === 0 ? (
              <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                  No products found
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'product-grid' : ''} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '16px' } : {}}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="product-card"
                    style={viewMode === 'list' ? { 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '16px',
                      gap: '16px'
                    } : {}}
                  >
                    <div style={{
                      textAlign: 'center',
                      marginBottom: viewMode === 'list' ? 0 : '16px',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: viewMode === 'list' ? '60px' : '80px',
                        height: viewMode === 'list' ? '60px' : '80px',
                        background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: viewMode === 'list' ? '24px' : '32px',
                        margin: viewMode === 'list' ? 0 : '0 auto'
                      }}>
                        {product.image}
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{
                          color: 'white',
                          fontWeight: '600',
                          margin: 0,
                          fontSize: '18px'
                        }}>
                          {product.name}
                        </h3>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '18px',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          {favorites.has(product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>

                      <div style={{
                        display: viewMode === 'list' ? 'flex' : 'block',
                        gap: viewMode === 'list' ? '16px' : '8px',
                        alignItems: viewMode === 'list' ? 'center' : 'flex-start'
                      }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: viewMode === 'list' ? 0 : '8px' }}>
                          <span className="badge badge-pink">{product.category}</span>
                          <span className="badge badge-blue">{product.brand}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: viewMode === 'list' ? 0 : '8px' }}>
                          <div style={{ display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={i < Math.floor(product.rating) ? 'star-rating' : 'star-empty'}
                                style={{ fontSize: '16px' }}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                            {product.rating}
                          </span>
                        </div>

                        {viewMode === 'grid' && (
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '14px',
                            margin: '8px 0'
                          }}>
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        flexDirection: viewMode === 'list' ? 'column' : 'row',
                        gap: viewMode === 'list' ? '8px' : 0
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: 'white'
                        }}>
                          ${product.price}
                        </div>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>🛒</span>
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;