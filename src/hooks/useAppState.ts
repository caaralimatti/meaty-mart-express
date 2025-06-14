
import { useState } from "react";

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  boneType: string[];
  freshness: string[];
  rating: number;
  inStock: boolean;
  fastDelivery: boolean;
}

export const useAppState = () => {
  const [selectedProductForReview, setSelectedProductForReview] = useState("");
  const [selectedProductForNutrition, setSelectedProductForNutrition] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([1, 3]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    boneType: [],
    freshness: [],
    rating: 0,
    inStock: false,
    fastDelivery: false
  });

  return {
    state: {
      selectedProductForReview,
      selectedProductForNutrition,
      cartItems,
      wishlistItems,
      searchQuery,
      selectedFilter,
      isLoggedIn,
      notificationCount,
      filters,
    },
    handlers: {
      setSelectedProductForReview,
      setSelectedProductForNutrition,
      setCartItems,
      setWishlistItems,
      setSearchQuery,
      setSelectedFilter,
      setIsLoggedIn,
      setNotificationCount,
      setFilters,
    }
  };
};
