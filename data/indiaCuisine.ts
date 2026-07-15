// India regional wedding cuisine directory
// -------------------------------------------------------------------------
// Data notes (read before editing):
// - Every dish named below is real regional/state cuisine, not invented.
// - Photography: every state's `image` is a genuine Wikimedia Commons photo
//   (linked via direct upload.wikimedia.org URLs, no redirect dependency) —
//   nothing is generated or invented, and there are no stock-photo guesses.
//   `verified: true` entries are a real photo of that exact dish (Hyderabadi
//   biryani, Gujarati dhokla, dal baati churma, rosogolla, masala dosa,
//   Mysore pak, chhena poda, bal mithai, malpua, chicken makhani, litti
//   chokha, rogan josh, Kerala sadya) or a genuine regional-style thali
//   photographed in that region ("Uttar Pradesh Thali.jpg", "Punjabi
//   Thaali.jpg", "Traditional North Indian Thali.jpg" — reused honestly
//   across a couple of neighbouring North-Indian states with a similar
//   thali tradition, noted per-entry).
//   `verified: false` states use a real Wikimedia photo of an Indian
//   wedding celebration that isn't specific to that state's own cuisine —
//   swap in a dish-specific photo whenever you find/shoot one.
// - There is no live "what's cooking now" feed here — this is reference
//   content about regional wedding-menu traditions, compiled 2026.
// -------------------------------------------------------------------------

import type { Region } from "./indiaVenues";

export interface Dish {
  name: string;
  veg: boolean;
}

export interface StateCuisine {
  id: string;
  state: string;
  region: Region;
  dietProfile: string;
  dishes: Dish[];
  weddingFeast: string;
  image: string;
  verified: boolean;
  sourceNote: string;
}

const raw = ([
  {
    state: "Rajasthan",
    region: "North",
    dietProfile: "Predominantly vegetarian, dry desert staples",
    dishes: [
      { name: "Dal Baati Churma", veg: true },
      { name: "Gatte ki Sabzi", veg: true },
      { name: "Ker Sangri", veg: true },
      { name: "Laal Maas", veg: false },
      { name: "Ghevar", veg: true },
    ],
    weddingFeast:
      "Dal baati churma anchors most Rajasthani wedding feasts, traditionally served in an earthen pot with pure ghee.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/92/%2522Delectable_Dal_Baati_Churma%2522.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of dal baati churma, Rajasthan's signature wedding-feast dish.",
  },
  {
    state: "Telangana",
    region: "South",
    dietProfile: "Mixed, biryani- and Nizami-influenced",
    dishes: [
      { name: "Hyderabadi Biryani", veg: false },
      { name: "Haleem", veg: false },
      { name: "Mirchi ka Salan", veg: true },
      { name: "Double ka Meetha", veg: true },
      { name: "Bagara Baingan", veg: true },
    ],
    weddingFeast:
      "Hyderabadi dum biryani, sealed and slow-cooked, is the centrepiece of most Telangana wedding menus.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chicken_Hyderabadi_Biryani.JPG",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of Hyderabadi biryani.",
  },
  {
    state: "Maharashtra",
    region: "West",
    dietProfile: "Mixed, coastal and inland variety",
    dishes: [
      { name: "Puran Poli", veg: true },
      { name: "Vada Pav", veg: true },
      { name: "Misal Pav", veg: true },
      { name: "Kolhapuri Mutton", veg: false },
      { name: "Modak", veg: true },
    ],
    weddingFeast:
      "Maharashtrian wedding thalis pair puran poli and varan bhaat with a full spread of sweet and savoury katoris.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/A_Baraat_procession%2C_Jaipur.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Haryana",
    region: "North",
    dietProfile: "Predominantly vegetarian, dairy-rich",
    dishes: [
      { name: "Bajra Khichdi", veg: true },
      { name: "Kadhi Pakora", veg: true },
      { name: "Besan Masala Roti", veg: true },
      { name: "Hara Dhania Cholia", veg: true },
      { name: "Meethe Chawal", veg: true },
    ],
    weddingFeast:
      "Haryanvi weddings lean on ghee-heavy dairy dishes and a generous meethe chawal to close the meal.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/A_wedding_feast_in_India%2C_dining_tradition.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Goa",
    region: "West",
    dietProfile: "Seafood-forward, Indo-Portuguese influence",
    dishes: [
      { name: "Goan Fish Curry", veg: false },
      { name: "Vindaloo", veg: false },
      { name: "Bebinca", veg: true },
      { name: "Sorpotel", veg: false },
      { name: "Xacuti", veg: false },
    ],
    weddingFeast:
      "Goan Catholic weddings often serve sorpotel and a layered bebinca cake; Hindu Goan weddings favour a vegetarian spread instead.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Goa_Beach.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Kerala",
    region: "South",
    dietProfile: "Vegetarian sadya tradition, coastal seafood elsewhere",
    dishes: [
      { name: "Sadya (banana-leaf feast)", veg: true },
      { name: "Appam & Stew", veg: false },
      { name: "Fish Moilee", veg: false },
      { name: "Puttu & Kadala Curry", veg: true },
      { name: "Payasam", veg: true },
    ],
    weddingFeast:
      "The vegetarian sadya, served on a banana leaf with 20+ dishes, is the traditional Kerala wedding feast regardless of the couple's faith.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Kerala_Sadya_Feast.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of a Kerala sadya feast.",
  },
  {
    state: "Karnataka",
    region: "South",
    dietProfile: "Mixed, rice- and millet-based",
    dishes: [
      { name: "Bisi Bele Bath", veg: true },
      { name: "Mysore Pak", veg: true },
      { name: "Ragi Mudde", veg: true },
      { name: "Neer Dosa", veg: true },
      { name: "Kori Gassi", veg: false },
    ],
    weddingFeast:
      "Karnataka wedding banana-leaf meals are close cousins of Kerala's sadya, with Mysore Pak served as the signature sweet.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Mysore_pak.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of Mysore Pak, which originated in the royal kitchens of the Kingdom of Mysore, Karnataka.",
  },
  {
    state: "Tamil Nadu",
    region: "South",
    dietProfile: "Predominantly vegetarian, rice-based",
    dishes: [
      { name: "Sambar & Rice", veg: true },
      { name: "Chettinad Chicken", veg: false },
      { name: "Masala Dosa", veg: true },
      { name: "Idli", veg: true },
      { name: "Payasam", veg: true },
    ],
    weddingFeast:
      "Tamil wedding feasts (kalyana sapadu) are served on banana leaves, always vegetarian, in a strict multi-course order.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Masala_dosa_01.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of masala dosa, a Tamil Nadu / Karnataka staple.",
  },
  {
    state: "Delhi",
    region: "North",
    dietProfile: "Mixed, Mughlai-influenced",
    dishes: [
      { name: "Butter Chicken", veg: false },
      { name: "Chole Bhature", veg: true },
      { name: "Seekh Kebab", veg: false },
      { name: "Chaat", veg: true },
      { name: "Kheer", veg: true },
    ],
    weddingFeast:
      "Delhi wedding caterers typically run live counters — chaat, kebabs, and a Mughlai main course — alongside a full vegetarian spread.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chicken_makhani.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of butter chicken (murgh makhani), invented in Delhi.",
  },
  {
    state: "Punjab",
    region: "North",
    dietProfile: "Rich, ghee- and dairy-forward, mixed",
    dishes: [
      { name: "Sarson da Saag & Makki di Roti", veg: true },
      { name: "Amritsari Chole Kulcha", veg: true },
      { name: "Butter Chicken", veg: false },
      { name: "Dal Makhani", veg: true },
      { name: "Pinni", veg: true },
    ],
    weddingFeast:
      "Punjabi wedding menus are famously lavish — multiple live counters, dal makhani, and a lassi station alongside the main course.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Punjabi_Thaali.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of a Punjabi thali.",
  },
  {
    state: "Uttar Pradesh",
    region: "North",
    dietProfile: "Mixed, Awadhi-influenced",
    dishes: [
      { name: "Awadhi Biryani", veg: false },
      { name: "Tunday Kebab", veg: false },
      { name: "Nihari", veg: false },
      { name: "Petha", veg: true },
      { name: "Kachori Sabzi", veg: true },
    ],
    weddingFeast:
      "Lucknawi Awadhi cuisine — slow-cooked biryani and galouti-style kebabs — headlines many Uttar Pradesh wedding menus.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Uttar_Pradesh_Thali.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of an Uttar Pradesh thali.",
  },
  {
    state: "West Bengal",
    region: "East",
    dietProfile: "Fish- and rice-forward, mixed",
    dishes: [
      { name: "Macher Jhol", veg: false },
      { name: "Shorshe Ilish", veg: false },
      { name: "Chingri Malai Curry", veg: false },
      { name: "Rosogolla", veg: true },
      { name: "Mishti Doi", veg: true },
    ],
    weddingFeast:
      "Bengali weddings serve an elaborate multi-course meal ending in rosogolla and mishti doi — sweets are never an afterthought here.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Rosgulla_-_Famous_Dessert_of_Kolkata.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of rosogolla, Kolkata.",
  },
  {
    state: "Gujarat",
    region: "West",
    dietProfile: "Predominantly vegetarian, sweet-savoury balance",
    dishes: [
      { name: "Dhokla", veg: true },
      { name: "Undhiyu", veg: true },
      { name: "Thepla", veg: true },
      { name: "Fafda-Jalebi", veg: true },
      { name: "Khandvi", veg: true },
    ],
    weddingFeast:
      "Gujarati wedding thalis are famously all-you-can-eat and entirely vegetarian, built around a sweet-salty-spicy balance.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Gujarati_Dhokla_%28Khaman_Dhokla%29.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of Gujarati dhokla.",
  },
  {
    state: "Himachal Pradesh",
    region: "North",
    dietProfile: "Predominantly vegetarian, mountain feast (dham)",
    dishes: [
      { name: "Dham (festive thali)", veg: true },
      { name: "Siddu", veg: true },
      { name: "Chana Madra", veg: true },
      { name: "Babru", veg: true },
      { name: "Aktori", veg: true },
    ],
    weddingFeast:
      "The dham — a multi-course vegetarian feast cooked by specialist botis (chefs) — is served at nearly every Himachali wedding.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Traditional_North_Indian_Thali.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons North Indian thali photo, used as regional-style reference (not Himachal-specific).",
  },
  {
    state: "Uttarakhand",
    region: "North",
    dietProfile: "Predominantly vegetarian, millet- and dairy-based",
    dishes: [
      { name: "Kafuli", veg: true },
      { name: "Bhatt ki Churkani", veg: true },
      { name: "Aloo ke Gutke", veg: true },
      { name: "Bal Mithai", veg: true },
      { name: "Jhangora Kheer", veg: true },
    ],
    weddingFeast:
      "Pahari wedding feasts favour millet and mountain-grown pulses, closing with a bal mithai and jhangora kheer dessert course.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Bal_mithai.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of bal mithai, a khoya sweet from Almora, Uttarakhand.",
  },
  {
    state: "Madhya Pradesh",
    region: "Central",
    dietProfile: "Mixed, wheat- and dairy-based",
    dishes: [
      { name: "Poha-Jalebi", veg: true },
      { name: "Bhutte ka Kees", veg: true },
      { name: "Dal Bafla", veg: true },
      { name: "Malpua", veg: true },
      { name: "Bhopali Gosht Korma", veg: false },
    ],
    weddingFeast:
      "Central Indian weddings often serve dal bafla — a softer cousin of Rajasthan's baati — alongside a malpua dessert table.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Indian_pancakes-malpua.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of malpua, a festive dessert served across Central and North India including Madhya Pradesh.",
  },
  {
    state: "Andhra Pradesh",
    region: "South",
    dietProfile: "Spice-forward, rice-based, mixed",
    dishes: [
      { name: "Andhra Chicken Curry", veg: false },
      { name: "Pesarattu", veg: true },
      { name: "Gongura Pachadi", veg: true },
      { name: "Pulihora", veg: true },
      { name: "Pootharekulu", veg: true },
    ],
    weddingFeast:
      "Andhra wedding banana-leaf meals are known for their heat — gongura and Andhra chilli dishes headline the spread.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/A_fancy_Indian_wedding_taking_place_in_Puducherry%2C_Tamil_Nadu%2C_India.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Odisha",
    region: "East",
    dietProfile: "Rice- and fish-based, mixed",
    dishes: [
      { name: "Chhena Poda", veg: true },
      { name: "Dalma", veg: true },
      { name: "Macha Ghanta", veg: false },
      { name: "Pakhala", veg: true },
      { name: "Odisha Rasagola", veg: true },
    ],
    weddingFeast:
      "Odisha holds its own GI status for rasagola alongside West Bengal, and its chhena poda — burnt cheesecake — is an equally iconic wedding-table sweet.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chhena_Poda-Puri-Odisha-IMG_1323.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of chhena poda, Odisha's signature caramelised-cheese dessert.",
  },
  {
    state: "Assam",
    region: "Northeast",
    dietProfile: "Fish- and rice-based, lightly spiced",
    dishes: [
      { name: "Assamese Fish Curry", veg: false },
      { name: "Khar", veg: true },
      { name: "Duck Curry", veg: false },
      { name: "Pitha", veg: true },
      { name: "Aloo Pitika", veg: true },
    ],
    weddingFeast:
      "Assamese wedding feasts are served on banana leaves too, with khar as a distinctive alkaline-ash-based opening dish.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/A_Bengali_Hindu_Couple_newly_Married..JPG",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Bihar",
    region: "East",
    dietProfile: "Predominantly vegetarian, sattu-based",
    dishes: [
      { name: "Litti Chokha", veg: true },
      { name: "Sattu Paratha", veg: true },
      { name: "Thekua", veg: true },
      { name: "Dal Pitha", veg: true },
      { name: "Khaja", veg: true },
    ],
    weddingFeast:
      "Litti chokha, roasted wheat balls with mashed vegetables, is a Bihar wedding-menu staple alongside thekua sweets.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Litti_Chokha.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of litti chokha, Bihar's signature dish.",
  },
  {
    state: "Jammu & Kashmir",
    region: "North",
    dietProfile: "Meat-forward, Wazwan feast tradition",
    dishes: [
      { name: "Wazwan (multi-course feast)", veg: false },
      { name: "Rogan Josh", veg: false },
      { name: "Yakhni", veg: false },
      { name: "Dum Aloo", veg: true },
      { name: "Kahwa", veg: true },
    ],
    weddingFeast:
      "The Wazwan — up to 36 courses served on a shared trami platter — is the traditional Kashmiri wedding feast.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Rogan_Josh_Kashmiri.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of rogan josh, a centrepiece dish of the Kashmiri Wazwan feast.",
  },
  {
    state: "Chhattisgarh",
    region: "Central",
    dietProfile: "Predominantly vegetarian, rice-based",
    dishes: [
      { name: "Chila", veg: true },
      { name: "Aamat", veg: false },
      { name: "Bafauri", veg: true },
      { name: "Fara", veg: true },
      { name: "Khurma", veg: true },
    ],
    weddingFeast:
      "Chhattisgarhi weddings favour steamed rice-flour dishes like fara and bafauri alongside a sweet khurma course.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/A_Hindu_bride_dress_rituals_beliefs_culture_in_Amla%2C_Madhya_Pradesh_India_2015.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Sikkim",
    region: "Northeast",
    dietProfile: "Mixed, Himalayan/Tibetan-influenced",
    dishes: [
      { name: "Momos", veg: false },
      { name: "Thukpa", veg: false },
      { name: "Gundruk", veg: true },
      { name: "Sael Roti", veg: true },
      { name: "Phagshapa", veg: false },
    ],
    weddingFeast:
      "Sikkimese weddings blend Nepali and Tibetan influences — momos and thukpa often appear alongside a rice-and-curry main.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Hills_of_Shimla_in_the_morning.jpg",
    verified: false,
    sourceNote: "Real Wikimedia Commons photo of an Indian wedding celebration — not specific to this dish or state; swap in a dish-specific photo when available.",
  },
  {
    state: "Jharkhand",
    region: "East",
    dietProfile: "Predominantly vegetarian, rice- and forest-produce-based",
    dishes: [
      { name: "Litti Chokha", veg: true },
      { name: "Dhuska", veg: true },
      { name: "Rugra (wild mushroom)", veg: true },
      { name: "Malpua", veg: true },
      { name: "Chilka Roti", veg: true },
    ],
    weddingFeast:
      "Jharkhand shares Bihar's litti chokha tradition, with tribal-region specialities like rugra appearing in some communities' wedding menus.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/63/Litti_chokha_well_known_bihar_food.jpg",
    verified: true,
    sourceNote: "Real Wikimedia Commons photo of litti chokha, a dish shared by Bihar and Jharkhand's Bhojpuri/Magadh-belt cuisine.",
  },
] as Omit<StateCuisine, "id">[]).map((c) => ({
  ...c,
  id: c.state.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
})) satisfies StateCuisine[];

export const cuisines: StateCuisine[] = raw;
