// Centralized Product Database — Saheer Paradise Export
// 4 Master Export Categories: Indian Spices, Agro Commodities, Machinery, Pipes

import biryaniMasala from '../assets/products/Biryani Masala.png';
import blackCardamom from '../assets/products/Black Cardamom.png';
import blackPepper from '../assets/products/Black Pepper.png';
import byadgiChilli from '../assets/products/Byadgi Chilli.png';
import cardamomPowder from '../assets/products/Cardamom Powder.png';
import chaatMasala from '../assets/products/Chaat Masala.png';
import chilliPowder from '../assets/products/Chilli Powder.png';
import cinnamonPowder from '../assets/products/Cinnamon Powder.png';
import cinnamonSticks from '../assets/products/Cinnamon Sticks.png';
import clovePowder from '../assets/products/Clove Powder.png';
import corianderPowder from '../assets/products/Coriander Powder.png';
import corianderSeeds from '../assets/products/Coriander Seeds.png';
import cuminPowder from '../assets/products/Cumin Powder.png';
import cuminSeeds from '../assets/products/Cumin Seeds.png';
import currySpiceMix from '../assets/products/Curry Spice Mix.png';
import dryGinger from '../assets/products/Dry Ginger.png';
import dryRedChilli from '../assets/products/Dry Red Chilli.png';
import fennelPowder from '../assets/products/Fennel Powder.png';
import fennelSeeds from '../assets/products/Fennel Seeds.png';
import garamMasala from '../assets/products/Garam Masala.png';
import gingerPowder from '../assets/products/Ginger Powder.png';
import greenCardamom from '../assets/products/Green Cardamom.png';
import greenPepper from '../assets/products/Green Pepper.png';
import gunturChilli from '../assets/products/Guntur Chilli.png';
import kashmiriChilli from '../assets/products/Kashmiri Chilli.png';
import kashmiriSaffron from '../assets/products/Kashmiri Saffron.png';
import kitchenKingMasala from '../assets/products/Kitchen King Masala.png';
import mace from '../assets/products/Mace.png';
import nutmegPowder from '../assets/products/Nutmeg Powder.png';
import nutmeg from '../assets/products/Nutmeg.png';
import saffronPowder from '../assets/products/Saffron Powder.png';
import turmericBulbs from '../assets/products/Turmeric Bulbs.png';
import turmericFingers from '../assets/products/Turmeric Fingers.png';
import turmericPowder from '../assets/products/Turmeric Powder.png';
import vanillaBeans from '../assets/products/Vanilla Beans.png';
import vanillaPowder from '../assets/products/Vanilla Powder.png';
import whitePepper from '../assets/products/White Pepper.png';
import wholeCloves from '../assets/products/Whole Cloves.png';

export const PRODUCT_CATEGORIES = [
  'Indian Spices',
  'Agro Commodities',
  'Machinery',
  'Pipes'
];

export const PRODUCTS = [
  // ==========================================
  // 1. INDIAN SPICES (Ground, Whole, Seed, Blended, Exotic)
  // ==========================================
  
  // --- Ground Spices ---
  {
    id: 'turmeric-powder',
    title: 'Turmeric Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09103020',
    image: turmericPowder,
    origin: 'Erode & Sangli, India',
    packaging: '25kg / 50kg PP Bags / Custom Vacuum',
    specs: 'Curcumin > 3.5% | Moisture < 10% | Sortex Cleaned',
    description: 'Golden-yellow turmeric powder milled from premium curcuma longa roots. Double-sifted for rich color, vibrant aroma, and high curcumin content.',
    desc: 'Golden-yellow turmeric powder milled from premium curcuma longa roots. Double-sifted for rich color and high curcumin content.',
    isFeatured: true
  },
  {
    id: 'chilli-powder',
    title: 'Red Chilli Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09042211',
    image: chilliPowder,
    origin: 'Guntur, Andhra Pradesh, India',
    packaging: '25kg Kraft Bags / Drums / PP Bags',
    specs: 'ASTA Color 80 - 120 | Pungency 25,000 - 40,000 SHU',
    description: 'Ultra-fine spicy red chilli powder ground from select Guntur chillies. Delivers an authentic deep red color and fiery pungent kick.',
    desc: 'Ultra-fine spicy red chilli powder ground from select Guntur chillies for authentic color and fiery heat.',
    isFeatured: true
  },
  {
    id: 'coriander-powder',
    title: 'Coriander Powder (Dhana)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09092200',
    image: corianderPowder,
    origin: 'Ramganj & Kota, Rajasthan, India',
    packaging: '25kg Multi-wall Paper / PP Bags',
    specs: 'Volatile Oil > 0.3% | Moisture < 8% | Fine Mesh',
    description: 'Freshly ground coriander powder milled from premium green coriander seeds with a pleasant citrus fragrance and warm earthy flavor.',
    desc: 'Freshly ground coriander powder milled from green seeds with pleasant citrus fragrance.',
    isFeatured: false
  },
  {
    id: 'cumin-powder',
    title: 'Cumin Powder (Jeera)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09093200',
    image: cuminPowder,
    origin: 'Unjha, Gujarat, India',
    packaging: '25kg PP Bags / Vacuum Bags',
    specs: 'Volatile Oil > 1.8% | Purity 99.5% | Mesh 40-60',
    description: 'High-aroma ground cumin seed powder processed under cool grinding technology to preserve delicate essential oils and earthy notes.',
    desc: 'High-aroma ground cumin seed powder processed under cool grinding technology.',
    isFeatured: true
  },
  {
    id: 'cardamom-powder',
    title: 'Green Cardamom Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09083200',
    image: cardamomPowder,
    origin: 'Idukki, Kerala, India',
    packaging: '10kg / 20kg Master Cartons with Foil Bags',
    specs: '100% Pure Cardamom | Volatile Oil > 4.5%',
    description: 'Finely ground green cardamom made from premium green pods. Captures sweet herbal aroma for gourmet confectionery and beverages.',
    desc: 'Finely ground green cardamom capturing sweet herbal aroma for gourmet cooking and beverages.',
    isFeatured: false
  },
  {
    id: 'cinnamon-powder',
    title: 'Cinnamon Powder (Dalchini)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09062000',
    image: cinnamonPowder,
    origin: 'Kerala & Tamil Nadu, India',
    packaging: '25kg Cartons / Drums',
    specs: 'Coumarin Low Grade | Moisture < 10%',
    description: 'Aromatic cinnamon powder with sweet woody notes, ideal for bakery, beverage mixes, and savory spice blends.',
    desc: 'Aromatic cinnamon powder with sweet woody notes, ideal for bakery and spice blends.',
    isFeatured: false
  },
  {
    id: 'clove-powder',
    title: 'Clove Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09072000',
    image: clovePowder,
    origin: 'South India',
    packaging: '15kg / 25kg Drums',
    specs: 'Eugenol Content > 15% | High Pungency',
    description: 'Intensely fragrant ground whole cloves rich in natural essential oil (Eugenol) for industrial food processing and spice formulation.',
    desc: 'Intensely fragrant ground whole cloves rich in natural essential oil (Eugenol).',
    isFeatured: false
  },
  {
    id: 'ginger-powder',
    title: 'Dry Ginger Powder (Sonth)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09101210',
    image: gingerPowder,
    origin: 'Cochin, Kerala, India',
    packaging: '25kg Paper / PP Bags',
    specs: 'Gingerol > 2.0% | Pungency High | Moisture < 9%',
    description: 'Sun-dried ginger root powder known for crisp sharpness and warming flavor. Non-bleached export grade.',
    desc: 'Sun-dried ginger root powder known for crisp sharpness and warming flavor.',
    isFeatured: true
  },
  {
    id: 'fennel-powder',
    title: 'Fennel Powder (Saunf)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09096200',
    image: fennelPowder,
    origin: 'Gujarat & Rajasthan, India',
    packaging: '25kg PP Bags',
    specs: 'Sweet Green Grade | Volatile Oil > 1.2%',
    description: 'Sweet, fragrant ground fennel powder made from selected green fennel seeds.',
    desc: 'Sweet, fragrant ground fennel powder made from selected green fennel seeds.',
    isFeatured: false
  },
  {
    id: 'nutmeg-powder',
    title: 'Nutmeg Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Ground Spices',
    hsCode: 'HS 09081200',
    image: nutmegPowder,
    origin: 'Kerala, India',
    packaging: '20kg Fiber Drums',
    specs: 'Pure Ground Nutmeg Kernel | Oil > 6.0%',
    description: 'Warm and sweet nutmeg powder milled from whole sound nutmeg kernels.',
    desc: 'Warm and sweet nutmeg powder milled from whole sound nutmeg kernels.',
    isFeatured: false
  },
  {
    id: 'saffron-powder',
    title: 'Pure Saffron Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Exotic & Premium',
    hsCode: 'HS 09102020',
    image: saffronPowder,
    origin: 'Pampore, Kashmir, India',
    packaging: '100g / 500g / 1kg Airtight Metal Tins',
    specs: 'Crocin > 220 | Safranal > 30 | Grade 1 Pure',
    description: 'Ultra-luxurious Kashmiri saffron powder pulverized from pure red stigmas, offering supreme natural aroma and golden color tint.',
    desc: 'Ultra-luxurious Kashmiri saffron powder pulverized from pure red stigmas.',
    isFeatured: true
  },
  {
    id: 'vanilla-powder',
    title: 'Natural Vanilla Powder',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Exotic & Premium',
    hsCode: 'HS 09052000',
    image: vanillaPowder,
    origin: 'Kerala & Karnataka, India',
    packaging: '5kg / 10kg Vacuum Bags in Drums',
    specs: 'Vanillin > 1.8% | 100% Pure Vanilla Pod',
    description: 'Pure ground vanilla bean powder with rich cream caramel aroma, sugar-free and additive-free.',
    desc: 'Pure ground vanilla bean powder with rich cream caramel aroma.',
    isFeatured: false
  },

  // --- Whole Spices ---
  {
    id: 'black-pepper',
    title: 'Black Pepper Berries (Tellicherry / MG1)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09041110',
    image: blackPepper,
    origin: 'Idukki & Wayanad, Kerala, India',
    packaging: '25kg / 50kg Jute / PP Bags',
    specs: 'Bulk Density 550 - 580 g/l | Piperine > 4.0%',
    description: 'Extra bold sun-dried black peppercorns from Malabar coast with intense bite, dark color, and high essential oil content.',
    desc: 'Extra bold sun-dried black peppercorns with intense bite and high essential oil content.',
    isFeatured: true
  },
  {
    id: 'green-cardamom',
    title: 'Green Cardamom (8mm Extra Bold)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09083110',
    image: greenCardamom,
    origin: 'Wayanad & Idukki, Kerala, India',
    packaging: '10kg Master Cartons with inner poly bags',
    specs: 'Size 8mm+ Extra Bold | Deep Green Color | Oil > 6.0%',
    description: 'Handpicked extra bold green cardamom pods loaded with aromatic sweet essential oil.',
    desc: 'Handpicked extra bold green cardamom pods loaded with aromatic sweet essential oil.',
    isFeatured: true
  },
  {
    id: 'black-cardamom',
    title: 'Black Cardamom (Badi Elaichi)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09083120',
    image: blackCardamom,
    origin: 'Sikkim & West Bengal, India',
    packaging: '25kg Jute / PP Bags',
    specs: 'Smoky Camphorous Aroma | Moisture < 11%',
    description: 'Large dark brown pods with deep smoky aroma and medicinal value, sun and kiln dried.',
    desc: 'Large dark brown pods with deep smoky aroma, sun and kiln dried.',
    isFeatured: false
  },
  {
    id: 'cinnamon-sticks',
    title: 'Cinnamon Sticks & Quills (Dalchini)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09061100',
    image: cinnamonSticks,
    origin: 'Kerala & Tamil Nadu, India',
    packaging: '25kg Cartons / Bales',
    specs: 'Roll Length 8-10cm | Moisture < 12%',
    description: 'Hand-rolled cinnamon sticks and cut quills with sweet fragrance for culinary and extract industry.',
    desc: 'Hand-rolled cinnamon sticks with sweet fragrance for culinary exports.',
    isFeatured: false
  },
  {
    id: 'whole-cloves',
    title: 'Whole Cloves (Laving)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09071000',
    image: wholeCloves,
    origin: 'Kanyakumari, Tamil Nadu, India',
    packaging: '10kg / 25kg Cartons',
    specs: 'Head Count > 95% | Volatile Oil > 17%',
    description: 'Hand-picked aromatic whole cloves with dark reddish-brown color, fully intact crown heads, and high oil content.',
    desc: 'Hand-picked whole cloves with dark reddish-brown color and fully intact heads.',
    isFeatured: true
  },
  {
    id: 'dry-ginger',
    title: 'Dry Ginger Whole (Cochin Grade)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09101110',
    image: dryGinger,
    origin: 'Cochin, Kerala, India',
    packaging: '25kg Jute Bags',
    specs: 'Unbleached Clean | Moisture < 10%',
    description: 'Sun-dried whole ginger rhizomes from Cochin, featuring pungent bite and citrus notes.',
    desc: 'Sun-dried whole ginger rhizomes featuring pungent bite and citrus notes.',
    isFeatured: false
  },
  {
    id: 'dry-red-chilli',
    title: 'Dry Red Chilli Whole (Stemless / With Stem)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09042110',
    image: dryRedChilli,
    origin: 'Guntur, Andhra Pradesh, India',
    packaging: '25kg / 50kg Press Bales / PP Bags',
    specs: 'Moisture < 10% | Foreign Matter < 1%',
    description: 'Sun-dried whole red chillies sortex cleaned for high heat and color extraction.',
    desc: 'Sun-dried whole red chillies sortex cleaned for high heat and color extraction.',
    isFeatured: false
  },
  {
    id: 'byadgi-chilli',
    title: 'Byadgi Chilli Whole (Deep Red ASTA)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09042120',
    image: byadgiChilli,
    origin: 'Karnataka, India',
    packaging: '25kg Jute / PP Bags',
    specs: 'ASTA Color 130 - 160 | Mild Pungency',
    description: 'Wrinkled long red chilli renowned worldwide for extraordinary deep red oleoresin color with mild heat.',
    desc: 'Wrinkled long red chilli renowned for extraordinary deep red color with mild heat.',
    isFeatured: true
  },
  {
    id: 'guntur-chilli',
    title: 'Guntur S17 / Teja Red Chilli',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09042110',
    image: gunturChilli,
    origin: 'Guntur, Andhra Pradesh, India',
    packaging: '25kg / 50kg Bags',
    specs: 'Pungency 45,000+ SHU | High Capsaicin',
    description: 'Pungent whole red chillies packed with fiery capsaicin heat, favored by global food manufacturers.',
    desc: 'Pungent whole red chillies packed with fiery capsaicin heat.',
    isFeatured: false
  },
  {
    id: 'kashmiri-chilli',
    title: 'Kashmiri Red Chilli Whole',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09042110',
    image: kashmiriChilli,
    origin: 'Kashmir / Himachal, India',
    packaging: '15kg / 25kg Bags',
    specs: 'Rich Red Color | Low SHU Pungency',
    description: 'Famous bright crimson red chilli with mild heat, perfect for vibrant culinary presentations.',
    desc: 'Famous bright crimson red chilli with mild heat, perfect for rich food presentation.',
    isFeatured: true
  },
  {
    id: 'green-pepper',
    title: 'Green Peppercorns (Dehydrated / Brine)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09041120',
    image: greenPepper,
    origin: 'Kerala, India',
    packaging: '10kg / 25kg Drums',
    specs: 'Retained Natural Green Tint | Moisture < 8%',
    description: 'Freshly harvested tender green peppercorns dehydrated to retain lively green color and fresh bite.',
    desc: 'Freshly harvested green peppercorns dehydrated to retain lively green color.',
    isFeatured: false
  },
  {
    id: 'white-pepper',
    title: 'White Peppercorns Whole',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09041130',
    image: whitePepper,
    origin: 'Kerala, India',
    packaging: '25kg Bags',
    specs: 'Density 580 g/l | Purity 99.5%',
    description: 'Decorticated fully ripe black pepper berries producing creamy off-white peppercorns with refined aroma.',
    desc: 'Fully ripe black pepper berries producing creamy off-white peppercorns with subtle warmth.',
    isFeatured: false
  },
  {
    id: 'nutmeg-whole',
    title: 'Nutmeg Whole with Shell / Shell-less',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09081110',
    image: nutmeg,
    origin: 'Kerala, India',
    packaging: '25kg Jute Bags',
    specs: 'ABCD Quality | Sound Whole Kernels',
    description: 'Whole aromatic nutmeg nuts harvested from selected Kerala orchards, sortex inspected.',
    desc: 'Whole aromatic nutmeg nuts harvested from selected Kerala orchards.',
    isFeatured: false
  },
  {
    id: 'mace-blades',
    title: 'Mace Whole Blades (Javitri)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09082100',
    image: mace,
    origin: 'Kerala, India',
    packaging: '10kg Master Cartons',
    specs: 'Golden Red Aril Blades | High Volatile Oil',
    description: 'Lacy golden-red dried arils surrounding nutmeg nut, possessing delicate sweet camphorous aroma.',
    desc: 'Lacy golden-red dried arils with delicate sweet camphorous aroma.',
    isFeatured: false
  },
  {
    id: 'turmeric-bulbs',
    title: 'Turmeric Bulbs Whole',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09103010',
    image: turmericBulbs,
    origin: 'Sangli & Nizamabad, India',
    packaging: '50kg Jute / PP Bags',
    specs: 'High Density Mother Bulbs | Curcumin > 3.0%',
    description: 'Robust mother turmeric bulbs cleaned, boiled, and sun-cured for grinding and extract industries.',
    desc: 'Robust mother turmeric bulbs cleaned, boiled, and sun-cured for industrial grinding.',
    isFeatured: false
  },
  {
    id: 'turmeric-fingers',
    title: 'Turmeric Fingers (Erode / Nizamabad)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Whole Spices',
    hsCode: 'HS 09103010',
    image: turmericFingers,
    origin: 'Erode & Nizamabad, India',
    packaging: '25kg / 50kg Jute / PP Bags',
    specs: 'Double Polished | Curcumin > 3.5%',
    description: 'Deep orange-yellow polished whole turmeric finger roots, hard cured with high curcumin purity.',
    desc: 'Deep orange-yellow polished whole turmeric finger roots with high curcumin purity.',
    isFeatured: true
  },

  // --- Seed Spices ---
  {
    id: 'cumin-seeds',
    title: 'Cumin Seeds (Jeera - Singapore 99% / 99.5%)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09093120',
    image: cuminSeeds,
    origin: 'Unjha, Gujarat & Rajasthan, India',
    packaging: '25kg / 50kg PP Woven Bags',
    specs: 'Purity 99.5% Sortex | Moisture < 8% | Foreign Matter < 0.5%',
    description: 'Machine cleaned and Sortex graded cumin seeds with rich aroma, ideal for bulk spice import.',
    desc: 'Machine cleaned and Sortex graded cumin seeds with rich aroma for global trade.',
    isFeatured: true
  },
  {
    id: 'coriander-seeds',
    title: 'Coriander Seeds (Eagle / Badami / Scoop)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09092110',
    image: corianderSeeds,
    origin: 'Kota, Rajasthan & MP, India',
    packaging: '25kg / 40kg PP Bags',
    specs: 'Purity 99.0% | Greenish Golden | Moisture < 8%',
    description: 'Bold coriander seeds with distinct citrus scent, thoroughly cleaned and color sorted.',
    desc: 'Bold coriander seeds with distinct citrus scent, thoroughly cleaned and color sorted.',
    isFeatured: true
  },
  {
    id: 'fennel-seeds',
    title: 'Fennel Seeds (Saunf - Green Lucknowi & Bold)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Seed Spices',
    hsCode: 'HS 09096110',
    image: fennelSeeds,
    origin: 'Unjha, Gujarat, India',
    packaging: '25kg / 50kg Bags',
    specs: 'Green Sortex Quality 99.5% | Anethole Oil > 1.5%',
    description: 'Aromatic whole green fennel seeds with sweet taste, sortex cleaned for retail and export.',
    desc: 'Aromatic whole green fennel seeds with sweet taste, sortex cleaned for export.',
    isFeatured: true
  },

  // --- Blended Spices ---
  {
    id: 'garam-masala',
    title: 'Royal Garam Masala Blend',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Blended Spices',
    hsCode: 'HS 09109100',
    image: garamMasala,
    origin: 'India',
    packaging: '25kg Drums / Custom Pouches',
    specs: '100% Pure Spice Mix | No Preservatives',
    description: 'Authentic Indian spice blend featuring ground cardamom, cloves, cinnamon, cumin, and nutmeg in rich balance.',
    desc: 'Authentic Indian spice blend featuring ground cardamom, cloves, cinnamon, cumin, and nutmeg.',
    isFeatured: true
  },
  {
    id: 'chaat-masala',
    title: 'Tangy Chaat Masala Blend',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Blended Spices',
    hsCode: 'HS 09109100',
    image: chaatMasala,
    origin: 'India',
    packaging: '25kg Bags / OEM Boxes',
    specs: 'Zesty Tangy Flavor | Food Grade Packaging',
    description: 'Savory and tangy seasoning mix combining dry mango powder, black salt, cumin, and asafoetida.',
    desc: 'Savory and tangy seasoning mix combining dry mango powder, black salt, and cumin.',
    isFeatured: false
  },
  {
    id: 'biryani-masala',
    title: 'Hyderabadi Biryani Spice Blend',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Blended Spices',
    hsCode: 'HS 09109100',
    image: biryaniMasala,
    origin: 'India',
    packaging: '25kg Drums / Private Label',
    specs: 'Aromatic Gourmet Grade | Secret Heritage Recipe',
    description: 'Regal spice blend crafted specifically for authentic rice and meat biryani formulations.',
    desc: 'Regal spice blend crafted specifically for authentic rice and meat biryani formulations.',
    isFeatured: true
  },
  {
    id: 'kitchen-king-masala',
    title: 'Kitchen King All-Purpose Curry Spice',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Blended Spices',
    hsCode: 'HS 09109100',
    image: kitchenKingMasala,
    origin: 'India',
    packaging: '25kg PP Bags / Custom Boxes',
    specs: 'Multi-purpose Curry Powder | Export Grade',
    description: 'Versatile Indian curry spice mix combining turmeric, coriander, cumin, ginger, and garlic for master chefs.',
    desc: 'Versatile Indian curry spice mix combining turmeric, coriander, cumin, ginger, and garlic.',
    isFeatured: false
  },
  {
    id: 'curry-spice-mix',
    title: 'Madras Curry Powder Blend (Mild / Hot)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Blended Spices',
    hsCode: 'HS 09109100',
    image: currySpiceMix,
    origin: 'India',
    packaging: '25kg Fiber Drums / Poly Bags',
    specs: 'Export Grade Madras Formulation',
    description: 'Globally popular curry powder blend formulated for industrial food processing and international retail.',
    desc: 'Globally popular curry powder blend formulated for international retail and food trade.',
    isFeatured: true
  },

  // --- Exotic & Premium ---
  {
    id: 'kashmiri-saffron',
    title: 'Kashmiri Saffron (Mongra Grade 1)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Exotic & Premium',
    hsCode: 'HS 09102010',
    image: kashmiriSaffron,
    origin: 'Pampore, Kashmir, India',
    packaging: '10g / 50g / 100g / 1kg Sealed Acrylic Tins',
    specs: 'All Red Mongra Stigmas | Crocin > 240',
    description: 'The world\'s most prized spice. 100% pure Kashmiri Mongra saffron stigmas with intense floral aroma and deep red hue.',
    desc: '100% pure Kashmiri Mongra saffron stigmas with intense floral aroma and deep red hue.',
    isFeatured: true
  },
  {
    id: 'vanilla-beans',
    title: 'Whole Vanilla Beans (Gourmet Grade A)',
    category: 'Indian Spices',
    cat: 'Indian Spices',
    subcategory: 'Exotic & Premium',
    hsCode: 'HS 09051000',
    image: vanillaBeans,
    origin: 'Kerala & Karnataka, India',
    packaging: '1kg Vacuum Packs in Master Cartons',
    specs: 'Length 16-18cm | Moisture 30-35% | Vanillin > 2.0%',
    description: 'Plump, oily Gourmet Grade A vanilla pods loaded with sweet caviar seeds for luxury pastry and extract crafting.',
    desc: 'Plump, oily Gourmet Grade A vanilla pods loaded with sweet caviar seeds.',
    isFeatured: true
  },

  // ==========================================
  // 2. AGRO COMMODITIES (Grains, Pulses, Seeds, Oilseeds)
  // ==========================================
  {
    id: 'basmati-rice-1121',
    title: '1121 Steam Basmati Rice (Extra Long Grain)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Rice & Grains',
    hsCode: 'HS 10063020',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    origin: 'Punjab & Haryana, India',
    packaging: '10kg / 25kg / 50kg Non-Woven & BOPP Bags',
    specs: 'Average Grain Length: 8.35mm+ | Moisture < 12.5% | Purity 95%',
    description: 'Finest quality Indian 1121 Extra Long Grain Steam Basmati Rice. Renowned for exquisite aroma, elongation up to 2.5x upon cooking, and non-sticky texture.',
    desc: 'Finest Indian 1121 extra long grain steam basmati rice with exceptional elongation and royal aroma.',
    isFeatured: true
  },
  {
    id: 'sharbati-wheat-grain',
    title: 'Sharbati MP Milling Wheat Grains',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Rice & Grains',
    hsCode: 'HS 10019910',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    origin: 'Madhya Pradesh & Punjab, India',
    packaging: '50kg Jute / PP Bags / Bulk Container Liner',
    specs: 'Protein > 12.5% | Moisture < 11% | Sortex Cleaned 99.5%',
    description: 'Golden-amber Sharbati wheat grains from the fertile black soils of MP. High gluten strength, sortex cleaned for flour milling and bakery exports.',
    desc: 'Golden-amber Sharbati wheat grains with high protein and gluten strength for milling.',
    isFeatured: true
  },
  {
    id: 'organic-non-gmo-soybeans',
    title: 'Organic Non-GMO Soybeans & Soya Meal',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Oilseeds & Meals',
    hsCode: 'HS 12019000',
    image: 'https://images.unsplash.com/photo-1599307767316-776533dae5d8?auto=format&fit=crop&w=800&q=80',
    origin: 'Madhya Pradesh & Maharashtra, India',
    packaging: '50kg PP Bags / 1 MT Jumbo Bags',
    specs: 'Protein 38-40% | Oil 18-20% | Moisture < 10% | Non-GMO Certified',
    description: 'Certified Organic Non-GMO yellow soybeans sortex cleaned for human food processing (tofu, soymilk) and high-protein animal feed manufacturing.',
    desc: 'Certified Organic Non-GMO yellow soybeans with high protein content for food processing and feed.',
    isFeatured: true
  },
  {
    id: 'bold-peanuts-groundnuts',
    title: 'Indian Bold & Java Peanuts (Groundnuts)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Oilseeds & Meals',
    hsCode: 'HS 12024210',
    image: 'https://images.unsplash.com/photo-1567892324421-140b2a3d7265?auto=format&fit=crop&w=800&q=80',
    origin: 'Saurashtra, Gujarat, India',
    packaging: '25kg / 50kg Vacuum Jute Bags',
    specs: 'Counts: 38/42, 40/50, 50/60 | Aflatoxin < 4 PPB | Moisture < 7%',
    description: 'Crisp, sweet Indian peanuts shelled and machine graded in Saurashtra. Low aflatoxin guarantee, Sortex sorted for confectionery and peanut butter making.',
    desc: 'Export grade bold and java peanuts with low aflatoxin guarantee for peanut butter and snacks.',
    isFeatured: true
  },
  {
    id: 'white-chickpeas-kabuli',
    title: 'Kabuli Chickpeas (White Garbanzo Beans 8mm / 9mm)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Pulses & Legumes',
    hsCode: 'HS 07132000',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    origin: 'Indore, Madhya Pradesh, India',
    packaging: '25kg / 50kg Multi-wall PP Bags',
    specs: 'Count: 40/42, 42/44 (8-9mm) | Purity 99.5% | Moisture < 10%',
    description: 'Extra bold creamy-white Kabuli chickpeas with smooth skin and high nutritional value. Machine graded and free from weevils.',
    desc: 'Extra bold creamy-white Kabuli chickpeas (8-9mm) sortex cleaned for canning and hummus.',
    isFeatured: true
  },
  {
    id: 'natural-white-sesame-seeds',
    title: 'Natural White Sesame Seeds (Sortex 99.95%)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Oilseeds & Meals',
    hsCode: 'HS 12074090',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat & Rajasthan, India',
    packaging: '25kg / 50kg Paper / PP Bags with inner liner',
    specs: 'Purity 99.95% | Oil Content > 48% | FFA < 1.5%',
    description: 'High-purity Sortex cleaned Natural White Sesame Seeds with high oil content and pleasant nutty flavor for bakery and tahini production.',
    desc: 'High-purity Sortex cleaned natural white sesame seeds with 99.95% purity for baking and tahini.',
    isFeatured: true
  },
  {
    id: 'yellow-mustard-seeds',
    title: 'Yellow Mustard Seeds (Sarson)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Oilseeds & Meals',
    hsCode: 'HS 12075000',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    origin: 'Rajasthan & Haryana, India',
    packaging: '25kg / 50kg PP Bags',
    specs: 'Purity 99.0% | Oil > 38% | Moisture < 8%',
    description: 'Bright yellow whole mustard seeds with sharp pungency and mild sweet aroma. Ideal for condiment production, pickling, and oil extraction.',
    desc: 'Bright yellow whole mustard seeds with sharp pungency for condiments and oil extraction.',
    isFeatured: false
  },
  {
    id: 'green-millet-bajra',
    title: 'Green Millet Grains (Pearl Millet / Bajra)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Rice & Grains',
    hsCode: 'HS 10082100',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat & Rajasthan, India',
    packaging: '25kg / 50kg PP Woven Bags',
    specs: 'Machine Cleaned / Sortex | Moisture < 11% | Green Color Grade 1',
    description: 'Nutrient-dense green pearl millet grains rich in iron, zinc, and dietary fiber. Exported widely for bird feed and health food industries.',
    desc: 'Nutrient-dense green pearl millet grains sortex cleaned for health foods and bird feed.',
    isFeatured: false
  },
  {
    id: 'yellow-maize-corn',
    title: 'Yellow Corn / Maize (Food & Feed Grade)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Rice & Grains',
    hsCode: 'HS 10059000',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    origin: 'Bihar & Karnataka, India',
    packaging: '50kg PP Bags / Bulk Containers',
    specs: 'Moisture < 13.5% | Broken < 3% | Aflatoxin < 20 PPB',
    description: 'Clean bright yellow maize kernels with high starch content, low moisture, and verified phytosanitary standards for livestock feed and starch processing.',
    desc: 'Clean yellow maize corn kernels with high starch and low moisture for feed and starch.',
    isFeatured: true
  },
  {
    id: 'red-lentils-masoor',
    title: 'Red Lentils Whole & Split (Masoor Dal)',
    category: 'Agro Commodities',
    cat: 'Agro Commodities',
    subcategory: 'Pulses & Legumes',
    hsCode: 'HS 07134000',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    origin: 'Madhya Pradesh & UP, India',
    packaging: '25kg / 50kg PP Bags',
    specs: 'Sortex Cleaned 99.5% | Moisture < 10% | Oil/Water Polished',
    description: 'Premium de-husked and split football red lentils with high protein and quick cooking properties for global kitchen exports.',
    desc: 'Premium split red lentils sortex cleaned for international pulse markets.',
    isFeatured: false
  },

  // ==========================================
  // 3. MACHINERY (Agro-Processing, Sorters, Packaging)
  // ==========================================
  {
    id: 'sortex-color-sorter-machine',
    title: 'AI Optical RGB Color Sorter Machine (Grains & Spices)',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Processing Machinery',
    hsCode: 'HS 84371000',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India',
    packaging: 'Export Seaworthy Wooden Crate Packaging',
    specs: 'Capacity: 1 - 6 Tons/Hr | High-Res 5400 Pixel CCD | Accuracy > 99.9%',
    description: 'State-of-the-art optical color sorter equipped with full-color HD cameras, deep learning AI recognition, and ultra-fast ejectors for seeds, rice, pulses, and spices.',
    desc: 'Full-color CCD AI optical color sorter for precision sorting of grains, seeds, and spices.',
    isFeatured: true
  },
  {
    id: 'automatic-spice-pulverizer',
    title: 'Commercial Stainless Steel Spice Grinder & Pulverizer',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Processing Machinery',
    hsCode: 'HS 84378010',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    origin: 'Rajkot, Gujarat, India',
    packaging: 'Heavy-Duty Reinforced Wooden Case',
    specs: 'Motor: 10HP - 50HP | Fineness: 40 - 200 Mesh | SS304 Food Grade',
    description: 'Industrial heavy-duty continuous cool-grinding hammer mill pulverizer with cyclone separator and dust collector for grinding turmeric, chillies, and grains without losing aroma.',
    desc: 'Heavy-duty commercial cool-grinding spice pulverizer with cyclone dust collection.',
    isFeatured: true
  },
  {
    id: 'multihead-pouch-packing-machine',
    title: 'Automatic Multi-Head Weigher Pouch Packing Machine',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Packaging Equipment',
    hsCode: 'HS 84223000',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    origin: 'Ahmedabad, Gujarat, India',
    packaging: 'Export Standard Fumigated Wooden Pallet Crate',
    specs: 'Speed: 40-80 Bags/Min | Weighing Range: 50g - 2000g | PLC Touch Screen',
    description: 'High-speed VFFS packaging machine with 10/14-head combination multi-head electronic weighers for granules, snacks, spices, grains, and dry fruits.',
    desc: 'High-speed VFFS vertical packaging machine with multi-head weighers for grains and spices.',
    isFeatured: true
  },
  {
    id: 'seed-gravity-separator',
    title: 'High-Capacity Seed Cleaning & Gravity Separator Table',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Processing Machinery',
    hsCode: 'HS 84371000',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    origin: 'Punjab, India',
    packaging: 'Heavy Steel Frame Wooden Box',
    specs: 'Deck Area: 3.5m² | Capacity: 3 - 5 Tons/Hr | Blower Speed Control',
    description: 'Precision specific gravity separator for removing light impurities, shriveled grains, and immature seeds from sesame, cumin, wheat, and pulses.',
    desc: 'Precision specific gravity table separator for seed and grain grading.',
    isFeatured: false
  },
  {
    id: 'tractor-rotary-tiller-rotavator',
    title: 'Heavy Duty Agricultural Rotary Tiller / Rotavator',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Agro Machinery',
    hsCode: 'HS 84322990',
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=800&q=80',
    origin: 'Rajkot, Gujarat, India',
    packaging: 'Steel Pallet Framework with Protective Cover',
    specs: 'Working Width: 5ft - 8ft | Gear Drive | Boron Steel L-Type Blades',
    description: 'Tractor-drawn rotary tiller designed for tough soil seedbed preparation, paddy puddling, and crop residue incorporation with multi-speed gearbox.',
    desc: 'Tractor-drawn heavy duty rotavator with boron steel blades for agricultural soil tilling.',
    isFeatured: true
  },
  {
    id: 'industrial-grain-dryer',
    title: 'Continuous Flow Industrial Grain & Seed Dryer',
    category: 'Machinery',
    cat: 'Machinery',
    subcategory: 'Agro Machinery',
    hsCode: 'HS 84193100',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    origin: 'Maharashtra, India',
    packaging: 'Containerized Component Shipping',
    specs: 'Moisture Reduction: 5% per pass | Capacity: 10 - 50 Tons/Batch',
    description: 'Automated recirculating batch grain dryer for paddy, wheat, maize, and oilseeds with diesel/biomass furnace and uniform heat circulation.',
    desc: 'Automated recirculating grain dryer for paddy, corn, and seed moisture reduction.',
    isFeatured: false
  },

  // ==========================================
  // 4. PIPES (Stainless Steel, Carbon Steel, HDPE, PVC, Irrigation)
  // ==========================================
  {
    id: 'ss304-ss316-seamless-pipes',
    title: 'Stainless Steel Seamless Pipes & Tubes (SS304 / SS316L)',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Stainless Steel Pipes',
    hsCode: 'HS 73044100',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India',
    packaging: 'Bundled with Plastic End Caps / Wooden Cases',
    specs: 'OD: 1/2" to 24" | Wall Thickness: Sch 10 - Sch XXS | ASTM A312 / ASME SA312',
    description: 'Corrosion-resistant cold drawn and annealed stainless steel seamless pipes manufactured for oil & gas, chemical, food processing, and marine applications.',
    desc: 'High-precision austenitic stainless steel seamless pipes for chemical, energy, and food industries.',
    isFeatured: true
  },
  {
    id: 'carbon-steel-erw-lsaw-pipes',
    title: 'ERW & LSAW Carbon Steel Industrial Pipes (API 5L / ASTM A53)',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Carbon Steel Pipes',
    hsCode: 'HS 73063000',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat & Maharashtra, India',
    packaging: 'Hexagonal Bundles / Beveled Ends with Varnish Coating',
    specs: 'OD: 2" to 48" | Grade: API 5L Grade B, X42, X52, X65 | Hydrostatic Tested',
    description: 'Heavy wall high-pressure carbon steel line pipes for oil transmission, water pipeline projects, structural piling, and industrial fabrication.',
    desc: 'Heavy carbon steel ERW/LSAW line pipes for pipeline transport, construction, and water works.',
    isFeatured: true
  },
  {
    id: 'hdpe-agricultural-water-pipes',
    title: 'High-Density Polyethylene (HDPE) Pipes (PE100 / PN16)',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Plastic & Polymer Pipes',
    hsCode: 'HS 39172110',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India',
    packaging: 'Coils (20mm - 110mm) / 6m-12m Straight Lengths',
    specs: 'Pressure: PN6 to PN25 | ISO 4427 / IS 4984 Certified | 100% Virgin Polymer',
    description: 'UV-stabilized, leak-proof HDPE pressure pipes resistant to soil chemicals and ground movement. Ideal for potable water distribution, mining, and agriculture.',
    desc: 'UV-stabilized virgin PE100 HDPE pipes for potable water distribution and agricultural irrigation.',
    isFeatured: true
  },
  {
    id: 'upvc-cpvc-plumbing-pipes',
    title: 'UPVC & CPVC High Pressure Plumbing & Drainage Pipes',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Plastic & Polymer Pipes',
    hsCode: 'HS 39172310',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    origin: 'Ahmedabad, Gujarat, India',
    packaging: 'Standard Bundles wrapped in Heavy HDPE Fabric',
    specs: 'Sizes: 1/2" to 12" | Schedule 40 & 80 | ASTM D1785 / ASTM F441',
    description: 'Lead-free, non-corrosive UPVC & CPVC pipes engineered for hot and cold water plumbing, residential construction, and industrial chemical drainage.',
    desc: 'Lead-free high-pressure UPVC and CPVC pipes for residential plumbing and industrial drainage.',
    isFeatured: false
  },
  {
    id: 'gi-casing-water-pipes',
    title: 'Galvanized Iron (GI) Casing & Water Transmission Pipes',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Steel Pipes',
    hsCode: 'HS 73063090',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    origin: 'Gujarat, India',
    packaging: 'Bundled with Thread Protectors',
    specs: 'Zinc Coating: 360 - 550 g/m² | IS 1239 / BS 1387 Class A, B, C',
    description: 'Hot-dip galvanized carbon steel pipes with uniform zinc coating for rust prevention in borewells, water transmission, and outdoor fire protection systems.',
    desc: 'Hot-dip galvanized iron casing and water pipes with anti-rust zinc coating.',
    isFeatured: true
  },
  {
    id: 'drip-irrigation-lateral-pipes',
    title: 'Agricultural Drip Irrigation Lateral & Micro-Tubing Pipes',
    category: 'Pipes',
    cat: 'Pipes',
    subcategory: 'Irrigation Pipes',
    hsCode: 'HS 39173290',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    origin: 'Rajkot, Gujarat, India',
    packaging: 'Rolls of 400m / 500m in protective shrink film',
    specs: 'Diameter: 12mm, 16mm, 20mm | Class 1 & 2 | UV Stabilized',
    description: 'Precision cylindrical and flat dripper emitter lateral pipes engineered for uniform water discharge in commercial orchards, greenhouses, and row crops.',
    desc: 'UV-stabilized precision drip irrigation lateral pipes for efficient water management in farms.',
    isFeatured: true
  }
];

// Helper utilities for filtering
export function getProductsByCategory(category = 'All') {
  if (!category || category === 'All') return PRODUCTS;
  return PRODUCTS.filter(p => {
    const cat = p.category || p.cat || '';
    const subcat = p.subcategory || '';
    return cat.toLowerCase() === category.toLowerCase() || 
           subcat.toLowerCase() === category.toLowerCase();
  });
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.isFeatured);
}

export function searchProducts(query = '', category = 'All') {
  const list = getProductsByCategory(category);
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(p => 
    (p.title && p.title.toLowerCase().includes(q)) ||
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.origin && p.origin.toLowerCase().includes(q)) ||
    (p.hsCode && p.hsCode.toLowerCase().includes(q)) ||
    (p.category && p.category.toLowerCase().includes(q)) ||
    (p.subcategory && p.subcategory.toLowerCase().includes(q))
  );
}
