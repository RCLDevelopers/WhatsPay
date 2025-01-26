import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import ProductCard from '../components/catalog/ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(3, 0),
  },
}));

const Catalog = () => {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);

  // Fetch products from WhatsApp Business Catalog API
  React.useEffect(() => {
    // TODO: Implement API call
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 99.99,
        image: 'https://via.placeholder.com/200',
      },
      // Add more mock products
    ];
    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', product);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Product Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Catalog; 