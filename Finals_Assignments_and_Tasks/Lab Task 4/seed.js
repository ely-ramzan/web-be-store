require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/ProductSchema');

// 120 Products: 20 per productType per category
// Categories: for-him, for-her
// ProductTypes: clothing, shoes, accessories

const products = [
    // ==========================================
    // FOR HIM - CLOTHING (20 products)
    // ==========================================
    { name: "Classic Polo Shirt", price: 2499, description: "Premium cotton polo shirt", image: "https://images.unsplash.com/photo-1625910513413-5fc89bce8c80?w=500", category: "for-him", productType: "clothing", stock: 50 },
    { name: "Slim Fit Chinos", price: 3299, description: "Comfortable stretch chinos", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500", category: "for-him", productType: "clothing", stock: 45 },
    { name: "Denim Jacket", price: 4999, description: "Classic blue denim jacket", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500", category: "for-him", productType: "clothing", stock: 30 },
    { name: "Cotton Hoodie", price: 3499, description: "Soft fleece-lined hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", category: "for-him", productType: "clothing", stock: 60 },
    { name: "Formal Blazer", price: 8999, description: "Tailored slim fit blazer", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500", category: "for-him", productType: "clothing", stock: 25 },
    { name: "Graphic T-Shirt", price: 1499, description: "Printed cotton t-shirt", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500", category: "for-him", productType: "clothing", stock: 100 },
    { name: "Cargo Pants", price: 3799, description: "Multi-pocket cargo trousers", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=500", category: "for-him", productType: "clothing", stock: 40 },
    { name: "Linen Shirt", price: 2999, description: "Breathable linen summer shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", category: "for-him", productType: "clothing", stock: 35 },
    { name: "Wool Sweater", price: 4499, description: "Warm crew neck sweater", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", category: "for-him", productType: "clothing", stock: 28 },
    { name: "Track Pants", price: 2299, description: "Comfortable jogger pants", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500", category: "for-him", productType: "clothing", stock: 55 },
    { name: "Leather Jacket", price: 12999, description: "Premium leather biker jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", category: "for-him", productType: "clothing", stock: 15 },
    { name: "Oxford Shirt", price: 2799, description: "Classic button-down oxford", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500", category: "for-him", productType: "clothing", stock: 45 },
    { name: "Puffer Jacket", price: 6499, description: "Insulated winter puffer", image: "https://images.unsplash.com/photo-1544923246-77307dd628b4?w=500", category: "for-him", productType: "clothing", stock: 20 },
    { name: "Kurta Shalwar", price: 4999, description: "Traditional cotton kurta set", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500", category: "for-him", productType: "clothing", stock: 40 },
    { name: "Waistcoat", price: 3999, description: "Slim fit formal waistcoat", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "clothing", stock: 22 },
    { name: "Henley Shirt", price: 1999, description: "Long sleeve henley", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500", category: "for-him", productType: "clothing", stock: 65 },
    { name: "Bomber Jacket", price: 5499, description: "Classic nylon bomber", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500", category: "for-him", productType: "clothing", stock: 30 },
    { name: "Dress Trousers", price: 3499, description: "Formal dress pants", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "clothing", stock: 38 },
    { name: "Sweatshirt", price: 2799, description: "Crew neck sweatshirt", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", category: "for-him", productType: "clothing", stock: 50 },
    { name: "Cardigan", price: 3999, description: "Button-front cardigan", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", category: "for-him", productType: "clothing", stock: 25 },

    // ==========================================
    // FOR HIM - SHOES (20 products)
    // ==========================================
    { name: "Oxford Dress Shoes", price: 7999, description: "Classic leather oxfords", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500", category: "for-him", productType: "shoes", stock: 30 },
    { name: "White Sneakers", price: 4999, description: "Minimalist leather sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", category: "for-him", productType: "shoes", stock: 50 },
    { name: "Loafers", price: 5999, description: "Suede penny loafers", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500", category: "for-him", productType: "shoes", stock: 35 },
    { name: "Running Shoes", price: 6499, description: "Lightweight running trainers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "for-him", productType: "shoes", stock: 45 },
    { name: "Chelsea Boots", price: 8499, description: "Leather chelsea boots", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500", category: "for-him", productType: "shoes", stock: 25 },
    { name: "Canvas Sneakers", price: 2499, description: "Classic canvas trainers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", category: "for-him", productType: "shoes", stock: 60 },
    { name: "Monk Straps", price: 7499, description: "Double monk strap shoes", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500", category: "for-him", productType: "shoes", stock: 20 },
    { name: "Hiking Boots", price: 8999, description: "Waterproof hiking boots", image: "https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=500", category: "for-him", productType: "shoes", stock: 28 },
    { name: "Slip-On Sneakers", price: 3499, description: "Easy slip-on trainers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", category: "for-him", productType: "shoes", stock: 55 },
    { name: "Dress Boots", price: 9499, description: "Formal leather boots", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500", category: "for-him", productType: "shoes", stock: 18 },
    { name: "Boat Shoes", price: 4499, description: "Classic boat shoes", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500", category: "for-him", productType: "shoes", stock: 32 },
    { name: "Sports Sandals", price: 2999, description: "Comfortable sport sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-him", productType: "shoes", stock: 40 },
    { name: "Derby Shoes", price: 6999, description: "Classic leather derbies", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500", category: "for-him", productType: "shoes", stock: 25 },
    { name: "High-Top Sneakers", price: 4299, description: "Trendy high-top trainers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", category: "for-him", productType: "shoes", stock: 38 },
    { name: "Chukka Boots", price: 7299, description: "Suede chukka boots", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500", category: "for-him", productType: "shoes", stock: 22 },
    { name: "Espadrilles", price: 2299, description: "Summer espadrilles", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500", category: "for-him", productType: "shoes", stock: 45 },
    { name: "Kolhapuri Sandals", price: 1999, description: "Traditional leather sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-him", productType: "shoes", stock: 35 },
    { name: "Sneaker Boots", price: 5999, description: "Hybrid sneaker boots", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "for-him", productType: "shoes", stock: 28 },
    { name: "Brogues", price: 6499, description: "Perforated brogue shoes", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500", category: "for-him", productType: "shoes", stock: 30 },
    { name: "Moccasins", price: 3999, description: "Soft leather moccasins", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500", category: "for-him", productType: "shoes", stock: 42 },

    // ==========================================
    // FOR HIM - ACCESSORIES (20 products)
    // ==========================================
    { name: "Leather Belt", price: 2499, description: "Genuine leather belt", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-him", productType: "accessories", stock: 80 },
    { name: "Aviator Sunglasses", price: 3999, description: "Classic aviator shades", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", category: "for-him", productType: "accessories", stock: 50 },
    { name: "Leather Wallet", price: 2999, description: "Bi-fold leather wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: "for-him", productType: "accessories", stock: 65 },
    { name: "Wrist Watch", price: 8999, description: "Stainless steel watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500", category: "for-him", productType: "accessories", stock: 30 },
    { name: "Canvas Backpack", price: 4499, description: "Durable canvas backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-him", productType: "accessories", stock: 40 },
    { name: "Wool Scarf", price: 1999, description: "Winter wool scarf", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500", category: "for-him", productType: "accessories", stock: 55 },
    { name: "Fedora Hat", price: 2499, description: "Classic felt fedora", image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500", category: "for-him", productType: "accessories", stock: 35 },
    { name: "Tie Set", price: 1799, description: "Silk tie with pocket square", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "accessories", stock: 45 },
    { name: "Messenger Bag", price: 5999, description: "Leather messenger bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "for-him", productType: "accessories", stock: 28 },
    { name: "Cufflinks", price: 1499, description: "Silver cufflinks set", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "accessories", stock: 60 },
    { name: "Baseball Cap", price: 999, description: "Cotton baseball cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500", category: "for-him", productType: "accessories", stock: 90 },
    { name: "Leather Gloves", price: 2299, description: "Winter leather gloves", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-him", productType: "accessories", stock: 40 },
    { name: "Card Holder", price: 1299, description: "Slim card holder", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: "for-him", productType: "accessories", stock: 70 },
    { name: "Laptop Bag", price: 6999, description: "Professional laptop bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "for-him", productType: "accessories", stock: 25 },
    { name: "Beanie", price: 899, description: "Knit winter beanie", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500", category: "for-him", productType: "accessories", stock: 75 },
    { name: "Suspenders", price: 1499, description: "Classic clip suspenders", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "accessories", stock: 35 },
    { name: "Gym Bag", price: 3499, description: "Sports duffle bag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-him", productType: "accessories", stock: 45 },
    { name: "Pocket Square Set", price: 999, description: "Silk pocket squares (3 pack)", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-him", productType: "accessories", stock: 55 },
    { name: "Travel Wallet", price: 2799, description: "Passport travel wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: "for-him", productType: "accessories", stock: 38 },
    { name: "Bracelet", price: 1199, description: "Leather cord bracelet", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500", category: "for-him", productType: "accessories", stock: 65 },

    // ==========================================
    // FOR HER - CLOTHING (20 products)
    // ==========================================
    { name: "Floral Maxi Dress", price: 4999, description: "Elegant floral print maxi", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500", category: "for-her", productType: "clothing", stock: 35 },
    { name: "Pleated Midi Skirt", price: 3299, description: "Classic pleated skirt", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0ebb5?w=500", category: "for-her", productType: "clothing", stock: 40 },
    { name: "Silk Blouse", price: 3999, description: "Elegant silk blouse", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500", category: "for-her", productType: "clothing", stock: 30 },
    { name: "Cashmere Cardigan", price: 5999, description: "Soft cashmere cardigan", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", category: "for-her", productType: "clothing", stock: 25 },
    { name: "High-Waist Jeans", price: 3499, description: "Stretch high-waist denim", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500", category: "for-her", productType: "clothing", stock: 55 },
    { name: "Cocktail Dress", price: 6999, description: "Little black cocktail dress", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", category: "for-her", productType: "clothing", stock: 20 },
    { name: "Palazzo Pants", price: 2799, description: "Flowy palazzo trousers", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-her", productType: "clothing", stock: 45 },
    { name: "Embroidered Kurta", price: 4499, description: "Traditional embroidered kurta", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500", category: "for-her", productType: "clothing", stock: 38 },
    { name: "Wrap Top", price: 2299, description: "Elegant wrap blouse", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500", category: "for-her", productType: "clothing", stock: 50 },
    { name: "A-Line Dress", price: 3799, description: "Classic A-line dress", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500", category: "for-her", productType: "clothing", stock: 32 },
    { name: "Trench Coat", price: 7999, description: "Classic beige trench coat", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500", category: "for-her", productType: "clothing", stock: 18 },
    { name: "Crop Top", price: 1499, description: "Trendy crop top", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500", category: "for-her", productType: "clothing", stock: 65 },
    { name: "Lawn Suit", price: 5499, description: "3-piece lawn suit", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500", category: "for-her", productType: "clothing", stock: 40 },
    { name: "Blazer", price: 5999, description: "Tailored women's blazer", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500", category: "for-her", productType: "clothing", stock: 22 },
    { name: "Knit Sweater", price: 3299, description: "Cozy knit pullover", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", category: "for-her", productType: "clothing", stock: 35 },
    { name: "Pencil Skirt", price: 2499, description: "Classic pencil skirt", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0ebb5?w=500", category: "for-her", productType: "clothing", stock: 42 },
    { name: "Denim Jacket", price: 4499, description: "Women's denim jacket", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500", category: "for-her", productType: "clothing", stock: 28 },
    { name: "Jumpsuit", price: 4999, description: "Elegant wide-leg jumpsuit", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500", category: "for-her", productType: "clothing", stock: 25 },
    { name: "Tunic Top", price: 2199, description: "Flowy tunic blouse", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500", category: "for-her", productType: "clothing", stock: 48 },
    { name: "Wide Leg Pants", price: 2999, description: "High-waist wide leg pants", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", category: "for-her", productType: "clothing", stock: 38 },

    // ==========================================
    // FOR HER - SHOES (20 products)
    // ==========================================
    { name: "Stiletto Heels", price: 5999, description: "Classic black stilettos", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", category: "for-her", productType: "shoes", stock: 30 },
    { name: "Ballet Flats", price: 2999, description: "Comfortable ballet flats", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500", category: "for-her", productType: "shoes", stock: 50 },
    { name: "Strappy Sandals", price: 3499, description: "Elegant strappy heels", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 35 },
    { name: "Ankle Boots", price: 6499, description: "Leather ankle boots", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", category: "for-her", productType: "shoes", stock: 25 },
    { name: "White Sneakers", price: 3999, description: "Clean white sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", category: "for-her", productType: "shoes", stock: 55 },
    { name: "Block Heels", price: 4499, description: "Comfortable block heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", category: "for-her", productType: "shoes", stock: 38 },
    { name: "Loafers", price: 3299, description: "Classic leather loafers", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500", category: "for-her", productType: "shoes", stock: 42 },
    { name: "Platform Sandals", price: 3999, description: "Trendy platform sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 32 },
    { name: "Knee-High Boots", price: 8999, description: "Leather knee-high boots", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", category: "for-her", productType: "shoes", stock: 20 },
    { name: "Mules", price: 2799, description: "Pointed toe mules", image: "https://images.unsplash.com/photo-1515434126-f36a73dc5c86?w=500", category: "for-her", productType: "shoes", stock: 45 },
    { name: "Running Shoes", price: 5499, description: "Women's running trainers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "for-her", productType: "shoes", stock: 48 },
    { name: "Espadrille Wedges", price: 3699, description: "Summer espadrille wedges", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 35 },
    { name: "Pointed Pumps", price: 4999, description: "Classic pointed toe pumps", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", category: "for-her", productType: "shoes", stock: 28 },
    { name: "Slide Sandals", price: 1999, description: "Casual slide sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 60 },
    { name: "Chelsea Boots", price: 5999, description: "Women's chelsea boots", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500", category: "for-her", productType: "shoes", stock: 25 },
    { name: "Kitten Heels", price: 3499, description: "Elegant kitten heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500", category: "for-her", productType: "shoes", stock: 32 },
    { name: "Canvas Sneakers", price: 2299, description: "Classic canvas sneakers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500", category: "for-her", productType: "shoes", stock: 55 },
    { name: "Gladiator Sandals", price: 3299, description: "Strappy gladiator sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 38 },
    { name: "Khusa", price: 1799, description: "Traditional embroidered khusa", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500", category: "for-her", productType: "shoes", stock: 45 },
    { name: "High-Top Sneakers", price: 3999, description: "Trendy high-top sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", category: "for-her", productType: "shoes", stock: 40 },

    // ==========================================
    // FOR HER - ACCESSORIES (20 products)
    // ==========================================
    { name: "Leather Tote Bag", price: 6999, description: "Spacious leather tote", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", category: "for-her", productType: "accessories", stock: 30 },
    { name: "Cat Eye Sunglasses", price: 2999, description: "Vintage cat eye shades", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500", category: "for-her", productType: "accessories", stock: 45 },
    { name: "Silk Scarf", price: 1999, description: "Printed silk scarf", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500", category: "for-her", productType: "accessories", stock: 55 },
    { name: "Statement Earrings", price: 1299, description: "Gold drop earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", category: "for-her", productType: "accessories", stock: 70 },
    { name: "Crossbody Bag", price: 4499, description: "Compact crossbody bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "for-her", productType: "accessories", stock: 40 },
    { name: "Wide Brim Hat", price: 2499, description: "Summer straw hat", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500", category: "for-her", productType: "accessories", stock: 35 },
    { name: "Pearl Necklace", price: 3999, description: "Classic pearl strand", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", category: "for-her", productType: "accessories", stock: 25 },
    { name: "Leather Belt", price: 1799, description: "Slim leather belt", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-her", productType: "accessories", stock: 60 },
    { name: "Clutch Bag", price: 3499, description: "Evening clutch bag", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", category: "for-her", productType: "accessories", stock: 32 },
    { name: "Watch", price: 5999, description: "Rose gold watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500", category: "for-her", productType: "accessories", stock: 28 },
    { name: "Hair Accessories Set", price: 799, description: "Clips and pins set", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", category: "for-her", productType: "accessories", stock: 85 },
    { name: "Charm Bracelet", price: 1499, description: "Silver charm bracelet", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500", category: "for-her", productType: "accessories", stock: 55 },
    { name: "Backpack", price: 4999, description: "Stylish mini backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "for-her", productType: "accessories", stock: 35 },
    { name: "Pendant Necklace", price: 1999, description: "Delicate pendant necklace", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", category: "for-her", productType: "accessories", stock: 48 },
    { name: "Sling Bag", price: 2999, description: "Trendy sling bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "for-her", productType: "accessories", stock: 42 },
    { name: "Hoop Earrings", price: 999, description: "Classic gold hoops", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", category: "for-her", productType: "accessories", stock: 75 },
    { name: "Wallet", price: 2499, description: "Zip-around wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: "for-her", productType: "accessories", stock: 50 },
    { name: "Dupatta", price: 1299, description: "Embroidered dupatta", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500", category: "for-her", productType: "accessories", stock: 65 },
    { name: "Ring Set", price: 899, description: "Stacking rings set", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500", category: "for-her", productType: "accessories", stock: 80 },
    { name: "Cosmetic Bag", price: 1599, description: "Travel cosmetic pouch", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500", category: "for-her", productType: "accessories", stock: 55 }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log(`\n✅ Successfully seeded ${products.length} products!\n`);

        // Show detailed count
        console.log('=== Product Distribution ===\n');

        const categories = ['for-him', 'for-her'];
        const types = ['clothing', 'shoes', 'accessories'];

        for (const cat of categories) {
            console.log(`📦 ${cat.toUpperCase()}:`);
            for (const type of types) {
                const count = await Product.countDocuments({ category: cat, productType: type });
                console.log(`   - ${type}: ${count} products`);
            }
            console.log('');
        }

        const total = await Product.countDocuments();
        console.log(`📊 TOTAL: ${total} products`);

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
