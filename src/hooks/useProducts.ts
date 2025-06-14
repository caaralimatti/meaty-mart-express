
export const useProducts = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Premium Goat Curry Cut",
      weight: "500g",
      price: 420,
      originalPrice: 450,
      image: "/placeholder.svg",
      category: "curry-cut",
      boneIn: true,
      inStock: true,
      rating: 4.5,
      freshness: "Farm Fresh",
    },
    {
      id: 2,
      name: "Boneless Goat Chunks",
      weight: "250g",
      price: 380,
      originalPrice: 400,
      image: "/placeholder.svg",
      category: "boneless",
      boneIn: false,
      inStock: true,
      rating: 4.7,
      freshness: "Premium Cut",
    },
    {
      id: 3,
      name: "Marinated Goat Biryani Cut",
      weight: "1kg",
      price: 850,
      originalPrice: 900,
      image: "/placeholder.svg",
      category: "marinated",
      boneIn: true,
      inStock: false,
      rating: 4.8,
      freshness: "Special Marinade",
    },
  ];

  const addToCart = (product: any, cartItems: any[], setCartItems: React.Dispatch<React.SetStateAction<any[]>>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId: number, wishlistItems: number[], setWishlistItems: React.Dispatch<React.SetStateAction<number[]>>) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filterProducts = (products: any[], searchQuery: string, selectedFilter: string, filters: any) => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === "all" || product.category === selectedFilter;
      const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;
      
      return matchesSearch && matchesFilter && matchesPriceRange && matchesCategory && matchesRating && matchesStock;
    });
  };

  return {
    mockProducts,
    addToCart,
    toggleWishlist,
    filterProducts
  };
};
