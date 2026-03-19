export interface MenuItem {
  id: string;
  restaurant: string;
  category: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface Restaurant {
  id: string;
  name: string;
  emoji: string;
  color: string;
  categories: string[];
}

export const restaurants: Restaurant[] = [
  { id: "chipotle", name: "Chipotle", emoji: "\ud83c\udf2f", color: "#A81612", categories: ["Bowls", "Burritos", "Salads", "Tacos"] },
  { id: "mcdonalds", name: "McDonald's", emoji: "\ud83c\udf54", color: "#FFC72C", categories: ["Burgers", "Chicken", "Breakfast", "Sides"] },
  { id: "chickfila", name: "Chick-fil-A", emoji: "\ud83d\udc14", color: "#E51636", categories: ["Sandwiches", "Nuggets", "Salads", "Breakfast"] },
  { id: "subway", name: "Subway", emoji: "\ud83e\udd6a", color: "#008C15", categories: ["6-inch Subs", "Footlong Subs", "Salads", "Wraps"] },
  { id: "sweetgreen", name: "Sweetgreen", emoji: "\ud83e\udd57", color: "#2D6A4F", categories: ["Bowls", "Salads", "Sides"] },
  { id: "wendys", name: "Wendy's", emoji: "\ud83c\udf5f", color: "#E2203A", categories: ["Burgers", "Chicken", "Salads", "Sides"] },
  { id: "tacobell", name: "Taco Bell", emoji: "\ud83c\udf2e", color: "#702082", categories: ["Tacos", "Burritos", "Bowls", "Sides"] },
  { id: "pandaexpress", name: "Panda Express", emoji: "\ud83e\udd62", color: "#D12028", categories: ["Entrees", "Sides", "Appetizers"] },
  { id: "fiveguys", name: "Five Guys", emoji: "\ud83c\udf54", color: "#EF1A2D", categories: ["Burgers", "Dogs", "Fries"] },
  { id: "panera", name: "Panera Bread", emoji: "\ud83c\udf5e", color: "#4A7C59", categories: ["Sandwiches", "Soups", "Salads", "Bowls"] },
  { id: "popeyes", name: "Popeyes", emoji: "\ud83c\udf57", color: "#F15A22", categories: ["Chicken", "Sandwiches", "Sides"] },
  { id: "innout", name: "In-N-Out", emoji: "\ud83c\udf54", color: "#ED1C24", categories: ["Burgers", "Fries", "Drinks"] },
  { id: "shakeshack", name: "Shake Shack", emoji: "\ud83c\udf54", color: "#1F1F1F", categories: ["Burgers", "Chicken", "Fries"] },
  { id: "chipotle-mexican", name: "Qdoba", emoji: "\ud83c\udf2f", color: "#E35205", categories: ["Bowls", "Burritos", "Tacos", "Salads"] },
  { id: "wingstop", name: "Wingstop", emoji: "\ud83c\udf57", color: "#00573F", categories: ["Wings", "Tenders", "Sides"] },
  { id: "jersey-mikes", name: "Jersey Mike's", emoji: "\ud83e\udd6a", color: "#003DA5", categories: ["Subs", "Wraps"] },
  { id: "cava", name: "CAVA", emoji: "\ud83e\udd57", color: "#1B4332", categories: ["Bowls", "Pitas", "Salads"] },
  { id: "raising-canes", name: "Raising Cane's", emoji: "\ud83c\udf57", color: "#CE1126", categories: ["Chicken", "Combos", "Sides"] },
];

export const menuItems: MenuItem[] = [
  // Chipotle
  { id: "chipotle-chicken-bowl", restaurant: "Chipotle", category: "Bowls", name: "Chicken Bowl (rice, beans, salsa)", calories: 665, protein: 42, carbs: 72, fat: 20, fiber: 11, sodium: 1290 },
  { id: "chipotle-steak-bowl", restaurant: "Chipotle", category: "Bowls", name: "Steak Bowl (rice, beans, salsa)", calories: 700, protein: 40, carbs: 72, fat: 23, fiber: 11, sodium: 1210 },
  { id: "chipotle-chicken-burrito", restaurant: "Chipotle", category: "Burritos", name: "Chicken Burrito", calories: 955, protein: 50, carbs: 105, fat: 33, fiber: 13, sodium: 1880 },
  { id: "chipotle-sofritas-bowl", restaurant: "Chipotle", category: "Bowls", name: "Sofritas Bowl (rice, beans, salsa)", calories: 630, protein: 22, carbs: 78, fat: 22, fiber: 13, sodium: 1350 },
  { id: "chipotle-chicken-salad", restaurant: "Chipotle", category: "Salads", name: "Chicken Salad (no dressing)", calories: 410, protein: 42, carbs: 18, fat: 18, fiber: 7, sodium: 980 },
  { id: "chipotle-carnitas-bowl", restaurant: "Chipotle", category: "Bowls", name: "Carnitas Bowl (rice, beans, salsa)", calories: 735, protein: 36, carbs: 72, fat: 30, fiber: 11, sodium: 1340 },
  { id: "chipotle-veggie-bowl", restaurant: "Chipotle", category: "Bowls", name: "Veggie Bowl (guac, rice, beans)", calories: 650, protein: 16, carbs: 77, fat: 30, fiber: 15, sodium: 1110 },
  { id: "chipotle-barbacoa-tacos", restaurant: "Chipotle", category: "Tacos", name: "Barbacoa Tacos (3, soft shell)", calories: 510, protein: 33, carbs: 39, fat: 22, fiber: 4, sodium: 1020 },
  { id: "chipotle-chicken-quesadilla", restaurant: "Chipotle", category: "Burritos", name: "Chicken Quesadilla", calories: 1040, protein: 55, carbs: 79, fat: 52, fiber: 5, sodium: 1950 },
  { id: "chipotle-guac-chips", restaurant: "Chipotle", category: "Sides", name: "Chips & Guacamole", calories: 770, protein: 9, carbs: 68, fat: 49, fiber: 10, sodium: 600 },

  // McDonald's
  { id: "mcdonalds-big-mac", restaurant: "McDonald's", category: "Burgers", name: "Big Mac", calories: 550, protein: 25, carbs: 45, fat: 30, fiber: 3, sodium: 1010 },
  { id: "mcdonalds-quarter-pounder", restaurant: "McDonald's", category: "Burgers", name: "Quarter Pounder with Cheese", calories: 520, protein: 30, carbs: 42, fat: 26, fiber: 2, sodium: 1120 },
  { id: "mcdonalds-mcchicken", restaurant: "McDonald's", category: "Chicken", name: "McChicken", calories: 400, protein: 14, carbs: 39, fat: 21, fiber: 1, sodium: 780 },
  { id: "mcdonalds-10pc-nuggets", restaurant: "McDonald's", category: "Chicken", name: "10pc Chicken McNuggets", calories: 410, protein: 23, carbs: 26, fat: 24, fiber: 1, sodium: 900 },
  { id: "mcdonalds-egg-mcmuffin", restaurant: "McDonald's", category: "Breakfast", name: "Egg McMuffin", calories: 300, protein: 17, carbs: 30, fat: 12, fiber: 2, sodium: 770 },
  { id: "mcdonalds-filet-o-fish", restaurant: "McDonald's", category: "Burgers", name: "Filet-O-Fish", calories: 390, protein: 16, carbs: 39, fat: 19, fiber: 1, sodium: 580 },
  { id: "mcdonalds-mcdouble", restaurant: "McDonald's", category: "Burgers", name: "McDouble", calories: 400, protein: 22, carbs: 33, fat: 20, fiber: 2, sodium: 920 },
  { id: "mcdonalds-grilled-chicken", restaurant: "McDonald's", category: "Chicken", name: "Grilled Chicken Sandwich", calories: 420, protein: 32, carbs: 44, fat: 12, fiber: 3, sodium: 1110 },
  { id: "mcdonalds-bacon-qp", restaurant: "McDonald's", category: "Burgers", name: "Bacon Quarter Pounder", calories: 620, protein: 38, carbs: 42, fat: 32, fiber: 2, sodium: 1370 },
  { id: "mcdonalds-southwest-salad", restaurant: "McDonald's", category: "Salads", name: "Southwest Grilled Chicken Salad", calories: 350, protein: 37, carbs: 27, fat: 11, fiber: 6, sodium: 1070 },

  // Chick-fil-A
  { id: "chickfila-original", restaurant: "Chick-fil-A", category: "Sandwiches", name: "Original Chicken Sandwich", calories: 440, protein: 28, carbs: 40, fat: 19, fiber: 1, sodium: 1350 },
  { id: "chickfila-spicy", restaurant: "Chick-fil-A", category: "Sandwiches", name: "Spicy Chicken Sandwich", calories: 450, protein: 28, carbs: 42, fat: 19, fiber: 2, sodium: 1620 },
  { id: "chickfila-grilled", restaurant: "Chick-fil-A", category: "Sandwiches", name: "Grilled Chicken Sandwich", calories: 320, protein: 28, carbs: 33, fat: 7, fiber: 3, sodium: 800 },
  { id: "chickfila-nuggets-12", restaurant: "Chick-fil-A", category: "Nuggets", name: "12ct Grilled Nuggets", calories: 200, protein: 38, carbs: 2, fat: 4, fiber: 0, sodium: 720 },
  { id: "chickfila-nuggets-fried-12", restaurant: "Chick-fil-A", category: "Nuggets", name: "12ct Nuggets", calories: 380, protein: 28, carbs: 16, fat: 18, fiber: 0, sodium: 1200 },
  { id: "chickfila-cobb-salad", restaurant: "Chick-fil-A", category: "Salads", name: "Cobb Salad (grilled, no dressing)", calories: 390, protein: 42, carbs: 18, fat: 17, fiber: 5, sodium: 1050 },
  { id: "chickfila-market-salad", restaurant: "Chick-fil-A", category: "Salads", name: "Market Salad (grilled)", calories: 340, protein: 28, carbs: 27, fat: 14, fiber: 4, sodium: 730 },
  { id: "chickfila-cool-wrap", restaurant: "Chick-fil-A", category: "Sandwiches", name: "Grilled Cool Wrap", calories: 350, protein: 37, carbs: 29, fat: 13, fiber: 15, sodium: 1020 },
  { id: "chickfila-egg-white-grill", restaurant: "Chick-fil-A", category: "Breakfast", name: "Egg White Grill", calories: 300, protein: 25, carbs: 31, fat: 7, fiber: 1, sodium: 970 },
  { id: "chickfila-spicy-deluxe", restaurant: "Chick-fil-A", category: "Sandwiches", name: "Spicy Deluxe Sandwich", calories: 550, protein: 32, carbs: 48, fat: 25, fiber: 3, sodium: 1750 },

  // Subway
  { id: "subway-turkey-breast", restaurant: "Subway", category: "6-inch Subs", name: "6\" Turkey Breast", calories: 270, protein: 18, carbs: 41, fat: 3, fiber: 4, sodium: 820 },
  { id: "subway-chicken-teriyaki", restaurant: "Subway", category: "6-inch Subs", name: "6\" Sweet Onion Chicken Teriyaki", calories: 330, protein: 24, carbs: 50, fat: 5, fiber: 4, sodium: 900 },
  { id: "subway-veggie-delite", restaurant: "Subway", category: "6-inch Subs", name: "6\" Veggie Delite", calories: 210, protein: 8, carbs: 38, fat: 2, fiber: 4, sodium: 280 },
  { id: "subway-italian-bmt", restaurant: "Subway", category: "6-inch Subs", name: "6\" Italian B.M.T.", calories: 370, protein: 17, carbs: 42, fat: 15, fiber: 4, sodium: 1200 },
  { id: "subway-steak-cheese", restaurant: "Subway", category: "6-inch Subs", name: "6\" Steak & Cheese", calories: 340, protein: 24, carbs: 41, fat: 10, fiber: 4, sodium: 880 },
  { id: "subway-rotisserie-chicken", restaurant: "Subway", category: "6-inch Subs", name: "6\" Rotisserie Chicken", calories: 290, protein: 23, carbs: 38, fat: 5, fiber: 4, sodium: 760 },
  { id: "subway-tuna", restaurant: "Subway", category: "6-inch Subs", name: "6\" Tuna", calories: 440, protein: 17, carbs: 41, fat: 23, fiber: 4, sodium: 550 },
  { id: "subway-chicken-bacon", restaurant: "Subway", category: "Footlong Subs", name: "Footlong Chicken & Bacon Ranch", calories: 880, protein: 52, carbs: 86, fat: 36, fiber: 8, sodium: 1940 },
  { id: "subway-chopped-salad", restaurant: "Subway", category: "Salads", name: "Turkey Breast Chopped Salad", calories: 130, protein: 14, carbs: 10, fat: 3, fiber: 3, sodium: 600 },
  { id: "subway-protein-bowl", restaurant: "Subway", category: "Bowls", name: "Chicken Protein Bowl", calories: 220, protein: 26, carbs: 10, fat: 8, fiber: 3, sodium: 650 },

  // Sweetgreen
  { id: "sweetgreen-harvest-bowl", restaurant: "Sweetgreen", category: "Bowls", name: "Harvest Bowl", calories: 595, protein: 22, carbs: 50, fat: 37, fiber: 8, sodium: 560 },
  { id: "sweetgreen-kale-caesar", restaurant: "Sweetgreen", category: "Salads", name: "Kale Caesar", calories: 470, protein: 16, carbs: 32, fat: 33, fiber: 5, sodium: 680 },
  { id: "sweetgreen-chicken-pesto", restaurant: "Sweetgreen", category: "Bowls", name: "Chicken Pesto Parm", calories: 620, protein: 40, carbs: 50, fat: 28, fiber: 6, sodium: 810 },
  { id: "sweetgreen-buffalo-bowl", restaurant: "Sweetgreen", category: "Bowls", name: "Buffalo Chicken Bowl", calories: 545, protein: 35, carbs: 48, fat: 22, fiber: 7, sodium: 920 },
  { id: "sweetgreen-garden-cobb", restaurant: "Sweetgreen", category: "Salads", name: "Garden Cobb", calories: 520, protein: 32, carbs: 18, fat: 36, fiber: 5, sodium: 720 },
  { id: "sweetgreen-super-green", restaurant: "Sweetgreen", category: "Salads", name: "Super Green Goddess", calories: 380, protein: 24, carbs: 28, fat: 20, fiber: 6, sodium: 510 },
  { id: "sweetgreen-guacamole-greens", restaurant: "Sweetgreen", category: "Bowls", name: "Guacamole Greens", calories: 480, protein: 14, carbs: 35, fat: 34, fiber: 10, sodium: 440 },
  { id: "sweetgreen-shroomami", restaurant: "Sweetgreen", category: "Bowls", name: "Shroomami", calories: 410, protein: 12, carbs: 52, fat: 18, fiber: 7, sodium: 590 },

  // Wendy's
  { id: "wendys-daves-single", restaurant: "Wendy's", category: "Burgers", name: "Dave's Single", calories: 570, protein: 30, carbs: 39, fat: 33, fiber: 2, sodium: 1080 },
  { id: "wendys-baconator", restaurant: "Wendy's", category: "Burgers", name: "Baconator", calories: 940, protein: 57, carbs: 38, fat: 62, fiber: 1, sodium: 1730 },
  { id: "wendys-grilled-chicken", restaurant: "Wendy's", category: "Chicken", name: "Grilled Chicken Sandwich", calories: 370, protein: 35, carbs: 36, fat: 10, fiber: 2, sodium: 880 },
  { id: "wendys-spicy-nuggets-10", restaurant: "Wendy's", category: "Chicken", name: "10pc Spicy Nuggets", calories: 460, protein: 22, carbs: 31, fat: 28, fiber: 2, sodium: 1140 },
  { id: "wendys-apple-pecan-salad", restaurant: "Wendy's", category: "Salads", name: "Apple Pecan Chicken Salad (full)", calories: 560, protein: 34, carbs: 40, fat: 27, fiber: 5, sodium: 1070 },
  { id: "wendys-jr-cheeseburger", restaurant: "Wendy's", category: "Burgers", name: "Jr. Cheeseburger", calories: 290, protein: 15, carbs: 26, fat: 14, fiber: 1, sodium: 640 },
  { id: "wendys-parmesan-caesar", restaurant: "Wendy's", category: "Salads", name: "Parmesan Caesar Chicken Salad", calories: 470, protein: 38, carbs: 16, fat: 28, fiber: 3, sodium: 1150 },
  { id: "wendys-chili-large", restaurant: "Wendy's", category: "Sides", name: "Large Chili", calories: 330, protein: 23, carbs: 32, fat: 12, fiber: 8, sodium: 1170 },

  // Taco Bell
  { id: "tacobell-crunchy-taco", restaurant: "Taco Bell", category: "Tacos", name: "Crunchy Taco", calories: 170, protein: 8, carbs: 13, fat: 10, fiber: 3, sodium: 310 },
  { id: "tacobell-burrito-supreme", restaurant: "Taco Bell", category: "Burritos", name: "Burrito Supreme (Beef)", calories: 400, protein: 16, carbs: 51, fat: 14, fiber: 7, sodium: 1060 },
  { id: "tacobell-chicken-power-bowl", restaurant: "Taco Bell", category: "Bowls", name: "Chicken Power Bowl", calories: 460, protein: 26, carbs: 50, fat: 18, fiber: 7, sodium: 1220 },
  { id: "tacobell-crunchwrap", restaurant: "Taco Bell", category: "Burritos", name: "Crunchwrap Supreme", calories: 530, protein: 16, carbs: 71, fat: 21, fiber: 4, sodium: 1100 },
  { id: "tacobell-gordita-crunch", restaurant: "Taco Bell", category: "Tacos", name: "Cheesy Gordita Crunch", calories: 500, protein: 20, carbs: 41, fat: 28, fiber: 3, sodium: 810 },
  { id: "tacobell-bean-burrito", restaurant: "Taco Bell", category: "Burritos", name: "Bean Burrito", calories: 350, protein: 13, carbs: 54, fat: 9, fiber: 9, sodium: 980 },
  { id: "tacobell-chicken-quesadilla", restaurant: "Taco Bell", category: "Burritos", name: "Chicken Quesadilla", calories: 500, protein: 26, carbs: 37, fat: 27, fiber: 2, sodium: 1170 },
  { id: "tacobell-fiesta-veggie", restaurant: "Taco Bell", category: "Burritos", name: "Fiesta Veggie Burrito", calories: 430, protein: 12, carbs: 62, fat: 15, fiber: 8, sodium: 920 },

  // Panda Express
  { id: "pandaexpress-orange-chicken", restaurant: "Panda Express", category: "Entrees", name: "Orange Chicken", calories: 490, protein: 25, carbs: 51, fat: 23, fiber: 0, sodium: 820 },
  { id: "pandaexpress-broccoli-beef", restaurant: "Panda Express", category: "Entrees", name: "Broccoli Beef", calories: 150, protein: 9, carbs: 13, fat: 7, fiber: 2, sodium: 520 },
  { id: "pandaexpress-grilled-teriyaki", restaurant: "Panda Express", category: "Entrees", name: "Grilled Teriyaki Chicken", calories: 300, protein: 36, carbs: 8, fat: 13, fiber: 0, sodium: 530 },
  { id: "pandaexpress-kung-pao", restaurant: "Panda Express", category: "Entrees", name: "Kung Pao Chicken", calories: 290, protein: 16, carbs: 14, fat: 19, fiber: 2, sodium: 900 },
  { id: "pandaexpress-beijing-beef", restaurant: "Panda Express", category: "Entrees", name: "Beijing Beef", calories: 470, protein: 14, carbs: 56, fat: 22, fiber: 1, sodium: 660 },
  { id: "pandaexpress-fried-rice", restaurant: "Panda Express", category: "Sides", name: "Fried Rice", calories: 520, protein: 12, carbs: 85, fat: 16, fiber: 1, sodium: 850 },
  { id: "pandaexpress-chow-mein", restaurant: "Panda Express", category: "Sides", name: "Chow Mein", calories: 500, protein: 13, carbs: 80, fat: 22, fiber: 5, sodium: 860 },
  { id: "pandaexpress-super-greens", restaurant: "Panda Express", category: "Sides", name: "Super Greens", calories: 90, protein: 6, carbs: 10, fat: 3, fiber: 5, sodium: 340 },
  { id: "pandaexpress-string-bean-chicken", restaurant: "Panda Express", category: "Entrees", name: "String Bean Chicken Breast", calories: 190, protein: 14, carbs: 13, fat: 9, fiber: 2, sodium: 570 },
  { id: "pandaexpress-mushroom-chicken", restaurant: "Panda Express", category: "Entrees", name: "Mushroom Chicken", calories: 170, protein: 12, carbs: 10, fat: 9, fiber: 1, sodium: 720 },

  // Five Guys
  { id: "fiveguys-little-hamburger", restaurant: "Five Guys", category: "Burgers", name: "Little Hamburger", calories: 480, protein: 23, carbs: 39, fat: 26, fiber: 2, sodium: 380 },
  { id: "fiveguys-cheeseburger", restaurant: "Five Guys", category: "Burgers", name: "Cheeseburger (2 patties)", calories: 840, protein: 47, carbs: 39, fat: 55, fiber: 2, sodium: 1050 },
  { id: "fiveguys-bacon-burger", restaurant: "Five Guys", category: "Burgers", name: "Bacon Cheeseburger", calories: 920, protein: 51, carbs: 39, fat: 62, fiber: 2, sodium: 1310 },
  { id: "fiveguys-little-bacon", restaurant: "Five Guys", category: "Burgers", name: "Little Bacon Burger", calories: 560, protein: 27, carbs: 39, fat: 33, fiber: 2, sodium: 640 },
  { id: "fiveguys-hot-dog", restaurant: "Five Guys", category: "Dogs", name: "Hot Dog", calories: 520, protein: 18, carbs: 40, fat: 30, fiber: 2, sodium: 1130 },
  { id: "fiveguys-veggie-sandwich", restaurant: "Five Guys", category: "Burgers", name: "Veggie Sandwich", calories: 440, protein: 16, carbs: 60, fat: 15, fiber: 5, sodium: 1040 },
  { id: "fiveguys-regular-fries", restaurant: "Five Guys", category: "Fries", name: "Regular Fries", calories: 530, protein: 6, carbs: 63, fat: 24, fiber: 5, sodium: 530 },
  { id: "fiveguys-cajun-fries", restaurant: "Five Guys", category: "Fries", name: "Cajun Fries", calories: 530, protein: 6, carbs: 63, fat: 24, fiber: 5, sodium: 750 },

  // Panera Bread
  { id: "panera-fuji-apple-salad", restaurant: "Panera Bread", category: "Salads", name: "Fuji Apple Chicken Salad (full)", calories: 550, protein: 30, carbs: 46, fat: 27, fiber: 5, sodium: 880 },
  { id: "panera-greek-salad", restaurant: "Panera Bread", category: "Salads", name: "Greek Salad (full)", calories: 400, protein: 10, carbs: 20, fat: 32, fiber: 4, sodium: 1110 },
  { id: "panera-turkey-avocado", restaurant: "Panera Bread", category: "Sandwiches", name: "Turkey & Avocado BLT", calories: 620, protein: 32, carbs: 54, fat: 30, fiber: 5, sodium: 1340 },
  { id: "panera-chicken-caesar", restaurant: "Panera Bread", category: "Sandwiches", name: "Chicken Caesar Sandwich", calories: 660, protein: 36, carbs: 56, fat: 32, fiber: 3, sodium: 1500 },
  { id: "panera-broccoli-cheddar", restaurant: "Panera Bread", category: "Soups", name: "Broccoli Cheddar Soup (bowl)", calories: 360, protein: 16, carbs: 30, fat: 21, fiber: 6, sodium: 1290 },
  { id: "panera-ten-veg-soup", restaurant: "Panera Bread", category: "Soups", name: "Ten Vegetable Soup (bowl)", calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 5, sodium: 960 },
  { id: "panera-med-bowl", restaurant: "Panera Bread", category: "Bowls", name: "Mediterranean Grain Bowl", calories: 550, protein: 22, carbs: 62, fat: 22, fiber: 8, sodium: 780 },
  { id: "panera-teriyaki-bowl", restaurant: "Panera Bread", category: "Bowls", name: "Teriyaki Chicken & Broccoli Bowl", calories: 470, protein: 33, carbs: 55, fat: 12, fiber: 5, sodium: 1350 },
  { id: "panera-steak-white-cheddar", restaurant: "Panera Bread", category: "Sandwiches", name: "Steak & White Cheddar Panini", calories: 680, protein: 38, carbs: 52, fat: 34, fiber: 3, sodium: 1520 },
  { id: "panera-chipotle-chicken-avo", restaurant: "Panera Bread", category: "Sandwiches", name: "Chipotle Chicken Avocado Melt", calories: 720, protein: 44, carbs: 55, fat: 34, fiber: 6, sodium: 1610 },
  // Popeyes
  { id: "popeyes-chicken-sandwich", restaurant: "Popeyes", category: "Sandwiches", name: "Classic Chicken Sandwich", calories: 700, protein: 28, carbs: 50, fat: 42, fiber: 2, sodium: 1440 },
  { id: "popeyes-spicy-sandwich", restaurant: "Popeyes", category: "Sandwiches", name: "Spicy Chicken Sandwich", calories: 700, protein: 28, carbs: 50, fat: 42, fiber: 2, sodium: 1700 },
  { id: "popeyes-3pc-tenders", restaurant: "Popeyes", category: "Chicken", name: "3pc Chicken Tenders", calories: 410, protein: 26, carbs: 24, fat: 23, fiber: 1, sodium: 1240 },
  { id: "popeyes-2pc-breast-thigh", restaurant: "Popeyes", category: "Chicken", name: "2pc Mixed (Breast & Thigh)", calories: 610, protein: 46, carbs: 18, fat: 40, fiber: 0, sodium: 1430 },
  { id: "popeyes-nuggets-12", restaurant: "Popeyes", category: "Chicken", name: "12pc Nuggets", calories: 540, protein: 24, carbs: 36, fat: 34, fiber: 2, sodium: 1280 },
  { id: "popeyes-blackened-tenders", restaurant: "Popeyes", category: "Chicken", name: "3pc Blackened Tenders", calories: 170, protein: 26, carbs: 2, fat: 5, fiber: 0, sodium: 760 },
  { id: "popeyes-red-beans-rice", restaurant: "Popeyes", category: "Sides", name: "Red Beans & Rice (regular)", calories: 230, protein: 9, carbs: 30, fat: 7, fiber: 5, sodium: 680 },
  { id: "popeyes-mashed-potatoes", restaurant: "Popeyes", category: "Sides", name: "Mashed Potatoes & Gravy", calories: 110, protein: 2, carbs: 15, fat: 5, fiber: 1, sodium: 580 },

  // In-N-Out
  { id: "innout-double-double", restaurant: "In-N-Out", category: "Burgers", name: "Double-Double", calories: 670, protein: 37, carbs: 39, fat: 41, fiber: 3, sodium: 1440 },
  { id: "innout-cheeseburger", restaurant: "In-N-Out", category: "Burgers", name: "Cheeseburger", calories: 480, protein: 22, carbs: 39, fat: 27, fiber: 3, sodium: 1000 },
  { id: "innout-hamburger", restaurant: "In-N-Out", category: "Burgers", name: "Hamburger", calories: 390, protein: 16, carbs: 39, fat: 19, fiber: 3, sodium: 650 },
  { id: "innout-protein-style", restaurant: "In-N-Out", category: "Burgers", name: "Double-Double Protein Style", calories: 520, protein: 33, carbs: 11, fat: 39, fiber: 3, sodium: 1160 },
  { id: "innout-fries", restaurant: "In-N-Out", category: "Fries", name: "French Fries", calories: 395, protein: 7, carbs: 54, fat: 18, fiber: 2, sodium: 245 },
  { id: "innout-grilled-cheese", restaurant: "In-N-Out", category: "Burgers", name: "Grilled Cheese", calories: 380, protein: 16, carbs: 39, fat: 18, fiber: 3, sodium: 720 },

  // Shake Shack
  { id: "shakeshack-shackburger", restaurant: "Shake Shack", category: "Burgers", name: "ShackBurger", calories: 530, protein: 28, carbs: 27, fat: 34, fiber: 0, sodium: 1250 },
  { id: "shakeshack-smokeshack", restaurant: "Shake Shack", category: "Burgers", name: "SmokeShack", calories: 610, protein: 31, carbs: 27, fat: 40, fiber: 0, sodium: 1530 },
  { id: "shakeshack-chicken-shack", restaurant: "Shake Shack", category: "Chicken", name: "Chick'n Shack", calories: 580, protein: 26, carbs: 55, fat: 28, fiber: 2, sodium: 1470 },
  { id: "shakeshack-shroom-burger", restaurant: "Shake Shack", category: "Burgers", name: "Shroom Burger", calories: 570, protein: 18, carbs: 43, fat: 36, fiber: 2, sodium: 920 },
  { id: "shakeshack-chicken-bites", restaurant: "Shake Shack", category: "Chicken", name: "Chicken Bites (6pc)", calories: 300, protein: 22, carbs: 14, fat: 17, fiber: 0, sodium: 780 },
  { id: "shakeshack-fries", restaurant: "Shake Shack", category: "Fries", name: "Fries", calories: 470, protein: 5, carbs: 56, fat: 24, fiber: 3, sodium: 640 },

  // Qdoba
  { id: "qdoba-chicken-bowl", restaurant: "Qdoba", category: "Bowls", name: "Grilled Chicken Bowl", calories: 640, protein: 44, carbs: 68, fat: 18, fiber: 10, sodium: 1280 },
  { id: "qdoba-steak-burrito", restaurant: "Qdoba", category: "Burritos", name: "Steak Burrito", calories: 920, protein: 48, carbs: 98, fat: 34, fiber: 12, sodium: 1810 },
  { id: "qdoba-chicken-quesadilla", restaurant: "Qdoba", category: "Burritos", name: "Chicken Quesadilla", calories: 780, protein: 42, carbs: 50, fat: 42, fiber: 3, sodium: 1650 },
  { id: "qdoba-veggie-bowl", restaurant: "Qdoba", category: "Bowls", name: "Impossible Bowl", calories: 610, protein: 24, carbs: 72, fat: 22, fiber: 13, sodium: 1190 },
  { id: "qdoba-chicken-salad", restaurant: "Qdoba", category: "Salads", name: "Grilled Chicken Salad", calories: 420, protein: 40, carbs: 20, fat: 20, fiber: 7, sodium: 980 },
  { id: "qdoba-chicken-tacos", restaurant: "Qdoba", category: "Tacos", name: "Grilled Chicken Tacos (3)", calories: 510, protein: 36, carbs: 42, fat: 18, fiber: 5, sodium: 1050 },

  // Wingstop
  { id: "wingstop-classic-bone-in", restaurant: "Wingstop", category: "Wings", name: "Classic Wings (8pc, plain)", calories: 640, protein: 56, carbs: 0, fat: 44, fiber: 0, sodium: 1200 },
  { id: "wingstop-boneless", restaurant: "Wingstop", category: "Wings", name: "Boneless Wings (8pc, plain)", calories: 720, protein: 40, carbs: 52, fat: 36, fiber: 2, sodium: 2160 },
  { id: "wingstop-tenders", restaurant: "Wingstop", category: "Tenders", name: "Crispy Tenders (4pc)", calories: 480, protein: 32, carbs: 28, fat: 24, fiber: 1, sodium: 1520 },
  { id: "wingstop-thigh-bites", restaurant: "Wingstop", category: "Wings", name: "Thigh Bites (regular)", calories: 540, protein: 28, carbs: 36, fat: 30, fiber: 1, sodium: 1340 },
  { id: "wingstop-cajun-fries", restaurant: "Wingstop", category: "Sides", name: "Cajun Fried Corn", calories: 280, protein: 5, carbs: 30, fat: 16, fiber: 3, sodium: 610 },
  { id: "wingstop-veggie-sticks", restaurant: "Wingstop", category: "Sides", name: "Veggie Sticks", calories: 25, protein: 1, carbs: 5, fat: 0, fiber: 2, sodium: 40 },

  // Jersey Mike's
  { id: "jerseymikes-turkey-provolone", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #7 Turkey & Provolone", calories: 380, protein: 24, carbs: 40, fat: 14, fiber: 2, sodium: 1080 },
  { id: "jerseymikes-club-supreme", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #8 Club Supreme", calories: 450, protein: 28, carbs: 40, fat: 18, fiber: 2, sodium: 1320 },
  { id: "jerseymikes-italian", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #13 Italian", calories: 540, protein: 22, carbs: 42, fat: 30, fiber: 2, sodium: 1580 },
  { id: "jerseymikes-chicken-cheese", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #43 Chicken & Cheese", calories: 420, protein: 30, carbs: 38, fat: 16, fiber: 2, sodium: 1100 },
  { id: "jerseymikes-steak-cheese", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #17 Steak & Cheese", calories: 460, protein: 30, carbs: 40, fat: 20, fiber: 2, sodium: 1240 },
  { id: "jerseymikes-veggie", restaurant: "Jersey Mike's", category: "Subs", name: "Mini #14 Veggie", calories: 350, protein: 14, carbs: 42, fat: 14, fiber: 3, sodium: 820 },
  { id: "jerseymikes-chicken-wrap", restaurant: "Jersey Mike's", category: "Wraps", name: "Grilled Chicken Wrap", calories: 510, protein: 34, carbs: 48, fat: 18, fiber: 4, sodium: 1280 },

  // CAVA
  { id: "cava-greens-grains-chicken", restaurant: "CAVA", category: "Bowls", name: "Greens & Grains + Grilled Chicken", calories: 580, protein: 38, carbs: 52, fat: 22, fiber: 8, sodium: 820 },
  { id: "cava-pita-chicken", restaurant: "CAVA", category: "Pitas", name: "Grilled Chicken Pita", calories: 540, protein: 34, carbs: 50, fat: 20, fiber: 4, sodium: 940 },
  { id: "cava-harvest-bowl", restaurant: "CAVA", category: "Bowls", name: "Harvest Bowl + Steak", calories: 650, protein: 36, carbs: 58, fat: 28, fiber: 7, sodium: 910 },
  { id: "cava-supergreens-falafel", restaurant: "CAVA", category: "Salads", name: "SuperGreens + Falafel", calories: 420, protein: 14, carbs: 42, fat: 22, fiber: 9, sodium: 680 },
  { id: "cava-grain-bowl-lamb", restaurant: "CAVA", category: "Bowls", name: "Grain Bowl + Braised Lamb", calories: 690, protein: 32, carbs: 62, fat: 32, fiber: 7, sodium: 980 },
  { id: "cava-greens-harissa-chicken", restaurant: "CAVA", category: "Salads", name: "Greens + Harissa Chicken", calories: 380, protein: 32, carbs: 18, fat: 20, fiber: 6, sodium: 760 },

  // Raising Cane's
  { id: "canes-box-combo", restaurant: "Raising Cane's", category: "Combos", name: "The Box Combo (4 fingers)", calories: 1250, protein: 48, carbs: 112, fat: 68, fiber: 4, sodium: 2480 },
  { id: "canes-3-finger", restaurant: "Raising Cane's", category: "Combos", name: "3 Finger Combo", calories: 960, protein: 36, carbs: 84, fat: 52, fiber: 3, sodium: 1920 },
  { id: "canes-sandwich-combo", restaurant: "Raising Cane's", category: "Combos", name: "Chicken Sandwich Combo", calories: 1100, protein: 38, carbs: 106, fat: 58, fiber: 3, sodium: 2200 },
  { id: "canes-fingers-only", restaurant: "Raising Cane's", category: "Chicken", name: "4 Chicken Fingers (no sides)", calories: 480, protein: 36, carbs: 20, fat: 28, fiber: 0, sodium: 1120 },
  { id: "canes-kids-combo", restaurant: "Raising Cane's", category: "Combos", name: "Kids Combo (2 fingers)", calories: 630, protein: 22, carbs: 58, fat: 34, fiber: 2, sodium: 1280 },
  { id: "canes-coleslaw", restaurant: "Raising Cane's", category: "Sides", name: "Coleslaw", calories: 200, protein: 1, carbs: 14, fat: 16, fiber: 1, sodium: 260 },
  { id: "canes-texas-toast", restaurant: "Raising Cane's", category: "Sides", name: "Texas Toast", calories: 150, protein: 3, carbs: 16, fat: 8, fiber: 0, sodium: 210 },
];

export function getMenuByRestaurant(id: string): MenuItem[] {
  const r = restaurants.find((r) => r.id === id);
  if (!r) return [];
  return menuItems.filter((item) => item.restaurant === r.name);
}

export function getAllRestaurants(): Restaurant[] {
  return restaurants;
}
