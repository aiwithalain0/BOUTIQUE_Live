import {
  ShoppingBag,
  Smartphone,
  Monitor,
  Sparkles,
  Brain,
  Database,
  LineChart,
  Palette,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: string;
  category: string;
  image: string;
  imageUrl: string;
  badges?: string[];
  description?: string;
  sizeAndFit?: string;
  fabricAndCare?: string;

  // Attributes for filtering & trust:
  color: string; // 'Black' | 'Charcoal' | 'White' | 'Teal' | 'Burgundy' | 'Navy' | 'Beige' | 'Gold' | 'Rose'
  sizes: string[];
  is7DayReturn: boolean;
  returnEligible: boolean;
  inStock: boolean;

  // Explicit schema fields for badge logic & inventory:
  stockCount: number;
  dateAdded: string;
  salesRank?: number;
  isLimitedEdition?: boolean;
  isExclusive?: boolean;
}

export interface CuratedCombo {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  savings: string;
  items: Product[];
  image: string;
  badge?: string;
  description?: string;
}

export function getProductBadges(product: Partial<Product>): string[] {
  const badges: string[] = [];

  // 1. Exclusivity or Limited Edition (mutually exclusive with New)
  if (product.isExclusive) {
    badges.push('Boutique Exclusive');
  } else if (product.isLimitedEdition) {
    badges.push('Limited Edition');
  } else if (product.dateAdded) {
    const addedTime = new Date(product.dateAdded).getTime();
    const nowTime = new Date('2026-07-26').getTime();
    const daysOld = (nowTime - addedTime) / (1000 * 60 * 60 * 24);
    if (daysOld <= 14) {
      badges.push('New');
    }
  }

  // 2. Low stock alert (< 5 items)
  if (product.stockCount !== undefined && product.stockCount > 0 && product.stockCount < 5) {
    badges.push(`Only ${product.stockCount} left in stock`);
  }

  // 3. Sales rank
  if (product.salesRank && product.salesRank <= 5) {
    badges.push('Bestseller');
  } else if (product.salesRank && product.salesRank <= 15) {
    badges.push('Trending');
  }

  // 4. Discount badge
  if (product.discountPercentage) {
    badges.push(product.discountPercentage);
  }

  // 5. 7-Day Return Eligibility Badge
  const numericPrice = product.price ? parseInt(String(product.price).replace(/[^0-9]/g, '')) || 0 : 0;
  if (product.returnEligible !== false && (numericPrice >= 4000 || product.returnEligible)) {
    badges.push('7-Day Returns');
  }

  if (badges.length === 0 && product.badges && product.badges.length > 0) {
    return product.badges;
  }

  return badges;
}



// ── UNIFIED MASSIVE CATALOG: 160+ ITEMS (40+ PER CATEGORY) ─────────────────────

const baseImgFallback = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';

// Helper image banks for diverse high-res fashion photos
const womensImages = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
];

const mensImages = [
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=800&q=80',
];

const accImages = [
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
];

const bridalImages = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
];

// Helper to generate catalog items cleanly
function generateItems(
  startId: number,
  count: number,
  categoryName: string,
  names: string[],
  images: string[],
  colorList: string[],
  priceRange: [number, number]
) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    
    // Default values
    let name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : '');
    let basePrice = Math.floor(priceRange[0] + (i * 270) % (priceRange[1] - priceRange[0]));
    let hasDiscount = i % 3 === 0;
    let discountPct = hasDiscount ? `${15 + (i % 4) * 5}% OFF` : undefined;
    let origPrice = hasDiscount ? `₹${Math.floor(basePrice * 1.25).toLocaleString()}` : undefined;
    let color = colorList[i % colorList.length];
    const isFootwear = categoryName === 'Footwear' || name.toLowerCase().includes('boots') || name.toLowerCase().includes('loafers') || name.toLowerCase().includes('heels');
    let sizes = isFootwear ? ['37', '38', '39', '40', '41'] : ['XS', 'S', 'M', 'L', 'XL'];
    let img = images[i % images.length];
    let stockCount = i % 7 === 0 ? 0 : (i % 5) + 1;
    let dateAdded = i < 5 ? '2026-07-24' : '2026-06-15';
    let isExclusive = i % 10 === 0;
    let isLimitedEdition = i % 8 === 0;
    let salesRank = i + 1;
    let description = `Exquisite handcrafted ${name.toLowerCase()} tailored from premium sustainable fabrics at our signature Cotswolds atelier.`;
    let sizeAndFit = 'Tailored fit. Fits true to standard sizing. Model is wearing size S.';
    let fabricAndCare = '100% Sustainable Organic Silk & Cotswold Merino Wool blend. Dry clean only.';

    // Specific Overrides for Women's Top Items (to align New Arrivals and the Cashmere Turtleneck Dress)
    if (categoryName === 'Women') {
      if (i === 0) {
        name = 'Satin Trench Midi Blazer';
        basePrice = 7999;
        origPrice = '₹9,999';
        discountPct = '20% OFF';
        color = 'Burgundy';
        img = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80';
        stockCount = 3;
        dateAdded = '2026-07-20';
        salesRank = 6;
        description = 'A contemporary double-breasted satin trench blazer with clean architectural lapels and a detachable waist tie belt.';
        sizeAndFit = 'Fits true to size. Designed for a tailored, relaxed silhouette. Model is 5\'10" wearing size S.';
        fabricAndCare = '65% Sustainable Mulberry Silk, 35% Organic Cotton. Dry clean only. Cool iron on reverse.';
      } else if (i === 1) {
        name = 'Structured Wool Cropped Jacket';
        basePrice = 8999;
        origPrice = '₹11,999';
        discountPct = '25% OFF';
        color = 'Charcoal';
        img = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
        stockCount = 8;
        dateAdded = '2026-06-10';
        isExclusive = true;
        description = 'Cropped structured jacket woven from pure Cotswold merino wool with matte horn buttons and lined in silky satin.';
        sizeAndFit = 'Cropped length finishes at natural waist. Take your normal size. Model is 5\'9" wearing size M.';
        fabricAndCare = '100% Merino Wool, 100% Cupro Lining. Do not wash. Professional dry clean only.';
      } else if (i === 2) {
        name = 'Silk-Blend Asymmetric Top';
        basePrice = 4999;
        origPrice = '₹5,999';
        discountPct = '15% OFF';
        color = 'White';
        img = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80';
        stockCount = 12;
        dateAdded = '2026-07-18';
        salesRank = 3;
        description = 'Effortless fluid silk-blend top featuring an elegant draped neckline and structured asymmetric hemline.';
        sizeAndFit = 'Relaxed fluid fit through bust and waist. Stretch silk elastane blend. Model wears size S.';
        fabricAndCare = '92% Raw Silk, 8% Elastane. Hand wash cold or dry clean. Lay flat to dry.';
      } else if (i === 3) {
        name = 'Tailored Pleated Trousers';
        basePrice = 5999;
        origPrice = '₹7,499';
        discountPct = '20% OFF';
        color = 'Beige';
        img = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80';
        stockCount = 2;
        dateAdded = '2026-07-15';
        description = 'High-rise pleated wide-leg trousers tailored with deep front pleats and side slip pockets in fluid organic crepe.';
        sizeAndFit = 'High waist with full length wide leg. Inseam: 32 inches. Take one size down for a slimmer waist fit.';
        fabricAndCare = '70% Viscose Crepe, 30% Organic Cotton. Gentle machine wash 30°C or dry clean.';
      } else if (i === 4) {
        name = 'Cashmere Turtleneck Dress';
        basePrice = 8499;
        origPrice = '₹10,999';
        discountPct = '22% OFF';
        color = 'Charcoal';
        img = 'https://images.pexels.com/photos/2122208/pexels-photo-2122208.jpeg?auto=compress&cs=tinysrgb&w=800';
        stockCount = 5;
        dateAdded = '2026-07-22';
        description = 'An ultra-luxurious heavy cashmere turtleneck sweater dress with clean ribbed details and a flattering midi length.';
        sizeAndFit = 'Relaxed fit. Take your normal size. Model is 5\'8" wearing size S.';
        fabricAndCare = '100% Fine Mongolian Cashmere. Hand wash cold or professional dry clean only.';
      }
    }

    items.push({
      id,
      name,
      price: `₹${basePrice.toLocaleString()}`,
      originalPrice: origPrice,
      discountPercentage: discountPct,
      category: categoryName,
      color,
      sizes,
      is7DayReturn: true,
      returnEligible: true,
      inStock: stockCount > 0,
      stockCount,
      image: img,
      imageUrl: img,
      dateAdded,
      salesRank,
      isLimitedEdition,
      isExclusive,
      description,
      sizeAndFit,
      fabricAndCare,
    });
  }
  return items;
}

// 1. WOMEN'S WEAR (42 ITEMS)
const womenNames = [
  'Royal Silk Wrap Dress', 'Limited Cashmere Blazer', 'Emerald Satin Maxi Dress', 'Forest Turtleneck Knit',
  'Linen Pleated Midi Skirt', 'Wide-Leg Tailored Trousers', 'Mulberry Silk Evening Gown', 'French Chantilly Lace Top',
  'Double-Breasted Wool Trench', 'Designer Georgette Saree', 'Sculptural Flared Cocktail Skirt', 'Structure Oversized Blazer',
  'Organza Draped Blouse', 'Monochrome Column Maxi', 'Cropped Tweed Bouclé Jacket', 'Plissé Pleated Dress',
  'Cashmere V-Neck Jumper', 'Silk Crepe Shirtdress', 'Asymmetric Hemline Tunic', 'High-Waist Leather Trousers',
  'Velvet Gala Evening Dress', 'Hand-Embroidered Cape', 'Satin Slip Midi Dress', 'Merino Wool Cardigan',
  'Tailored Vest Waistcoat', 'Minimalist Linen Kimono', 'Printed Silk Scarf Dress', 'Ruffled Chiffon Blouse',
  'Corset Structured Bodice', 'Tiered Georgette Maxi', 'Houndstooth Tailored Coat', 'Satin Cowl Neck Top',
  'Pleated A-Line Skirt', 'Soft Cashmere Wrap Coat', 'Embroidered Silk Kurti', 'Belted Trench Vest',
  'Ribbed Knit Bodycon Dress', 'High-Rise Linen Pants', 'Sculptured Puff Sleeve Top', 'Sheer Silk Layering Tunic',
  'Atelier Velvet Blazer', 'Draped Halter Evening Gown'
];

// 2. MEN'S WEAR (42 ITEMS)
const menNames = [
  'Italian Tailored Wool Suit', 'Linen Bandhgala Jacket', 'Silk Sherwani Ensemble', 'Minimalist Linen Shirt',
  'Heritage Check Blazer', 'Supple Leather Biker Jacket', 'Cashmere Crewneck Sweater', 'Slim-Fit Chino Trousers',
  'Royal Velvet Tuxedo Blazer', 'Handloom Cotton Kurta', 'Double-Breasted Overcoat', 'Classic Oxford Cotton Polo',
  'Merino Wool Turtleneck', 'Tailored Pleated Trousers', 'Suede Field Trench Jacket', 'Structured Waistcoat',
  'Silk Jacquard Nehru Jacket', 'Casual Resort Linen Set', 'Pinstripe Italian Suit', 'Hand-Stitched Leather Coat',
  'Monochrome Heavyweight Hoodie', 'Ribbed Silk Knit Polo', 'Slim Tailored Dinner Suit', 'Embroidered Festive Sherwani',
  'Wool Trench Overcoat', 'Egyptian Cotton Dress Shirt', 'Tweed Blazer Jacket', 'Relaxed Fit Linen Trousers',
  'Satin Lapel Tuxedo Jacket', 'Raw Silk Bandhgala Set', 'Suede Zip Bomber Jacket', 'Cashmere Cardigan Sweater',
  'Tailored Wool Waistcoat', 'Bespoke Evening Jacket', 'Casual Brushed Polo', 'Herringbone Overcoat',
  'Organic Cotton Lounge Pants', 'Silk-Blend Dinner Shirt', 'Structured Urban Parka', 'Heritage Wool Blazer',
  'Festive Printed Kurta Jacket', 'Velvet Trim Tuxedo'
];

// 3. ACCESSORIES & FOOTWEAR (42 ITEMS)
const accNames = [
  'Italian Leather Loafers', 'Handcrafted Leather Boots', 'Stiletto Silk Pumps', 'Monogram Canvas Tote',
  'Minimalist Leather Clutch', 'Mulberry Silk Printed Scarf', 'Polarized Acetate Sunglasses', 'Full-Grain Leather Belt',
  'Crystal Statement Necklace', 'Gold Vermeil Hoop Earrings', 'Burnished Oxford Shoes', 'Suede Chelsea Boots',
  'Hand-Embroidered Potli Bag', 'Structured Top-Handle Handbag', 'Cashmere Knit Beanie', 'Crocodile Embossed Cardholder',
  'Leather Weekender Duffle', 'Silk Pocket Square Set', 'Pearl Drop Earrings', 'Velvet Evening Clutch',
  'Italian Calfskin Belt', 'Square Frame Sunglasses', 'Embroidered Silk Shawl', 'Pointed Toe Leather Heels',
  'Monk Strap Dress Shoes', 'Woven Leather Tote', 'Signet Gold Ring', 'Leather Ankle Boots',
  'Satin Evening Envelope Bag', 'Cashmere Pashmina Shawl', 'Braided Leather Loafers', 'Classic Aviator Sunglasses',
  'Sterling Silver Cufflinks', 'Structured Crossbody Bag', 'Suede Driving Shoes', 'Handcrafted Gold Bangle',
  'Leather Travel Wallet', 'Chunky Leather Loafers', 'Silk Twill Hair Ribbon', 'Satin Ankle Strap Heels',
  'Quilted Leather Shoulder Bag', 'Geometric Sun Eyewear'
];

// 4. BRIDAL & FESTIVE / SUSTAINABLE LINE (42 ITEMS)
const bridalNames = [
  'Zardozi Embroidered Lehenga', 'Royal Silk Bridal Gown', 'Handloom Organic Cotton Dress', 'Eco-Linen Matching Set',
  'Raw Silk Reception Saree', 'Organza Bridal Dupatta Set', 'Hand-Woven Khadi Trench', 'Sustainable Hemp Midi Dress',
  'Gold Thread Embroidered Lehenga', 'Couture Silk Ballgown', 'Natural Dyed Linen Co-Ord', 'Un-Dyed Organic Cotton Tunic',
  'Sequin Velvet Festival Saree', 'Heavy Bridal Sherwani Set', 'Eco-Certified Silk Jacket', 'Botanical Print Maxi Dress',
  'Heritage Bandhani Lehenga', 'Custom Fit Bridal Corset Gown', 'Recycled Merino Wool Coat', 'Bamboo Fiber Drape Dress',
  'Kanjeevaram Silk Saree', 'Crystal Embroidered Anarkali', 'Organic Linen Blazer Set', 'Handcrafted Threadwork Jacket',
  'Pearl Embellished Bridal Cape', 'Sustainable Raw Silk Saree', 'Zero-Waste Pattern Maxi', 'Floral Embroidered Lehenga',
  'Eco-Linen Lounge Set', 'Handloom Tussar Silk Dupatta', 'Royal Velvet Bridal Lehenga', 'Naturally Dyed Indigo Kimono',
  'Custom Couture Wedding Dress', 'Organza Tiered Festival Dress', 'Recycled Cashmere Shawl', 'Organic Cotton Pleated Dress',
  'Mirror-Work Festive Lehenga', 'Pure Mulberry Silk Anarkali', 'Sustainable Wool Waistcoat', 'Hand-Drawn Botanical Saree',
  'Gold Brocade Festive Sherwani', 'Eco-Friendly Couture Evening Gown'
];

const womensWearItems = generateItems(1, 42, 'Women', womenNames, womensImages, ['Black', 'Charcoal', 'White', 'Teal', 'Burgundy', 'Navy', 'Beige'], [3999, 14999]);
const mensWearItems = generateItems(43, 42, 'Men', menNames, mensImages, ['Black', 'Charcoal', 'Navy', 'Beige', 'White'], [4999, 18999]);
const accFootwearItems = generateItems(85, 21, 'Accessories', accNames.slice(0, 21), accImages, ['Black', 'Gold', 'Burgundy', 'Beige'], [2499, 12999])
  .concat(generateItems(106, 21, 'Footwear', accNames.slice(21, 42), accImages, ['Black', 'Charcoal', 'Beige', 'Navy'], [3999, 15999]));
const bridalSustainableItems = generateItems(127, 21, 'Bridal & Festive', bridalNames.slice(0, 21), bridalImages, ['Gold', 'Burgundy', 'Teal', 'Rose', 'White'], [8999, 29999])
  .concat(generateItems(148, 21, 'Sustainable Line', bridalNames.slice(21, 42), bridalImages, ['Beige', 'Teal', 'White', 'Charcoal'], [3499, 11999]));

export const indianTraditionalCollection: Product[] = [
  {
    id: 170,
    name: 'Royal Banarasi Zardozi Bridal Lehenga',
    price: '₹34,999',
    originalPrice: '₹44,999',
    discountPercentage: '22% OFF',
    category: 'Bridal & Festive',
    color: 'Burgundy',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-24',
    salesRank: 1,
    isExclusive: true,
    description: 'Hand-crafted Banarasi silk lehenga enriched with heavy antique zardozi metallic bullion threadwork, semi-precious stone embellishments, and a double organza veil dupatta.',
    sizeAndFit: 'Flared A-line silhouette with adjustable drawstring waistband and padded blouse.',
    fabricAndCare: '100% Pure Banarasi Silk with Metallic Dabka Zari. Professional dry clean only.',
  },
  {
    id: 171,
    name: 'Lucknowi Chikankari Hand-Embroidered Anarkali',
    price: '₹18,999',
    originalPrice: '₹22,999',
    discountPercentage: '17% OFF',
    category: 'Bridal & Festive',
    color: 'White',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-23',
    salesRank: 2,
    isLimitedEdition: true,
    description: 'Royal Lucknowi Chikankari hand-stitched silk chiffon anarkali with delicate pearl highlights, matching flared churidar, and hand-embroidered dupatta.',
    sizeAndFit: 'Ankle-length flared floor length. Model is 5\'9" wearing size S.',
    fabricAndCare: '100% Silk Chiffon with Pure Cotton Threadwork. Hand wash cold or dry clean.',
  },
  {
    id: 172,
    name: 'Kanjeevaram Pure Gold Zari Silk Saree',
    price: '₹24,999',
    originalPrice: '₹29,999',
    discountPercentage: '16% OFF',
    category: 'Bridal & Festive',
    color: 'Teal',
    sizes: ['Free Size'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-22',
    salesRank: 3,
    isExclusive: true,
    description: 'Authentic Kanchipuram pure silk saree woven with real gold zari temple borders and intricate peacock pallu motifs. Includes unstitched silk blouse fabric.',
    sizeAndFit: 'Standard 6.3 meter length with 80cm unstitched blouse piece.',
    fabricAndCare: '100% Pure Mulberry Silk & Gold Tested Zari. Dry clean only.',
  },
  {
    id: 173,
    name: 'Imperial Heritage Raw Silk Sherwani Set',
    price: '₹29,999',
    originalPrice: '₹38,999',
    discountPercentage: '23% OFF',
    category: 'Men',
    color: 'Navy',
    sizes: ['38', '40', '42', '44', '46'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-20',
    salesRank: 4,
    description: 'Regal velvet sherwani adorned with gold dabka and marodi embroidery, accompanied by raw silk churidar trousers and a crushed organza embroidered stole.',
    sizeAndFit: 'Structured sharp shoulders with tailored fit. Fits true to chest size.',
    fabricAndCare: '100% Raw Silk & Velvet Trim. Dry clean only.',
  },
  {
    id: 174,
    name: 'Gotapatti Embroidered Velvet Lehenga Choli',
    price: '₹27,999',
    originalPrice: '₹34,999',
    discountPercentage: '20% OFF',
    category: 'Bridal & Festive',
    color: 'Burgundy',
    sizes: ['S', 'M', 'L', 'XL'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 3,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-21',
    isLimitedEdition: true,
    description: 'Deep velvet bridal lehenga handcrafted in Jaipur with traditional Rajasthani Gota Patti and mirror work, paired with an embroidered sweetheart neckline choli.',
    sizeAndFit: 'High waist flared skirt with semi-stitched waist up to 42 inches.',
    fabricAndCare: 'Royal Velvet & Organza Dupatta. Dry clean only.',
  },
  {
    id: 175,
    name: 'Gold Brocade Bandhgala Silk Suit',
    price: '₹19,999',
    originalPrice: '₹24,999',
    discountPercentage: '20% OFF',
    category: 'Men',
    color: 'Gold',
    sizes: ['38', '40', '42', '44'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-19',
    description: 'Imperial raw silk Bandhgala jacket tailored with structured shoulders, handcrafted brass crest buttons, and slim-fit ivory trousers.',
    sizeAndFit: 'Tailored fit. Model is wearing size 40.',
    fabricAndCare: '70% Raw Silk, 30% Gold Brocade. Dry clean only.',
  },
  {
    id: 176,
    name: 'Pastel Rose Gold Chiffon Sharara Suit Set',
    price: '₹16,499',
    originalPrice: '₹19,999',
    discountPercentage: '17% OFF',
    category: 'Bridal & Festive',
    color: 'Rose',
    sizes: ['XS', 'S', 'M', 'L'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 9,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-18',
    description: 'Ethereal rose gold chiffon short kurti featuring sequins and zari work, paired with a multi-tiered flared sharara and sheer net dupatta.',
    sizeAndFit: 'Relaxed fit with elasticated sharara waist.',
    fabricAndCare: 'Pure Chiffon & Satin Lining. Dry clean only.',
  },
  {
    id: 177,
    name: 'Hand-Embroidered Velvet Zardozi Potli Bag',
    price: '₹4,999',
    originalPrice: '₹6,499',
    discountPercentage: '23% OFF',
    category: 'Accessories',
    color: 'Burgundy',
    sizes: ['One Size'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-15',
    description: 'Artisanal velvet potli pouch encrusted with pearl tassels, gold dabka embroidery, and a drawstring handle.',
    sizeAndFit: 'Compact luxury clutch size (20x22 cm).',
    fabricAndCare: 'Micro Velvet & Pearl Tassels.',
  },
  {
    id: 178,
    name: 'Handcrafted Zari Embroidered Velvet Juttis',
    price: '₹5,499',
    originalPrice: '₹6,999',
    discountPercentage: '21% OFF',
    category: 'Footwear',
    color: 'Gold',
    sizes: ['37', '38', '39', '40', '41'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-16',
    description: 'Royal Punjabi mojaris crafted from genuine leather padded with double foam cushioning and hand-stitched gold bullion embroidery.',
    sizeAndFit: 'Fits true to European sizing. Soft leather molds to foot.',
    fabricAndCare: '100% Genuine Calf Leather with Metallic Threading.',
  },
  {
    id: 179,
    name: 'Maharani Polki Kundan Choker Jewelry Set',
    price: '₹12,999',
    originalPrice: '₹16,999',
    discountPercentage: '23% OFF',
    category: 'Accessories',
    color: 'Gold',
    sizes: ['Adjustable Dori'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-17',
    isExclusive: true,
    description: 'Statement bridal Kundan necklace set with uncut Polki stones, emerald green drop beads, and matching chandelier earrings.',
    sizeAndFit: 'Adjustable silk dori fastening.',
    fabricAndCare: '22K Gold Plated Brass & Faux Polki Kundan.',
  },
  {
    id: 180,
    name: 'Bandhani Silk Organza Gharara Suit Set',
    price: '₹21,999',
    originalPrice: '₹26,999',
    discountPercentage: '18% OFF',
    category: 'Bridal & Festive',
    color: 'Teal',
    sizes: ['S', 'M', 'L', 'XL'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 6,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-14',
    description: 'Hand-dyed Rajasthani Bandhej silk organza kurti and flared gharara trousers featuring gold foil printing and gota trim.',
    sizeAndFit: 'Tailored kurti length 38 inches. Flared gharara hem.',
    fabricAndCare: 'Pure Silk Organza & Satin Lining. Dry clean only.',
  },
  {
    id: 181,
    name: 'Ivory Mulberry Silk Kurta with Zardozi Nehru Jacket',
    price: '₹15,999',
    originalPrice: '₹19,999',
    discountPercentage: '20% OFF',
    category: 'Men',
    color: 'White',
    sizes: ['38', '40', '42', '44'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-13',
    description: 'Pristine mulberry silk kurta and churidar paired with a structured forest green silk velvet Nehru jacket featuring gold marodi embroidery.',
    sizeAndFit: 'Regular fit kurta with straight churidar trousers.',
    fabricAndCare: '100% Mulberry Silk & Velvet. Dry clean only.',
  },
  {
    id: 182,
    name: 'Royal Kashmiri Jamawar Pashmina Shawl',
    price: '₹17,999',
    originalPrice: '₹21,999',
    discountPercentage: '18% OFF',
    category: 'Accessories',
    color: 'Teal',
    sizes: ['100x200 cm'],
    is7DayReturn: true,
    returnEligible: true,
    inStock: true,
    stockCount: 7,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    dateAdded: '2026-07-12',
    isLimitedEdition: true,
    description: '100% pure Grade-A Kashmiri Pashmina hand-woven with traditional royal Paisley Jamawar jacquard patterns.',
    sizeAndFit: 'Generous 100x200 cm wrap size.',
    fabricAndCare: '100% Kashmiri Pashmina Cashmere. Dry clean only.',
  },
];

const rawProducts = [
  ...indianTraditionalCollection,
  ...womensWearItems,
  ...mensWearItems,
  ...accFootwearItems,
  ...bridalSustainableItems,
];

export const products: Product[] = rawProducts.map((item) => ({
  ...item,
  badges: getProductBadges(item),
}));

// Apply professional single source of truth overrides for exact product alignment
const targetLoafers = products.find(p => p.id === 85);
if (targetLoafers) {
  targetLoafers.price = '₹12,999';
  targetLoafers.category = 'Footwear';
}

export const newArrivals: Product[] = products.slice(0, 4);

export const shopTheLookOutfit = {
  id: 'outfit-cotswolds-1',
  title: 'The Cotswolds Autumn Editorial Look',
  subtitle: 'Complete Curated Outfit',
  description: 'An iconic high-fashion ensemble combining double-breasted satin tailoring, draped raw silk, structured trousers, and Italian calfskin footwear.',
  image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
  totalPrice: '₹31,996',
  discountedPrice: '₹24,999',
  savings: 'Save ₹6,997 (Special Outfit Bundle)',
  items: [
    products[0], // Satin Trench Midi Blazer (ID 1)
    products[2], // Silk-Blend Asymmetric Top (ID 3)
    products[3], // Tailored Pleated Trousers (ID 4)
    products[84], // Italian Leather Loafers (ID 85)
  ],
};

export const teamMembers = [
  {
    name: 'Eleanor Vance',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Thomas Greenwood',
    role: 'Head of Atelier',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Clara Pemberton',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Henry Ashworth',
    role: 'Digital Studio Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export const portfolio = [
  {
    id: 1,
    title: 'Maison Verde Storefront',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'A heritage fashion house reimagined for the digital age.',
    problem: "Maison Verde's legacy site was slow, hard to navigate, and failed to reflect the brand's craftsmanship.",
    solution: 'We rebuilt the storefront on Next.js with editorial layouts, fast checkout, and a PWA for offline browsing.',
    result: 'Conversion rate tripled and average order value increased by 40% within the first quarter.',
  },
  {
    id: 2,
    title: 'Holloway Booking Platform',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Custom tailoring appointments, reimagined.',
    problem: 'Booking a fitting required phone calls and paper ledgers.',
    solution: 'A Supabase-backed booking platform with real-time availability and stylist matching.',
    result: 'No-shows dropped 60% and bookings increased 3x.',
  },
  {
    id: 3,
    title: 'Atelier Nord Loyalty App',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    description: 'A loyalty experience that feels like a members club.',
    problem: 'Atelier Nord lacked a way to reward returning clients digitally.',
    solution: 'A React Native app with tiered rewards, early access, and a personal stylist chat.',
    result: 'Repeat purchase rate grew by 85% in six months.',
  },
];

export const team = [
  {
    name: 'Eleanor Vance',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneering sustainable couture and architectural draping.',
  },
  {
    name: 'Thomas Greenwood',
    role: 'Head of Atelier',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    bio: 'Master tailor with 20+ years of Savile Row heritage.',
  },
  {
    name: 'Clara Pemberton',
    role: 'Lead Stylist',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Curator of personal wardrobe capsules for global clientele.',
  },
];

export const faqs = [
  {
    q: 'How does the 7-Day Easy Doorstep Return work?',
    a: 'Every item purchased at L’AVENIR includes 7-day complimentary returns. Simply initiate a return request from your order preferences or chat with our online concierge, and our courier will collect the package from your doorstep free of charge.',
    question: 'How does the 7-Day Easy Doorstep Return work?',
    answer: 'Every item purchased at L’AVENIR includes 7-day complimentary returns. Simply initiate a return request from your order preferences or chat with our online concierge, and our courier will collect the package from your doorstep free of charge.',
  },
  {
    q: 'Do you offer custom bespoke sizing?',
    a: 'Yes, our Cotswolds atelier provides complimentary bespoke fitting adjustments. You can enter your custom bust, waist, hip, and length measurements during checkout or request a Virtual Stylist consultation.',
    question: 'Do you offer custom bespoke sizing?',
    answer: 'Yes, our Cotswolds atelier provides complimentary bespoke fitting adjustments. You can enter your custom bust, waist, hip, and length measurements during checkout or request a Virtual Stylist consultation.',
  },
  {
    q: 'What are your delivery timelines?',
    a: 'Domestic doorstep courier deliveries take 2–4 business days. Express next-day delivery is available at checkout for major metropolitan cities.',
    question: 'What are your delivery timelines?',
    answer: 'Domestic doorstep courier deliveries take 2–4 business days. Express next-day delivery is available at checkout for major metropolitan cities.',
  },
  {
    q: 'Are all garments sustainably sourced?',
    a: '100% of our silk, merino wool, and organic cotton fabrics are GOTS-certified organic and ethically woven in low-impact heritage mills.',
    question: 'Are all garments sustainably sourced?',
    answer: '100% of our silk, merino wool, and organic cotton fabrics are GOTS-certified organic and ethically woven in low-impact heritage mills.',
  },
];

export const services = [
  {
    id: 'bespoke',
    title: 'Bespoke Atelier Tailoring',
    description: 'Custom garments crafted to your exact body measurements by our master tailors.',
    icon: Sparkles,
  },
  {
    id: 'styling',
    title: 'Personal Stylist Consultation',
    description: '1-on-1 virtual or in-studio styling sessions to curate your capsule wardrobe.',
    icon: Palette,
  },
  {
    id: 'concierge',
    title: 'Private Client Concierge',
    description: 'White-glove priority shipping, private fittings, and instant WhatsApp support.',
    icon: Brain,
  },
];

export const testimonials = [
  {
    name: 'Victoria Sterling',
    role: 'Fashion Editor',
    quote: 'L’AVENIR represents the golden ratio of sustainable luxury and flawless modern tailoring.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    name: 'Julian Thorne',
    role: 'Architect',
    quote: 'The craftsmanship of their Italian wool suits is unmatched. The fit is absolute perfection.',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export const curatedCombos = [
  {
    id: 'combo-1',
    title: 'The Executive Capsule',
    subtitle: 'Tailored Blazer + Silk Top + Leather Trousers',
    price: '₹18,999',
    originalPrice: '₹24,999',
    savings: 'Save ₹6,000',
    badge: 'Curated Ensemble',
    description: 'An iconic high-fashion ensemble combining double-breasted satin tailoring, draped raw silk, structured trousers, and Italian calfskin footwear.',
    items: [products[0], products[2], products[3]],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'combo-2',
    title: 'The Festive Royal Combo',
    subtitle: 'Silk Kurta + Embroidered Jacket + Churidar',
    price: '₹13,999',
    originalPrice: '₹18,999',
    savings: 'Save ₹5,000',
    badge: 'Festive Special',
    description: 'A regal celebration pairing featuring handloom silk kurta, gold thread zardozi embroidered jacket, and matching tailored churidar.',
    items: [products[51], products[58], products[49]],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'combo-3',
    title: 'Weekend Resort Outfit',
    subtitle: 'Linen Shirt + Tailored Shorts + Leather Loafers',
    price: '₹8,999',
    originalPrice: '₹11,999',
    savings: 'Save ₹3,000',
    badge: 'Resort Wear',
    description: 'Effortless warm-weather tailoring featuring breathable European linen shirt, pleated tailored shorts, and hand-burnished leather loafers.',
    items: [products[45], products[49], products[84]],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'combo-4',
    title: 'The Maharani Royal Bridal Set',
    subtitle: 'Zardozi Banarasi Lehenga + Kundan Set + Velvet Potli',
    price: '₹48,999',
    originalPrice: '₹68,497',
    savings: 'Save ₹19,498',
    badge: 'Bridal Heritage',
    description: 'A magnificent bridal trousseau combination featuring the Banarasi Zardozi Lehenga, uncut Maharani Polki Kundan jewelry set, and hand-embroidered velvet potli bag.',
    items: [products[0], products[9], products[7]],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'The Art of Slow Fashion in a Fast World',
    excerpt: 'Why investing in fewer, better pieces is the most radical act of style — and sustainability.',
    category: 'Fashion',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Building a PWA for a Fashion House',
    excerpt: 'How we built an offline-first catalogue that stylists use on the go — without an app store.',
    category: 'Web Development',
    date: 'Jul 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'The English Countryside Palette',
    excerpt: 'How sage, forest, and linen became the defining colours of modern boutique design.',
    category: 'Fashion',
    date: 'Jun 20, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  },
];
