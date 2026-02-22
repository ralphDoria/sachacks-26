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
    phone: "(530) 758-4810",
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
    name: "Burgers and Brew",
    slug: "burgers-and-brew",
    description: "½-pound Niman Ranch all-natural beef burgers with 50 craft beers on tap. A downtown Davis staple since 2007.",
    cuisine: "American",
    image: "/images/burger-joint.jpg",
    rating: 4.6,
    reviewCount: 218,
    deliveryFee: 3.49,
    deliveryTime: "20-30 min",
    address: "403 3rd St, Davis, CA 95616",
    phone: "(530) 750-3600",
    hours: "11:00 AM - 10:00 PM",
    featured: true,
    menu: [
      { id: "2-1", name: "BnB Cheeseburger", description: "½ lb. Niman Ranch beef, cheddar, mayo, lettuce, tomato, onion, and pickles on a sesame bun", price: 15.95, category: "Burgers", popular: true },
      { id: "2-2", name: "Bacon Cheeseburger", description: "½ lb. Niman Ranch beef with hickory smoked bacon and cheddar cheese", price: 17.50, category: "Burgers", popular: true },
      { id: "2-3", name: "Mushroom & Onion Cheeseburger", description: "½ lb. beef with sautéed mushrooms, sautéed red onions, and jack cheese", price: 17.50, category: "Burgers" },
      { id: "2-4", name: "Spicy Guacamole Cheeseburger", description: "½ lb. beef with homemade spicy guacamole, marinated jalapeños, jalapeño mayo, and pepper jack", price: 17.50, category: "Burgers" },
      { id: "2-5", name: "Veggie Burger", description: "Vegetarian patty with lettuce, tomato, onion, pickles, and vegan mayo on a wheat bun", price: 15.95, category: "Burgers", dietary: ["vegetarian"] },
      { id: "2-6", name: "Roasted Garlic Fries", description: "Crispy fries tossed in roasted garlic — a house favorite", price: 5.50, category: "Sides", dietary: ["vegan"] },
      { id: "2-7", name: "Beer Battered Onion Rings", description: "Classic beer-battered onion rings served golden and crispy", price: 6.95, category: "Sides" },
      { id: "2-8", name: "Root Beer Float", description: "Barq's root beer and creamy vanilla ice cream in a frosty glass", price: 6.95, category: "Drinks" },
    ],
  },
  {
    id: "3",
    name: "The Hotdogger",
    slug: "the-hotdogger",
    description: "Davis institution since 1984. Specialty sausages and loaded hot dogs on fresh Village Bakery buns, with a legendary mustard bar.",
    cuisine: "American",
    image: "/images/italian-restaurant.jpg",
    rating: 4.7,
    reviewCount: 380,
    deliveryFee: 2.49,
    deliveryTime: "15-25 min",
    address: "129 E St, Davis, CA 95616",
    phone: "(530) 753-6291",
    hours: "11:00 AM - 9:00 PM",
    featured: true,
    menu: [
      { id: "3-1", name: "Chicago Dog", description: "All-beef hot dog with mustard, relish, onion, tomato, dill pickle spear, and celery salt on a poppy seed bun", price: 9.00, category: "Hot Dogs", popular: true },
      { id: "3-2", name: "Chili Cheese Dog", description: "Hot dog smothered in house chili, cheddar cheese, diced onions, and sliced tomatoes", price: 10.90, category: "Hot Dogs", popular: true },
      { id: "3-3", name: "Ortega Dog", description: "Hot dog with mayo, mustard, Ortega chiles, and pepper jack cheese, toasted to order", price: 10.90, category: "Hot Dogs" },
      { id: "3-4", name: "Gut Bomb", description: "Louisiana hot link loaded with salsa, banana peppers, jalapeños, chili, cheddar, onion, and tomatoes", price: 12.90, category: "Hot Dogs" },
      { id: "3-5", name: "Chicken Apple Sausage", description: "Sweet and savory chicken apple sausage on a Village Bakery roll with your choice of toppings", price: 10.00, category: "Sausages" },
      { id: "3-6", name: "Louisiana Hot Link", description: "Spicy pork and beef hot link sausage with mustard bar fixings", price: 12.00, category: "Sausages" },
      { id: "3-7", name: "Wedge-Cut Fries", description: "Air-baked wedge fries — not deep fried. Crispy outside, fluffy inside", price: 5.00, category: "Sides", dietary: ["vegan"] },
      { id: "3-8", name: "Chili Cheese Fries", description: "Wedge fries topped with house chili and melted cheddar cheese", price: 7.00, category: "Sides" },
    ],
  },
  {
    id: "4",
    name: "Preethi Indian Cuisine",
    slug: "preethi-indian-cuisine",
    description: "Authentic South and North Indian cuisine in the heart of Davis. Freshly ground spices, tandoor-fired breads, and rich curries made from scratch daily.",
    cuisine: "Indian",
    image: "/images/sushi-place.jpg",
    rating: 4.7,
    reviewCount: 289,
    deliveryFee: 3.49,
    deliveryTime: "25-35 min",
    address: "715 2nd St, Davis, CA 95616",
    phone: "(530) 759-2040",
    hours: "11:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
    menu: [
      { id: "4-1", name: "Chicken Tikka Masala", description: "Tender chicken in a rich, creamy tomato-based masala sauce with aromatic spices", price: 15.95, category: "Curries", popular: true },
      { id: "4-2", name: "Saag Paneer", description: "Fresh paneer cheese simmered in a spiced spinach and cream sauce", price: 13.95, category: "Curries", popular: true, dietary: ["vegetarian"] },
      { id: "4-3", name: "Chicken Biryani", description: "Fragrant basmati rice slow-cooked with spiced chicken, saffron, and caramelized onions", price: 15.95, category: "Rice", popular: true },
      { id: "4-4", name: "Garlic Naan", description: "Freshly baked leavened bread with garlic and butter from the tandoor oven", price: 3.95, category: "Breads", dietary: ["vegetarian"] },
      { id: "4-5", name: "Vegetable Samosa (2)", description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney", price: 5.95, category: "Appetizers", dietary: ["vegan"] },
      { id: "4-6", name: "Mango Lassi", description: "Refreshing yogurt drink blended with sweet Alphonso mango", price: 4.95, category: "Drinks", dietary: ["vegetarian"] },
    ],
  },
  {
    id: "5",
    name: "Taqueria El Burrito",
    slug: "taqueria-el-burrito",
    description: "Davis favorite for authentic Mexican street food. Fresh tortillas made daily, slow-cooked meats, and house salsas.",
    cuisine: "Mexican",
    image: "/images/taqueria.jpg",
    rating: 4.5,
    reviewCount: 195,
    deliveryFee: 2.49,
    deliveryTime: "20-30 min",
    address: "223 F St, Davis, CA 95616",
    phone: "(530) 756-1606",
    hours: "10:00 AM - 10:00 PM",
    menu: [
      { id: "5-1", name: "Street Tacos (3)", description: "Three corn tortillas with carne asada, al pastor, or carnitas topped with onion and cilantro", price: 9.99, category: "Tacos", popular: true, dietary: ["gluten-free"] },
      { id: "5-2", name: "Super Burrito", description: "Large flour tortilla with rice, beans, cheese, sour cream, guacamole, and your choice of meat", price: 12.99, category: "Burritos", popular: true },
      { id: "5-3", name: "Quesadilla", description: "Grilled flour tortilla with melted cheese and your choice of filling", price: 9.99, category: "Quesadillas" },
      { id: "5-4", name: "Chips & Salsa", description: "Fresh tortilla chips with house-made salsa roja", price: 3.99, category: "Appetizers", dietary: ["vegan", "gluten-free"] },
      { id: "5-5", name: "Horchata", description: "House-made rice drink with cinnamon and vanilla", price: 3.50, category: "Drinks", dietary: ["vegan"] },
      { id: "5-6", name: "Torta", description: "Mexican sandwich on a bolillo roll with your choice of meat, avocado, beans, and jalapeños", price: 10.99, category: "Sandwiches" },
    ],
  },
  {
    id: "6",
    name: "Pho Tasty",
    slug: "pho-tasty",
    description: "Vietnamese comfort food at its finest. Rich bone broth pho, crispy banh mi, and fresh spring rolls made with care every day.",
    cuisine: "Vietnamese",
    image: "/images/pho-house.jpg",
    rating: 4.7,
    reviewCount: 267,
    deliveryFee: 2.99,
    deliveryTime: "25-35 min",
    address: "301 G St, Davis, CA 95616",
    phone: "(530) 564-6868",
    hours: "11:00 AM - 9:30 PM",
    menu: [
      { id: "6-1", name: "Pho Bo", description: "Classic beef pho with rice noodles, rare steak, and brisket in slow-simmered bone broth", price: 14.95, category: "Pho", popular: true, dietary: ["gluten-free"] },
      { id: "6-2", name: "Pho Ga", description: "Delicate chicken pho with rice noodles in a clear ginger-scented broth", price: 13.95, category: "Pho", dietary: ["gluten-free"] },
      { id: "6-3", name: "Banh Mi", description: "Crispy baguette with grilled pork, pickled daikon, jalapeño, and cilantro", price: 9.95, category: "Sandwiches", popular: true },
      { id: "6-4", name: "Fresh Spring Rolls", description: "Rice paper rolls with shrimp, vermicelli, and fresh herbs served with peanut dipping sauce", price: 7.95, category: "Appetizers", dietary: ["gluten-free"] },
      { id: "6-5", name: "Vietnamese Iced Coffee", description: "Strong drip coffee with sweetened condensed milk over ice", price: 5.50, category: "Drinks" },
      { id: "6-6", name: "Tofu Pho", description: "Vegetable broth pho with crispy tofu, mushrooms, and bok choy", price: 13.95, category: "Pho", dietary: ["vegan", "gluten-free"] },
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
