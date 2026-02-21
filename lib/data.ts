export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  popular?: boolean
  dietary?: string[]
}

export interface Restaurant {
  id: string
  name: string
  slug: string
  description: string
  cuisine: string
  image: string
  rating: number
  reviewCount: number
  deliveryFee: number
  deliveryTime: string
  address: string
  phone: string
  hours: string
  featured?: boolean
  menu: MenuItem[]
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Sophia's Thai Kitchen",
    slug: "sophias-thai-kitchen",
    description: "Authentic Thai cuisine crafted with locally-sourced ingredients. Family recipes passed down through three generations.",
    cuisine: "Thai",
    image: "/images/thai-kitchen.jpg",
    rating: 4.8,
    reviewCount: 342,
    deliveryFee: 2.99,
    deliveryTime: "25-35 min",
    address: "129 E St, Davis, CA 95616",
    phone: "(530) 555-0101",
    hours: "11:00 AM - 9:30 PM",
    featured: true,
    menu: [
      { id: "1-1", name: "Pad Thai", description: "Rice noodles stir-fried with shrimp, egg, bean sprouts, and crushed peanuts", price: 14.95, category: "Noodles", popular: true, dietary: ["gluten-free"] },
      { id: "1-2", name: "Green Curry", description: "Coconut milk curry with bamboo shoots, Thai basil, and your choice of protein", price: 15.95, category: "Curries", popular: true, dietary: ["gluten-free"] },
      { id: "1-3", name: "Tom Kha Gai", description: "Coconut soup with chicken, galangal, lemongrass, and mushrooms", price: 8.95, category: "Soups", dietary: ["gluten-free"] },
      { id: "1-4", name: "Mango Sticky Rice", description: "Sweet sticky rice topped with fresh mango and coconut cream", price: 7.95, category: "Desserts", popular: true, dietary: ["vegan", "gluten-free"] },
      { id: "1-5", name: "Thai Iced Tea", description: "Strong brewed black tea with condensed milk over ice", price: 4.50, category: "Drinks" },
      { id: "1-6", name: "Spring Rolls", description: "Crispy vegetable spring rolls served with sweet chili sauce", price: 6.95, category: "Appetizers", dietary: ["vegan"] },
      { id: "1-7", name: "Massaman Curry", description: "Rich and mild curry with potatoes, peanuts, and onions", price: 16.95, category: "Curries", dietary: ["gluten-free"] },
      { id: "1-8", name: "Basil Fried Rice", description: "Jasmine rice stir-fried with Thai basil, vegetables, and chili", price: 13.95, category: "Rice", dietary: ["vegan"] },
    ],
  },
  {
    id: "2",
    name: "Davis Burger Collective",
    slug: "davis-burger-collective",
    description: "Handcrafted burgers using grass-fed beef from local Yolo County ranches. Every bite supports local agriculture.",
    cuisine: "American",
    image: "/images/burger-joint.jpg",
    rating: 4.6,
    reviewCount: 218,
    deliveryFee: 3.49,
    deliveryTime: "20-30 min",
    address: "234 G St, Davis, CA 95616",
    phone: "(530) 555-0202",
    hours: "11:00 AM - 10:00 PM",
    featured: true,
    menu: [
      { id: "2-1", name: "Classic Smash Burger", description: "Double smash patty, American cheese, pickles, special sauce on a brioche bun", price: 13.95, category: "Burgers", popular: true },
      { id: "2-2", name: "Mushroom Swiss Burger", description: "Grilled mushrooms, Swiss cheese, garlic aioli on a toasted bun", price: 14.95, category: "Burgers" },
      { id: "2-3", name: "Sweet Potato Fries", description: "Hand-cut sweet potato fries with chipotle dipping sauce", price: 5.95, category: "Sides", dietary: ["vegan", "gluten-free"] },
      { id: "2-4", name: "Milkshake", description: "Hand-spun milkshake in vanilla, chocolate, or strawberry", price: 6.95, category: "Drinks" },
      { id: "2-5", name: "Veggie Burger", description: "House-made black bean patty with avocado and sprouts", price: 12.95, category: "Burgers", dietary: ["vegetarian"] },
      { id: "2-6", name: "Onion Rings", description: "Beer-battered onion rings with ranch dressing", price: 6.95, category: "Sides" },
    ],
  },
  {
    id: "3",
    name: "Osteria Fasulo",
    slug: "osteria-fasulo",
    description: "Rustic Italian dining featuring house-made pasta and wood-fired pizzas. Wines sourced from California and Italian vineyards.",
    cuisine: "Italian",
    image: "/images/italian-restaurant.jpg",
    rating: 4.9,
    reviewCount: 412,
    deliveryFee: 3.99,
    deliveryTime: "30-40 min",
    address: "312 F St, Davis, CA 95616",
    phone: "(530) 555-0303",
    hours: "5:00 PM - 10:00 PM",
    featured: true,
    menu: [
      { id: "3-1", name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil, extra virgin olive oil", price: 16.95, category: "Pizza", popular: true, dietary: ["vegetarian"] },
      { id: "3-2", name: "Cacio e Pepe", description: "House-made tonnarelli with Pecorino Romano and black pepper", price: 18.95, category: "Pasta", popular: true },
      { id: "3-3", name: "Bruschetta", description: "Grilled bread topped with tomatoes, garlic, basil, and balsamic glaze", price: 9.95, category: "Appetizers", dietary: ["vegan"] },
      { id: "3-4", name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone", price: 9.95, category: "Desserts", popular: true },
      { id: "3-5", name: "Penne Arrabbiata", description: "Penne pasta in spicy tomato sauce with garlic and chili flakes", price: 15.95, category: "Pasta", dietary: ["vegan"] },
      { id: "3-6", name: "Caesar Salad", description: "Romaine hearts with house-made dressing, croutons, and Parmigiano", price: 11.95, category: "Salads" },
    ],
  },
  {
    id: "4",
    name: "Sunrise Sushi",
    slug: "sunrise-sushi",
    description: "Fresh sushi and Japanese cuisine with fish delivered daily. Omakase specials and creative rolls.",
    cuisine: "Japanese",
    image: "/images/sushi-place.jpg",
    rating: 4.7,
    reviewCount: 289,
    deliveryFee: 3.49,
    deliveryTime: "25-35 min",
    address: "505 2nd St, Davis, CA 95616",
    phone: "(530) 555-0404",
    hours: "11:30 AM - 9:00 PM",
    menu: [
      { id: "4-1", name: "Rainbow Roll", description: "California roll topped with assorted sashimi and avocado", price: 16.95, category: "Rolls", popular: true, dietary: ["gluten-free"] },
      { id: "4-2", name: "Spicy Tuna Roll", description: "Fresh tuna with spicy mayo and cucumber", price: 13.95, category: "Rolls", popular: true },
      { id: "4-3", name: "Miso Soup", description: "Traditional miso soup with tofu, wakame, and green onions", price: 4.95, category: "Soups", dietary: ["vegetarian"] },
      { id: "4-4", name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.95, category: "Appetizers", dietary: ["vegan", "gluten-free"] },
      { id: "4-5", name: "Salmon Nigiri", description: "Two pieces of fresh salmon over seasoned rice", price: 7.95, category: "Nigiri", dietary: ["gluten-free"] },
      { id: "4-6", name: "Tempura Udon", description: "Thick udon noodles in dashi broth with shrimp tempura", price: 14.95, category: "Noodles" },
    ],
  },
  {
    id: "5",
    name: "El Pueblo Taqueria",
    slug: "el-pueblo-taqueria",
    description: "Authentic Mexican street food made with family recipes. Fresh tortillas, slow-cooked meats, and vibrant salsas.",
    cuisine: "Mexican",
    image: "/images/taqueria.jpg",
    rating: 4.5,
    reviewCount: 195,
    deliveryFee: 2.49,
    deliveryTime: "20-30 min",
    address: "418 3rd St, Davis, CA 95616",
    phone: "(530) 555-0505",
    hours: "10:00 AM - 9:00 PM",
    menu: [
      { id: "5-1", name: "Street Tacos (3)", description: "Three corn tortilla tacos with your choice of carne asada, carnitas, or pollo", price: 10.95, category: "Tacos", popular: true, dietary: ["gluten-free"] },
      { id: "5-2", name: "Burrito Supreme", description: "Flour tortilla stuffed with rice, beans, cheese, sour cream, and your protein", price: 12.95, category: "Burritos", popular: true },
      { id: "5-3", name: "Chips & Guacamole", description: "Fresh-made tortilla chips with house guacamole", price: 7.95, category: "Appetizers", dietary: ["vegan", "gluten-free"] },
      { id: "5-4", name: "Horchata", description: "Traditional rice milk drink with cinnamon and vanilla", price: 3.95, category: "Drinks", dietary: ["vegan"] },
      { id: "5-5", name: "Quesadilla", description: "Grilled flour tortilla with melted cheese and your choice of filling", price: 9.95, category: "Quesadillas" },
      { id: "5-6", name: "Elote", description: "Mexican street corn with mayo, cotija cheese, and chili powder", price: 5.95, category: "Sides", dietary: ["vegetarian", "gluten-free"] },
    ],
  },
  {
    id: "6",
    name: "The Pho House",
    slug: "the-pho-house",
    description: "Vietnamese comfort food with 12-hour slow-simmered bone broth. Banh mi, pho, and fresh rice paper rolls.",
    cuisine: "Vietnamese",
    image: "/images/pho-house.jpg",
    rating: 4.7,
    reviewCount: 267,
    deliveryFee: 2.99,
    deliveryTime: "25-35 min",
    address: "601 D St, Davis, CA 95616",
    phone: "(530) 555-0606",
    hours: "10:00 AM - 9:00 PM",
    menu: [
      { id: "6-1", name: "Pho Bo", description: "Classic beef pho with rice noodles, rare steak, and brisket in bone broth", price: 14.95, category: "Pho", popular: true, dietary: ["gluten-free"] },
      { id: "6-2", name: "Banh Mi", description: "Crispy baguette with grilled pork, pickled daikon, jalapeno, and cilantro", price: 10.95, category: "Sandwiches", popular: true },
      { id: "6-3", name: "Fresh Spring Rolls", description: "Rice paper rolls with shrimp, vermicelli, and herbs with peanut sauce", price: 7.95, category: "Appetizers", dietary: ["gluten-free"] },
      { id: "6-4", name: "Vietnamese Iced Coffee", description: "Strong drip coffee with sweetened condensed milk over ice", price: 5.50, category: "Drinks" },
      { id: "6-5", name: "Bun Cha", description: "Grilled pork patties with rice vermicelli, herbs, and fish sauce", price: 13.95, category: "Rice & Noodles", dietary: ["gluten-free"] },
      { id: "6-6", name: "Tofu Pho", description: "Vegetable broth pho with tofu, mushrooms, and bok choy", price: 13.95, category: "Pho", dietary: ["vegan", "gluten-free"] },
    ],
  },
]

export function getRestaurant(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug)
}

export function getFeaturedRestaurants(): Restaurant[] {
  return restaurants.filter((r) => r.featured)
}

export function getCategories(menu: MenuItem[]): string[] {
  return Array.from(new Set(menu.map((item) => item.category)))
}
