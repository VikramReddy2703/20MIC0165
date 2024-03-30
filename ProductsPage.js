import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { name, company, category, price, rating, discount, availability } = product;

  return (
    <Col xs={12} md={6} lg={4}>
      <Card>
        <Card.Img variant="top" src={availability ? product.imageUrl : 'placeholder.jpg'} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <p>
            <span className="text-muted">Company: </span>
            {company}
          </p>
          <p>
            <span className="text-muted">Category: </span>
            {category}
          </p>
          <p>
            <span className="text-muted">Price: </span>
            ${price.toFixed(2)}
          </p>
          <div>
            <span className="text-muted">Rating: </span>
            {rating}
          </div>
          {discount > 0 && (
            <Badge bg="danger" pill>
              -{discount}%
            </Badge>
          )}
          <p className={availability ? '' : 'text-danger'}>
            Availability: {availability ? 'In Stock' : 'Out of Stock'}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [numProducts, setNumProducts] = useState(10);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://20.244.56.144/test/companies/<span class="math-inline">\{selectedCompany\}/categories/</span>{selectedCategory}/products/top-<span class="math-inline">\{numProducts\}?minPrice\=</span>{minPrice}&maxPrice=${maxPrice}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, [selectedCompany, selectedCategory, minPrice, maxPrice, numProducts]);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(parseFloat(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseFloat(event.target.value));
  };

  const handleNumProductsChange = (event) => {
    setNumProducts(parseInt(event.target.value));
  };

  return (
    <Container>
      <h1>Top Products</h1>
      <p>Select filters to view products:</p>
      <Row>
        <Col md={3}>
          <label htmlFor="company">Company:</label>
          <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
            <option value="">All</option>
            <option value="AMZ">AMZ</option>
            <option value="P">P</option>
            <option value="SP">SP</option>
            <option value="HYN">HYN</option>
            <option value="AZO">AZO</option>
          </select>
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            <option value="Earphone">Earphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Charger">Charger</option>
            <option value="House">House</option>
            <option value="Keypad">Keypad</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="Pendrive">Pendrive</option>
            <option value="Remote">Remote</option>
            <option value="Speaker">Speaker</option>
            <option value="Headset">Headset</option>
            <option value="Laptop">Laptop</option>
            <option value="PC">PC</option>
          </select>
        </Col>
        <Col md={3}>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </Col>
        <Col md={3}>
          <label htmlFor="numProducts">Number of Products:</label>
          <input
            type="number"
            id="numProducts"
            value={numProducts}
            onChange={handleNumProductsChange}
          />
        </Col>
      </Row>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="d-flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductsPage;