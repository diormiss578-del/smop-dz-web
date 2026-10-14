export interface HealthyRecipe {
  id: string;
  title: string;
  titleAr: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Smoothies' | 'Healthy Desserts';
  categoryAr: string;
  imageUrl: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  cookTime: string;
  servings: number;
  isPremium: boolean;
  shortDescription: string;
  shortDescriptionAr: string;
  ingredients: string[];
  ingredientsAr: string[];
  instructions: string[];
  instructionsAr: string[];
}

export interface RecipePack {
  id: string;
  recipesCount: number;
  priceDzd: number;
  popular?: boolean;
  bestValue?: boolean;
  badgeEn?: string;
  badgeAr?: string;
  descriptionEn: string;
  descriptionAr: string;
}

export const RECIPE_PACKS: RecipePack[] = [
  {
    id: 'pack_10',
    recipesCount: 10,
    priceDzd: 690,
    descriptionEn: 'Custom Starter Pack: choose any 10 recipes of your choice.',
    descriptionAr: 'حزمة 10 وصفات حسب الاختيار: اختاري أي 10 وصفات تناسب ذوقك واحتياجاتك اليومية.'
  },
  {
    id: 'pack_30',
    recipesCount: 30,
    priceDzd: 1490,
    popular: true,
    badgeEn: 'Most Popular',
    badgeAr: 'الأكثر طلباً',
    descriptionEn: 'Custom Monthly Pack: choose any 30 recipes of your choice.',
    descriptionAr: 'حزمة 30 وصفة حسب الاختيار: اختاري أي 30 وصفة متوازنة لتوازن الهرمونات طوال الشهر.'
  },
  {
    id: 'pack_50',
    recipesCount: 50,
    priceDzd: 2190,
    bestValue: true,
    badgeEn: 'Best Value',
    badgeAr: 'أفضل قيمة',
    descriptionEn: 'Grand Custom Vault: choose any 50 recipes of your choice.',
    descriptionAr: 'حزمة 50 وصفة حسب الاختيار: خزينة شاملة باختيار 50 وصفة صحية متنوعة.'
  }
];

export const HEALTHY_RECIPES_DATA: HealthyRecipe[] = [
  {
    "id": "hr_b1",
    "title": "Avocado Sourdough Toast",
    "titleAr": "توست الأفوكادو بالبذور وزيت الزيتون",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 12,
    "carbs": 26,
    "fat": 16,
    "prepTime": "10 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Sourdough toast loaded with smashed avocado, poached egg, chili flakes and extra virgin olive oil.",
    "shortDescriptionAr": "خبز الحبوب الكاملة مع الأفوكادو المهروس، بيض مسلوق، بذور الشيا ورشة زيت زيتون بكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Avocado Sourdough Toast",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير توست الأفوكادو بالبذور وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Avocado Sourdough Toast.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير توست الأفوكادو بالبذور وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b2",
    "title": "Greek Yogurt Berry Bowl",
    "titleAr": "وعاء الزبادي اليوناني بالتوت والمكسرات",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 24,
    "carbs": 28,
    "fat": 9,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "High-protein Greek yogurt topped with wild blueberries, cinnamon, and raw walnuts.",
    "shortDescriptionAr": "زبادي يوناني طبيعي غني بالبروتين مع التوت البري، القرفة السيلانية والجوز النيء.",
    "ingredients": [
      "Fresh wholesome ingredients for Greek Yogurt Berry Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء الزبادي اليوناني بالتوت والمكسرات",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Greek Yogurt Berry Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء الزبادي اليوناني بالتوت والمكسرات.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b3",
    "title": "Banana Oat Pancakes",
    "titleAr": "بان كيك الموز والشوفان الصحي بدون سكر",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
    "calories": 340,
    "protein": 15,
    "carbs": 48,
    "fat": 8,
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Fluffy flourless pancakes made from rolled oats, ripe banana, organic eggs and cinnamon.",
    "shortDescriptionAr": "بان كيك خفيف بدون فرينة مصنع من الشوفان الكامل، موز ناضج، بيض وقرفة عطرية.",
    "ingredients": [
      "Fresh wholesome ingredients for Banana Oat Pancakes",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بان كيك الموز والشوفان الصحي بدون سكر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Banana Oat Pancakes.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بان كيك الموز والشوفان الصحي بدون سكر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b4",
    "title": "Mediterranean Shakshuka",
    "titleAr": "شكشوكة البيض بالطماطم والفلفل وزيت الزيتون",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80",
    "calories": 320,
    "protein": 18,
    "carbs": 14,
    "fat": 20,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Gently poached eggs in a rich spiced tomato, bell pepper, and garlic sauce finished with olive oil.",
    "shortDescriptionAr": "بيض مطهو على نار هادئة بصلصة الطماطم الطبيعية والفلفل الحلو والثوم مع زيت الزيتون البكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Mediterranean Shakshuka",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شكشوكة البيض بالطماطم والفلفل وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Mediterranean Shakshuka.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شكشوكة البيض بالطماطم والفلفل وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b5",
    "title": "Spinach & Goat Feta Omelette",
    "titleAr": "أومليت السبانخ وجبن الفيتا الخفيف",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&auto=format&fit=crop&q=80",
    "calories": 270,
    "protein": 20,
    "carbs": 4,
    "fat": 18,
    "prepTime": "5 min",
    "cookTime": "6 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Fluffy pasture-raised eggs folded with wilted baby spinach, oregano, and crumbled light feta.",
    "shortDescriptionAr": "أومليت بيض بلدي مخفوق مع السبانخ الطازجة والزعتر والفيتا الخفيفة المقوية للهرمونات.",
    "ingredients": [
      "Fresh wholesome ingredients for Spinach & Goat Feta Omelette",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير أومليت السبانخ وجبن الفيتا الخفيف",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Spinach & Goat Feta Omelette.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير أومليت السبانخ وجبن الفيتا الخفيف.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b6",
    "title": "Chia & Berry Overnight Oats",
    "titleAr": "شوفان الشيا والتوت المنقوع طوال الليل",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    "calories": 285,
    "protein": 14,
    "carbs": 38,
    "fat": 8,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Rolled oats and chia seeds soaked in almond milk with wild berries and Ceylon cinnamon.",
    "shortDescriptionAr": "شوفان الحبة الكاملة وبذور الشيا منقوعة في حليب اللوز مع التوت البري والقرفة المنظمة للسكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Chia & Berry Overnight Oats",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شوفان الشيا والتوت المنقوع طوال الليل",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chia & Berry Overnight Oats.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شوفان الشيا والتوت المنقوع طوال الليل.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b7",
    "title": "Egg & Veggie Breakfast Cups",
    "titleAr": "مافن البيض بالخضار والريحان الصحي",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80",
    "calories": 190,
    "protein": 16,
    "carbs": 5,
    "fat": 12,
    "prepTime": "10 min",
    "cookTime": "18 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Baked protein egg muffins packed with bell peppers, zucchini, mushrooms and fresh herbs.",
    "shortDescriptionAr": "كب كيك البيض المخبوز بالفرن مع الفلفل الحلو، الكوسا، الفطر والأعشاب العطرية.",
    "ingredients": [
      "Fresh wholesome ingredients for Egg & Veggie Breakfast Cups",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مافن البيض بالخضار والريحان الصحي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Egg & Veggie Breakfast Cups.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مافن البيض بالخضار والريحان الصحي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b8",
    "title": "Golden Flaxseed Porridge",
    "titleAr": "عصيدة بذور الكتان الذهبية بالقرفة",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop&q=80",
    "calories": 240,
    "protein": 10,
    "carbs": 12,
    "fat": 16,
    "prepTime": "5 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Low-carb hormone-balancing porridge made from ground flaxseed, coconut milk, and pumpkin seeds.",
    "shortDescriptionAr": "عصيدة دافئة قليلة الكارب من بذور الكتان الذهبية المطحونة وحليب جوز الهند وبذور القرع.",
    "ingredients": [
      "Fresh wholesome ingredients for Golden Flaxseed Porridge",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير عصيدة بذور الكتان الذهبية بالقرفة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Golden Flaxseed Porridge.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير عصيدة بذور الكتان الذهبية بالقرفة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b9",
    "title": "Smoked Salmon & Egg Toast",
    "titleAr": "توست السلمون المدخن مع البيض المسلوق",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    "calories": 330,
    "protein": 26,
    "carbs": 22,
    "fat": 16,
    "prepTime": "8 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Whole grain bread layered with smashed avocado, Omega-3 rich smoked salmon, and organic poached egg.",
    "shortDescriptionAr": "خبز الحبوب الكاملة مع الأفوكادو والسلمون المدخن الغني بالأوميغا 3 وبيضة مسلوقة طازجة.",
    "ingredients": [
      "Fresh wholesome ingredients for Smoked Salmon & Egg Toast",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير توست السلمون المدخن مع البيض المسلوق",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Smoked Salmon & Egg Toast.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير توست السلمون المدخن مع البيض المسلوق.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b10",
    "title": "Quinoa Cinnamon Berry Bowl",
    "titleAr": "عصيدة الكينوا الصباحية بالتوت والقرفة",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80",
    "calories": 295,
    "protein": 12,
    "carbs": 44,
    "fat": 7,
    "prepTime": "5 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Complete plant protein breakfast bowl made with tender cooked quinoa, almond milk, and raspberries.",
    "shortDescriptionAr": "وعاء كينوا مسلوقة بحليب اللوز والتوت البري، غني بجميع الأحماض الأمينية الأساسية لإنتاج الهرمونات.",
    "ingredients": [
      "Fresh wholesome ingredients for Quinoa Cinnamon Berry Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير عصيدة الكينوا الصباحية بالتوت والقرفة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Quinoa Cinnamon Berry Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير عصيدة الكينوا الصباحية بالتوت والقرفة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b11",
    "title": "Turmeric Tofu Scramble",
    "titleAr": "مفروم التوفو بالكركم والسبانخ",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&auto=format&fit=crop&q=80",
    "calories": 210,
    "protein": 19,
    "carbs": 8,
    "fat": 11,
    "prepTime": "8 min",
    "cookTime": "8 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Scrambled organic firm tofu seasoned with anti-inflammatory turmeric, garlic, cumin, and wilted spinach.",
    "shortDescriptionAr": "توفو عضوي مشوح بالكركم المضاد للالتهاب، الثوم، الكمون وأوراق السبانخ الخضراء.",
    "ingredients": [
      "Fresh wholesome ingredients for Turmeric Tofu Scramble",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مفروم التوفو بالكركم والسبانخ",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Turmeric Tofu Scramble.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مفروم التوفو بالكركم والسبانخ.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b12",
    "title": "Cottage Cheese Walnut Bowl",
    "titleAr": "وعاء جبن القريش بالجوز وبذور الشيا",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
    "calories": 260,
    "protein": 26,
    "carbs": 12,
    "fat": 11,
    "prepTime": "4 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "High-casein cottage cheese with crushed raw walnuts, cinnamon, and fresh blackberry slices.",
    "shortDescriptionAr": "جبن قريش طبيعي غني بالكازين مع الجوز النيء، القرفة وشرائح التوت الأسود للشبع الممتد.",
    "ingredients": [
      "Fresh wholesome ingredients for Cottage Cheese Walnut Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء جبن القريش بالجوز وبذور الشيا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Cottage Cheese Walnut Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء جبن القريش بالجوز وبذور الشيا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b13",
    "title": "Almond Flour Protein Waffles",
    "titleAr": "وافل دقيق اللوز الصحي بدون سكر",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 14,
    "carbs": 14,
    "fat": 22,
    "prepTime": "8 min",
    "cookTime": "6 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Crisp gluten-free waffles made with blanched almond flour, eggs, and unsweetened vanilla.",
    "shortDescriptionAr": "وافل مقرمش وخالٍ من الغلوتين محضر بدقيق اللوز والبيض وفانيليا طبيعية.",
    "ingredients": [
      "Fresh wholesome ingredients for Almond Flour Protein Waffles",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وافل دقيق اللوز الصحي بدون سكر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Almond Flour Protein Waffles.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وافل دقيق اللوز الصحي بدون سكر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b14",
    "title": "Mediterranean Mezze Breakfast",
    "titleAr": "طبق الفطور المتوسطي المتوازن",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 350,
    "protein": 19,
    "carbs": 18,
    "fat": 24,
    "prepTime": "8 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Classic balanced breakfast with 2 boiled eggs, cucumber, cherry tomatoes, Kalamata olives, and olive oil.",
    "shortDescriptionAr": "فطور متوسطي متكامل يجمع بين بيضتين مسلوقتين، شرائح خيار، طماطم كرزية، زيتون بلدي وزيت زيتون بكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Mediterranean Mezze Breakfast",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طبق الفطور المتوسطي المتوازن",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Mediterranean Mezze Breakfast.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طبق الفطور المتوسطي المتوازن.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b15",
    "title": "Baked Avocado Egg Boats",
    "titleAr": "قوارب الأفوكادو المخبوزة بالبيض والأعشاب",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80",
    "calories": 280,
    "protein": 13,
    "carbs": 8,
    "fat": 23,
    "prepTime": "5 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Halved avocado baked with an egg cracked into each center, seasoned with chili and chives.",
    "shortDescriptionAr": "نصفا حبة أفوكادو ناضجة مخبوزة بالفرن مع بيضة طازجة في كل نصف وتوابل دافئة.",
    "ingredients": [
      "Fresh wholesome ingredients for Baked Avocado Egg Boats",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير قوارب الأفوكادو المخبوزة بالبيض والأعشاب",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Baked Avocado Egg Boats.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير قوارب الأفوكادو المخبوزة بالبيض والأعشاب.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b16",
    "title": "Millet Cinnamon Fig Porridge",
    "titleAr": "عصيدة الدخن الدافئة بالتين والقرفة",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    "calories": 275,
    "protein": 9,
    "carbs": 46,
    "fat": 6,
    "prepTime": "5 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Alkalizing whole grain millet simmered in cashew milk topped with dried Algerian figs and cinnamon.",
    "shortDescriptionAr": "عصيدة حبوب الدخن القلوية المطهوة بحليب الكاجو ومزينة بقطع التين المجفف والقرفة.",
    "ingredients": [
      "Fresh wholesome ingredients for Millet Cinnamon Fig Porridge",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير عصيدة الدخن الدافئة بالتين والقرفة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Millet Cinnamon Fig Porridge.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير عصيدة الدخن الدافئة بالتين والقرفة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b17",
    "title": "Buckwheat Berry Crepes",
    "titleAr": "كريب الحنطة السوداء بالتوت البري",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 11,
    "carbs": 42,
    "fat": 8,
    "prepTime": "10 min",
    "cookTime": "8 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Gluten-free buckwheat flour thin crepes served with warm blueberry compote and Greek yogurt.",
    "shortDescriptionAr": "كريب خفيف من طحين الحنطة السوداء الخالية من الغلوتين يقدم مع صوص التوت الدافئ والزبادي.",
    "ingredients": [
      "Fresh wholesome ingredients for Buckwheat Berry Crepes",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كريب الحنطة السوداء بالتوت البري",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Buckwheat Berry Crepes.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كريب الحنطة السوداء بالتوت البري.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b18",
    "title": "Turkey Bacon Herb Scramble",
    "titleAr": "مفروم البيض بشرائح الديك الرومي والأعشاب",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 28,
    "carbs": 4,
    "fat": 19,
    "prepTime": "5 min",
    "cookTime": "7 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "High-protein breakfast scramble with nitrate-free lean turkey strips, pasture eggs, and fresh parsley.",
    "shortDescriptionAr": "فطور غني بالبروتين يجمع بين شرائح الديك الرومي المدخن الخالي من النترات والبيض البلدي والبقدونس.",
    "ingredients": [
      "Fresh wholesome ingredients for Turkey Bacon Herb Scramble",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مفروم البيض بشرائح الديك الرومي والأعشاب",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Turkey Bacon Herb Scramble.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مفروم البيض بشرائح الديك الرومي والأعشاب.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b19",
    "title": "Almond Butter Chia Toast",
    "titleAr": "توست زبدة اللوز الطبيعية وبذور الشيا",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1484723091739-004a8024213d?w=800&auto=format&fit=crop&q=80",
    "calories": 270,
    "protein": 9,
    "carbs": 28,
    "fat": 14,
    "prepTime": "4 min",
    "cookTime": "2 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Toasted whole sourdough bread spread with creamy 100% natural almond butter and chia seeds.",
    "shortDescriptionAr": "توست الحبوب الكاملة مع ملعقتين من زبدة اللوز الطبيعية 100% وبذور الشيا وقرفة سيلانية.",
    "ingredients": [
      "Fresh wholesome ingredients for Almond Butter Chia Toast",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير توست زبدة اللوز الطبيعية وبذور الشيا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Almond Butter Chia Toast.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير توست زبدة اللوز الطبيعية وبذور الشيا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b20",
    "title": "Poached Eggs on Asparagus",
    "titleAr": "بيض مسلوق فوق الهليون المطهو على البخار",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80",
    "calories": 230,
    "protein": 16,
    "carbs": 6,
    "fat": 15,
    "prepTime": "8 min",
    "cookTime": "6 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Tender steamed green asparagus spears topped with two runny poached eggs and lemon olive oil drizzle.",
    "shortDescriptionAr": "أعواد الهليون الأخضر المطهوة على البخار مع بيضتين مسلوقتين ورشة زيت زيتون بكر بالليمون.",
    "ingredients": [
      "Fresh wholesome ingredients for Poached Eggs on Asparagus",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بيض مسلوق فوق الهليون المطهو على البخار",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Poached Eggs on Asparagus.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بيض مسلوق فوق الهليون المطهو على البخار.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b21",
    "title": "Mushroom Herb Scramble",
    "titleAr": "بيض مخفوق بفطر البورتوبيلو والزعتر",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=800&auto=format&fit=crop&q=80",
    "calories": 250,
    "protein": 18,
    "carbs": 5,
    "fat": 17,
    "prepTime": "6 min",
    "cookTime": "8 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Sliced brown mushrooms sautéed in olive oil with garlic, folded with creamy soft scrambled eggs.",
    "shortDescriptionAr": "فطر بني طازج مشوح في زيت الزيتون مع الثوم والزعتر، ممزوج ببيض بلدي مخفوق وناعم.",
    "ingredients": [
      "Fresh wholesome ingredients for Mushroom Herb Scramble",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بيض مخفوق بفطر البورتوبيلو والزعتر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Mushroom Herb Scramble.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بيض مخفوق بفطر البورتوبيلو والزعتر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_b22",
    "title": "Hemp Heart Low-Carb Cereal",
    "titleAr": "حبوب بذور القنب والكتان منخفضة الكارب",
    "category": "Breakfast",
    "categoryAr": "فطور الصباح",
    "imageUrl": "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 16,
    "carbs": 6,
    "fat": 22,
    "prepTime": "4 min",
    "cookTime": "4 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Grain-free warm breakfast bowl loaded with raw hemp hearts, chia seeds, cinnamon, and warm almond milk.",
    "shortDescriptionAr": "وجبة فطور خالية من الحبوب غنية ببذور القنب والشيا وحليب اللوز والقرفة لمكافحة الالتهابات.",
    "ingredients": [
      "Fresh wholesome ingredients for Hemp Heart Low-Carb Cereal",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حبوب بذور القنب والكتان منخفضة الكارب",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Hemp Heart Low-Carb Cereal.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حبوب بذور القنب والكتان منخفضة الكارب.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l1",
    "title": "Chicken & Quinoa Bowl",
    "titleAr": "وعاء الدجاج المشوي والكينوا بالخضار",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "calories": 430,
    "protein": 38,
    "carbs": 42,
    "fat": 12,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Herb-marinated grilled chicken breast served over fluffy tri-color quinoa, baby spinach, avocado and tahini.",
    "shortDescriptionAr": "صدر دجاج مشوي بالأعشاب الطبيعية يقدم مع الكينوا، أوراق السبانخ، الأفوكادو وصلصة الطحينة بالليمون.",
    "ingredients": [
      "Fresh wholesome ingredients for Chicken & Quinoa Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء الدجاج المشوي والكينوا بالخضار",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chicken & Quinoa Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء الدجاج المشوي والكينوا بالخضار.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l2",
    "title": "Mediterranean Chicken Salad",
    "titleAr": "سلطة الدجاج المتوسطية بزيت الزيتون والفيتا",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 380,
    "protein": 34,
    "carbs": 18,
    "fat": 18,
    "prepTime": "15 min",
    "cookTime": "10 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crisp romaine lettuce, grilled spiced chicken, Kalamata olives, cucumbers and light sheep feta.",
    "shortDescriptionAr": "خس مقرمش مع شرائح الدجاج المشوي، زيتون كالاماتا، خيار وجبن الفيتا الخفيف بصلصة الليمون والزعتر.",
    "ingredients": [
      "Fresh wholesome ingredients for Mediterranean Chicken Salad",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة الدجاج المتوسطية بزيت الزيتون والفيتا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Mediterranean Chicken Salad.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة الدجاج المتوسطية بزيت الزيتون والفيتا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l3",
    "title": "Grilled Chicken Whole Wheat Wrap",
    "titleAr": "سندويش راب الدجاج المشوي بالخبز الكامل",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    "calories": 395,
    "protein": 32,
    "carbs": 35,
    "fat": 14,
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Spiced chicken breast wrapped in whole wheat tortilla with hummus, crunchy bell peppers, and spinach.",
    "shortDescriptionAr": "صدر دجاج مشوي ملفوف بخبز التورتيلا الكامل مع الحمص بالطحينة، الفلفل الملون وصوص الزبادي.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Chicken Whole Wheat Wrap",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سندويش راب الدجاج المشوي بالخبز الكامل",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Chicken Whole Wheat Wrap.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سندويش راب الدجاج المشوي بالخبز الكامل.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l4",
    "title": "Tuna Avocado Salad Bowl",
    "titleAr": "سلطة التونة بالأفوكادو والجرجير وزيت الزيتون",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop&q=80",
    "calories": 360,
    "protein": 32,
    "carbs": 14,
    "fat": 18,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Wild skipjack tuna flaked over baby rocket, diced avocado, red onion, capers, and lemon olive oil dressing.",
    "shortDescriptionAr": "تونة بيضاء طبيعية فوق الجرجير، مكعبات الأفوكادو، بصل أحمر وصلصة الليمون وزيت الزيتون البكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Tuna Avocado Salad Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة التونة بالأفوكادو والجرجير وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Tuna Avocado Salad Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة التونة بالأفوكادو والجرجير وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l5",
    "title": "Lentil & Sweet Potato Tajine Bowl",
    "titleAr": "طاجين العدس بالبطاطا الحلوة والكمون",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
    "calories": 410,
    "protein": 18,
    "carbs": 56,
    "fat": 11,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Slow-cooked brown lentils with tender sweet potato cubes, cumin, coriander, and fresh parsley.",
    "shortDescriptionAr": "عدس بني جزائري مطهو على نار هادئة مع مكعبات البطاطا الحلوة والكمون والكزبرة وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Lentil & Sweet Potato Tajine Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين العدس بالبطاطا الحلوة والكمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Lentil & Sweet Potato Tajine Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين العدس بالبطاطا الحلوة والكمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l6",
    "title": "Grilled Turkey Breast & Quinoa",
    "titleAr": "شريحة ديك رومي مشوية مع الكينوا والبروكلي",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
    "calories": 405,
    "protein": 42,
    "carbs": 36,
    "fat": 10,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Lean grilled turkey fillet served with steamed broccoli florets, quinoa, and cold-pressed walnut oil.",
    "shortDescriptionAr": "فيليه ديك رومي مشوي غني بالبروتين مع البروكلي المطهو على البخار والكينوا وزيت الجوز النقي.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Turkey Breast & Quinoa",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شريحة ديك رومي مشوية مع الكينوا والبروكلي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Turkey Breast & Quinoa.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شريحة ديك رومي مشوية مع الكينوا والبروكلي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l7",
    "title": "Chickpea Mediterranean Fattoush",
    "titleAr": "فتوش الحمص المقرمش بالنعناع والسماق",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 330,
    "protein": 14,
    "carbs": 42,
    "fat": 12,
    "prepTime": "12 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crisp romaine, toasted chickpea croutons, radish, cucumbers, fresh mint and zesty pomegranate sumac dressing.",
    "shortDescriptionAr": "سلطة الفتوش المنعشة بالحمص المحمص، الفجل، النعناع الطازج وتتبيلة السماق ودبس الرمان الطبيعي.",
    "ingredients": [
      "Fresh wholesome ingredients for Chickpea Mediterranean Fattoush",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فتوش الحمص المقرمش بالنعناع والسماق",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chickpea Mediterranean Fattoush.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فتوش الحمص المقرمش بالنعناع والسماق.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l8",
    "title": "Lemon Herb Cod Fillet",
    "titleAr": "فيليه سمك القد بالأعشاب والليمون والثوم",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 36,
    "carbs": 8,
    "fat": 14,
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Pan-seared white cod fillet basted in lemon, extra virgin olive oil, garlic, and fresh parsley.",
    "shortDescriptionAr": "فيليه سمك أبيض مشوح بزيت الزيتون البكر وعصير الليمون والثوم والبقدونس الطازج.",
    "ingredients": [
      "Fresh wholesome ingredients for Lemon Herb Cod Fillet",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فيليه سمك القد بالأعشاب والليمون والثوم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Lemon Herb Cod Fillet.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فيليه سمك القد بالأعشاب والليمون والثوم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l9",
    "title": "Warm Salmon Quinoa Salad",
    "titleAr": "سلطة السلمون الدافئة بالكينوا والسبانخ",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
    "calories": 460,
    "protein": 35,
    "carbs": 34,
    "fat": 20,
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Flaked roasted salmon tossed with warm tri-color quinoa, baby spinach, pumpkin seeds, and tahini.",
    "shortDescriptionAr": "قطع سلمون مشوي غني بالأوميغا 3 ممزوج بالكينوا والسبانخ الدافئة وبذور القرع وصلصة الطحينة.",
    "ingredients": [
      "Fresh wholesome ingredients for Warm Salmon Quinoa Salad",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة السلمون الدافئة بالكينوا والسبانخ",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Warm Salmon Quinoa Salad.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة السلمون الدافئة بالكينوا والسبانخ.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l10",
    "title": "Algerian Loubia (White Bean Stew)",
    "titleAr": "لوبيا بيضاء بالكمون وزيت الزيتون بدون لحم",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
    "calories": 370,
    "protein": 20,
    "carbs": 52,
    "fat": 9,
    "prepTime": "15 min",
    "cookTime": "35 min",
    "servings": 3,
    "isPremium": false,
    "shortDescription": "Traditional slow-simmered Algerian white cannellini bean stew infused with cumin, garlic, and sweet paprika.",
    "shortDescriptionAr": "لوبيا بيضاء جزائرية مطهوة على نار هادئة بالثوم والكمون والبابريكا وزيت الزيتون الغني بالألياف.",
    "ingredients": [
      "Fresh wholesome ingredients for Algerian Loubia (White Bean Stew)",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير لوبيا بيضاء بالكمون وزيت الزيتون بدون لحم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Algerian Loubia (White Bean Stew).",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير لوبيا بيضاء بالكمون وزيت الزيتون بدون لحم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l11",
    "title": "Zucchini Turkey Noodle Bowl",
    "titleAr": "خيوط الكوسا بصلصة الديك الرومي المفروم",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    "calories": 350,
    "protein": 36,
    "carbs": 15,
    "fat": 14,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Spiralized raw zucchini noodles tossed in light ground turkey Bolognese with fresh oregano and basil.",
    "shortDescriptionAr": "معكرونة الكوسا الطازجة منخفضة السكر مع لحم الديك الرومي المفروم وصلصة الطماطم الطبيعية.",
    "ingredients": [
      "Fresh wholesome ingredients for Zucchini Turkey Noodle Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير خيوط الكوسا بصلصة الديك الرومي المفروم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Zucchini Turkey Noodle Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير خيوط الكوسا بصلصة الديك الرومي المفروم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l12",
    "title": "Moroccan Spiced Harira Soup",
    "titleAr": "حريرة الحمص والعدس بالأعشاب والليمون",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 16,
    "carbs": 45,
    "fat": 7,
    "prepTime": "15 min",
    "cookTime": "30 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Rich comforting tomato broth with sprouted lentils, chickpeas, fresh celery, coriander, and turmeric.",
    "shortDescriptionAr": "حساء حريرة مغذي غني بالحمص والعدس والكرفس والكزبرة والكركم بدون فرينة أو نشا صناعي.",
    "ingredients": [
      "Fresh wholesome ingredients for Moroccan Spiced Harira Soup",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حريرة الحمص والعدس بالأعشاب والليمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Moroccan Spiced Harira Soup.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حريرة الحمص والعدس بالأعشاب والليمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l13",
    "title": "Grilled Beef Strips & Bell Peppers",
    "titleAr": "شرائح لحم البقر المشوية بالفلفل الملون",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    "calories": 420,
    "protein": 36,
    "carbs": 14,
    "fat": 23,
    "prepTime": "12 min",
    "cookTime": "10 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Iron-rich lean grass-fed beef strips flash-seared with tri-color bell peppers, cumin, and red onion.",
    "shortDescriptionAr": "شرائح لحم بقري بلدي مشوح بالفلفل الملون والبصل والكمون لدعم مخزون الحديد والنشاط.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Beef Strips & Bell Peppers",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح لحم البقر المشوية بالفلفل الملون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Beef Strips & Bell Peppers.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح لحم البقر المشوية بالفلفل الملون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l14",
    "title": "Stuffed Peppers with Quinoa & Turkey",
    "titleAr": "فلفل محشي بالكينوا ولحم الديك الرومي",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "calories": 380,
    "protein": 32,
    "carbs": 34,
    "fat": 12,
    "prepTime": "15 min",
    "cookTime": "30 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Baked sweet bell peppers filled with spiced cooked quinoa, lean minced turkey, tomatoes, and herbs.",
    "shortDescriptionAr": "فلفل حلو مشوي ومحشو بالكينوا ولحم الديك الرومي المفروم والأعشاب وصلصة الطماطم.",
    "ingredients": [
      "Fresh wholesome ingredients for Stuffed Peppers with Quinoa & Turkey",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فلفل محشي بالكينوا ولحم الديك الرومي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Stuffed Peppers with Quinoa & Turkey.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فلفل محشي بالكينوا ولحم الديك الرومي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l15",
    "title": "Steamed Sardines with Charmoula",
    "titleAr": "سردين جزائري طازج بالشرمولة والليمون",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 340,
    "protein": 35,
    "carbs": 4,
    "fat": 19,
    "prepTime": "15 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Fresh local sardines marinated in garlic, cumin, coriander, and olive oil, gently steamed.",
    "shortDescriptionAr": "سردين محلي طازج غني بالأوميغا 3 والكالسيوم متبل بالشرمولة الجزائرية بالثوم والكمون.",
    "ingredients": [
      "Fresh wholesome ingredients for Steamed Sardines with Charmoula",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سردين جزائري طازج بالشرمولة والليمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Steamed Sardines with Charmoula.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سردين جزائري طازج بالشرمولة والليمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l16",
    "title": "Roasted Beet & Goat Cheese Salad",
    "titleAr": "سلطة الشمندر المشوي وجبن الماعز والجوز",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 295,
    "protein": 11,
    "carbs": 24,
    "fat": 17,
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Roasted ruby beetroot wedges tossed with baby greens, crumbled soft goat cheese, and toasted walnuts.",
    "shortDescriptionAr": "شمندر مشوي غني بمضادات الأكسدة مع الجرجير وجبن الماعز الطازج والجوز وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Beet & Goat Cheese Salad",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة الشمندر المشوي وجبن الماعز والجوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Beet & Goat Cheese Salad.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة الشمندر المشوي وجبن الماعز والجوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l17",
    "title": "Herb Grilled Chicken Thighs & Greens",
    "titleAr": "أوراك دجاج مشوية بالأعشاب مع السبانخ",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    "calories": 410,
    "protein": 36,
    "carbs": 6,
    "fat": 26,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crispy skinless chicken thighs seasoned with rosemary and garlic, served over sautéed garlicky kale.",
    "shortDescriptionAr": "أوراك دجاج بدون جلد متبلة بالروزماري والثوم ومشوية حتى النضج مع سوتيه السلق والسبانخ.",
    "ingredients": [
      "Fresh wholesome ingredients for Herb Grilled Chicken Thighs & Greens",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير أوراك دجاج مشوية بالأعشاب مع السبانخ",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Herb Grilled Chicken Thighs & Greens.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير أوراك دجاج مشوية بالأعشاب مع السبانخ.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l18",
    "title": "Chickpea Cauliflower Curry Bowl",
    "titleAr": "كاري الحمص والقرنبيط بحليب جوز الهند",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 370,
    "protein": 14,
    "carbs": 46,
    "fat": 14,
    "prepTime": "12 min",
    "cookTime": "20 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Aromatic mild coconut curry with roasted cauliflower florets, chickpeas, ginger, and spinach.",
    "shortDescriptionAr": "كاري خفيف بالكركم والزنجبيل وحليب جوز الهند مع زهرات القرنبيط والحمص وأوراق السبانخ.",
    "ingredients": [
      "Fresh wholesome ingredients for Chickpea Cauliflower Curry Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كاري الحمص والقرنبيط بحليب جوز الهند",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chickpea Cauliflower Curry Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كاري الحمص والقرنبيط بحليب جوز الهند.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l19",
    "title": "Egg Salad with Avocado & Chives",
    "titleAr": "سلطة البيض بالأفوكادو والخردل الطبيعي",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    "calories": 320,
    "protein": 19,
    "carbs": 8,
    "fat": 23,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Mashed boiled eggs blended with ripe avocado instead of mayo, Dijon mustard, celery, and chives.",
    "shortDescriptionAr": "سلطة بيض مسلوق مهروس مع الأفوكادو بدلاً من المايونيز، مع الخردل الطبيعي والكرفس والبصل الأخضر.",
    "ingredients": [
      "Fresh wholesome ingredients for Egg Salad with Avocado & Chives",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة البيض بالأفوكادو والخردل الطبيعي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Egg Salad with Avocado & Chives.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة البيض بالأفوكادو والخردل الطبيعي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l20",
    "title": "Grilled Lemon Oregano Chicken",
    "titleAr": "صدر دجاج بالليمون والأوريغانو والخرشوف",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "calories": 390,
    "protein": 40,
    "carbs": 16,
    "fat": 16,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Tender grilled chicken breast served with steamed artichoke hearts and lemon herb dressing.",
    "shortDescriptionAr": "صدر دجاج طري مشوي مع قلوب الخرشوف المطهوة على البخار وصلصة الليمون والأوريغانو.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Lemon Oregano Chicken",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير صدر دجاج بالليمون والأوريغانو والخرشوف",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Lemon Oregano Chicken.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير صدر دجاج بالليمون والأوريغانو والخرشوف.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l21",
    "title": "Spiced Lentil Salad with Pomegranate",
    "titleAr": "سلطة العدس البني بالرمان والبقدونس",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 16,
    "carbs": 44,
    "fat": 7,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Earthy brown lentils tossed with fresh pomegranate arils, cucumbers, walnuts, and mint vinaigrette.",
    "shortDescriptionAr": "عدس بني مع حبات الرمان الطازجة والخيار والجوز والنعناع وزيت الزيتون المنعش.",
    "ingredients": [
      "Fresh wholesome ingredients for Spiced Lentil Salad with Pomegranate",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سلطة العدس البني بالرمان والبقدونس",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Spiced Lentil Salad with Pomegranate.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سلطة العدس البني بالرمان والبقدونس.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l22",
    "title": "Baked Turkey Meatballs & Zucchini",
    "titleAr": "كرات لحم الديك الرومي بصلصة الطماطم",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    "calories": 360,
    "protein": 35,
    "carbs": 16,
    "fat": 15,
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Herb-infused lean turkey meatballs simmered in rustic tomato sauce over steamed green beans.",
    "shortDescriptionAr": "كرات ديك رومي مفروم بالأعشاب مطهوة في صلصة طماطم بلدي وتقدم مع الفاصوليا الخضراء.",
    "ingredients": [
      "Fresh wholesome ingredients for Baked Turkey Meatballs & Zucchini",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كرات لحم الديك الرومي بصلصة الطماطم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Baked Turkey Meatballs & Zucchini.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كرات لحم الديك الرومي بصلصة الطماطم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l23",
    "title": "Warm Roasted Butternut Squash Bowl",
    "titleAr": "وعاء القرع العسلي المشوي بالكينوا والجوز",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 340,
    "protein": 11,
    "carbs": 48,
    "fat": 12,
    "prepTime": "12 min",
    "cookTime": "25 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Cinnamon-roasted butternut squash cubes over quinoa with pumpkin seeds and apple cider dressing.",
    "shortDescriptionAr": "مكعبات القرع العسلي المشوية بالقرفة مع الكينوا وبذور القرع وصلصة خل التفاح الطبيعي.",
    "ingredients": [
      "Fresh wholesome ingredients for Warm Roasted Butternut Squash Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء القرع العسلي المشوي بالكينوا والجوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Warm Roasted Butternut Squash Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء القرع العسلي المشوي بالكينوا والجوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l24",
    "title": "Calamari Steamed in Tomato Sauce",
    "titleAr": "حبار طازج مطهو بصلصة الطماطم والثوم",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 32,
    "carbs": 12,
    "fat": 10,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Fresh Mediterranean calamari rings simmered gently with cherry tomatoes, garlic, and capers.",
    "shortDescriptionAr": "حلقات كالمار طازجة مطهوة على نار هادئة مع الطماطم الكرزية والثوم وزيت الزيتون البكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Calamari Steamed in Tomato Sauce",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حبار طازج مطهو بصلصة الطماطم والثوم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Calamari Steamed in Tomato Sauce.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حبار طازج مطهو بصلصة الطماطم والثوم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l25",
    "title": "Avocado Chicken Salad Boats",
    "titleAr": "قوارب الأفوكادو بسلطة الدجاج المشوي",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80",
    "calories": 380,
    "protein": 30,
    "carbs": 10,
    "fat": 24,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Avocado halves stuffed with shredded chicken breast, Greek yogurt, diced celery, and fresh herbs.",
    "shortDescriptionAr": "أنصاف أفوكادو محشوة بسلطة الدجاج المفروم مع الزبادي اليوناني والكرفس والبقدونس.",
    "ingredients": [
      "Fresh wholesome ingredients for Avocado Chicken Salad Boats",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير قوارب الأفوكادو بسلطة الدجاج المشوي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Avocado Chicken Salad Boats.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير قوارب الأفوكادو بسلطة الدجاج المشوي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_l26",
    "title": "Algerian Shorba Frik with Chicken",
    "titleAr": "شوربة فريك جزائرية بالدجاج والأعشاب",
    "category": "Lunch",
    "categoryAr": "وجبة الغداء",
    "imageUrl": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop&q=80",
    "calories": 330,
    "protein": 28,
    "carbs": 38,
    "fat": 7,
    "prepTime": "15 min",
    "cookTime": "35 min",
    "servings": 3,
    "isPremium": false,
    "shortDescription": "Traditional cracked green wheat soup with tender chicken breast, fresh mint, coriander, and tomato.",
    "shortDescriptionAr": "شوربة فريك قمح أخضر أصيلة بصدر الدجاج والنعناع المجفف والكزبرة والليمون لتغذية ميكروبيوم الأمعاء.",
    "ingredients": [
      "Fresh wholesome ingredients for Algerian Shorba Frik with Chicken",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شوربة فريك جزائرية بالدجاج والأعشاب",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Algerian Shorba Frik with Chicken.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شوربة فريك جزائرية بالدجاج والأعشاب.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d1",
    "title": "Crispy Skin Salmon Rice Bowl",
    "titleAr": "وعاء السلمون المشوي بالأرز البني والأفوكادو",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
    "calories": 490,
    "protein": 36,
    "carbs": 45,
    "fat": 17,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Pan-seared Atlantic salmon over brown jasmine rice, steamed peas, avocado, and ginger tamari.",
    "shortDescriptionAr": "فيليه سلمون مشوي غني بالأوميغا 3 يقدم فوق الأرز البني، الأفوكادو، وبذور السمسم وزيت الزنجبيل.",
    "ingredients": [
      "Fresh wholesome ingredients for Crispy Skin Salmon Rice Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء السلمون المشوي بالأرز البني والأفوكادو",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Crispy Skin Salmon Rice Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء السلمون المشوي بالأرز البني والأفوكادو.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d2",
    "title": "Zucchini Noodle Turkey Bolognese",
    "titleAr": "سباغيتي الكوسا بصلصة بولونيز الديك الرومي",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    "calories": 360,
    "protein": 36,
    "carbs": 16,
    "fat": 14,
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Spiralized low-carb zucchini noodles in rich slow-simmered lean ground turkey bolognese with herbs.",
    "shortDescriptionAr": "معكرونة الكوسا الطازجة منخفضة الكاربوهيدرات مع صلصة لحم الديك الرومي المفروم بالأعشاب.",
    "ingredients": [
      "Fresh wholesome ingredients for Zucchini Noodle Turkey Bolognese",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سباغيتي الكوسا بصلصة بولونيز الديك الرومي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Zucchini Noodle Turkey Bolognese.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سباغيتي الكوسا بصلصة بولونيز الديك الرومي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d3",
    "title": "Roasted Chickpea Buddha Bowl",
    "titleAr": "وعاء الحمص المشوي بالكمون والبطاطا الحلوة",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 420,
    "protein": 16,
    "carbs": 58,
    "fat": 14,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Spiced crispy chickpeas, roasted sweet potato cubes, purple cabbage, and creamy turmeric tahini.",
    "shortDescriptionAr": "حمص جزائري محمص بالكمون والبابريكا، مكعبات بطاطا حلوة مشوية، ملفوف بنفسجي وصلصة الكركم.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Chickpea Buddha Bowl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير وعاء الحمص المشوي بالكمون والبطاطا الحلوة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Chickpea Buddha Bowl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير وعاء الحمص المشوي بالكمون والبطاطا الحلوة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d4",
    "title": "Baked Sea Bass with Fennel & Lemon",
    "titleAr": "سمك القاروص المشوي بالشمر والليمون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 320,
    "protein": 38,
    "carbs": 8,
    "fat": 14,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Whole Mediterranean sea bass baked with sliced sweet fennel bulbs, lemon rounds, and extra virgin olive oil.",
    "shortDescriptionAr": "سمك قاروص طازج مشوي بالفرن مع شرائح الشمر العطري والليمون وزيت الزيتون البكر.",
    "ingredients": [
      "Fresh wholesome ingredients for Baked Sea Bass with Fennel & Lemon",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سمك القاروص المشوي بالشمر والليمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Baked Sea Bass with Fennel & Lemon.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سمك القاروص المشوي بالشمر والليمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d5",
    "title": "Grass-Fed Beef Tenderloin & Asparagus",
    "titleAr": "فيليه لحم العجل المشوي مع الهليون الأخضر",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    "calories": 440,
    "protein": 42,
    "carbs": 6,
    "fat": 26,
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Tender grass-fed beef fillet steak pan-seared with fresh rosemary, served with charred green asparagus.",
    "shortDescriptionAr": "فيليه لحم بقري بلدي مشوي بإكليل الجبل والثوم، يقدم مع أعواد الهليون الأخضر المشوية.",
    "ingredients": [
      "Fresh wholesome ingredients for Grass-Fed Beef Tenderloin & Asparagus",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فيليه لحم العجل المشوي مع الهليون الأخضر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grass-Fed Beef Tenderloin & Asparagus.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فيليه لحم العجل المشوي مع الهليون الأخضر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d6",
    "title": "Mediterranean Shrimp Tomato Skillet",
    "titleAr": "جمبري مطهو بالطماطم الكرزية والثوم والزعتر",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 32,
    "carbs": 10,
    "fat": 12,
    "prepTime": "8 min",
    "cookTime": "10 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Wild prawns sautéed in olive oil with sweet cherry tomatoes, garlic, chili flakes, and fresh basil.",
    "shortDescriptionAr": "روبيان طازج مشوح في زيت الزيتون مع الطماطم الكرزية والثوم والريحان المنعش.",
    "ingredients": [
      "Fresh wholesome ingredients for Mediterranean Shrimp Tomato Skillet",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير جمبري مطهو بالطماطم الكرزية والثوم والزعتر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Mediterranean Shrimp Tomato Skillet.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير جمبري مطهو بالطماطم الكرزية والثوم والزعتر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d7",
    "title": "Algerian Tajine Zitoune (Olive Tajine)",
    "titleAr": "طاجين الزيتون بالدجاج المتبل والجزر",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop&q=80",
    "calories": 410,
    "protein": 36,
    "carbs": 18,
    "fat": 21,
    "prepTime": "20 min",
    "cookTime": "35 min",
    "servings": 3,
    "isPremium": false,
    "shortDescription": "Traditional slow-cooked chicken with de-salted green olives, sweet carrots, thyme, and yellow turmeric broth.",
    "shortDescriptionAr": "طاجين الزيتون الجزائري الأصيل بالدجاج والجزر والزعتر ومرق الكركم الطبيعي بدون دهون صناعية.",
    "ingredients": [
      "Fresh wholesome ingredients for Algerian Tajine Zitoune (Olive Tajine)",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين الزيتون بالدجاج المتبل والجزر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Algerian Tajine Zitoune (Olive Tajine).",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين الزيتون بالدجاج المتبل والجزر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d8",
    "title": "Roasted Eggplant & Walnut Stew",
    "titleAr": "طاجين الباذنجان المشوي بالجوز والكزبرة",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 10,
    "carbs": 28,
    "fat": 18,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Smoky roasted eggplant simmered with sweet onions, garlic, crushed walnuts, and fresh pomegranate.",
    "shortDescriptionAr": "باذنجان مشوي مطهو مع البصل المكرمل، الثوم، الجوز المجروش وعصير الرمان الطبيعي.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Eggplant & Walnut Stew",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين الباذنجان المشوي بالجوز والكزبرة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Eggplant & Walnut Stew.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين الباذنجان المشوي بالجوز والكزبرة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d9",
    "title": "Herb Roasted Half Chicken & Roots",
    "titleAr": "نصف دجاجة مشوية بالأعشاب والخضار الجذرية",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    "calories": 480,
    "protein": 44,
    "carbs": 22,
    "fat": 22,
    "prepTime": "15 min",
    "cookTime": "40 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Golden roast chicken seasoned with thyme and garlic, surrounded by roasted carrots and parsnips.",
    "shortDescriptionAr": "دجاج محمر بالفرن بالأعشاب الطبيعية والثوم مع الجزر واللفت المشوي بزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Herb Roasted Half Chicken & Roots",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير نصف دجاجة مشوية بالأعشاب والخضار الجذرية",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Herb Roasted Half Chicken & Roots.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير نصف دجاجة مشوية بالأعشاب والخضار الجذرية.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d10",
    "title": "Slow Cooked Lamb with Artichokes",
    "titleAr": "طاجين لحم الخروف الخفيف بالقرنون والجلبانة",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop&q=80",
    "calories": 450,
    "protein": 35,
    "carbs": 18,
    "fat": 25,
    "prepTime": "15 min",
    "cookTime": "45 min",
    "servings": 3,
    "isPremium": true,
    "shortDescription": "Tender lean lamb stewed with whole artichoke hearts, green sweet peas, and fresh dill.",
    "shortDescriptionAr": "لحم غنم قليل الدسم مطهو مع قلوب القرنون والبازلاء الخضراء والشبت ومرق الليمون.",
    "ingredients": [
      "Fresh wholesome ingredients for Slow Cooked Lamb with Artichokes",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين لحم الخروف الخفيف بالقرنون والجلبانة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Slow Cooked Lamb with Artichokes.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين لحم الخروف الخفيف بالقرنون والجلبانة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d11",
    "title": "Grilled Sea Bream with Sautéed Chard",
    "titleAr": "سمك الدنيس المشوي مع سلق وزيت زيتون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 330,
    "protein": 36,
    "carbs": 6,
    "fat": 16,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Whole sea bream grilled with sea salt and rosemary, plated alongside garlicky massaged Swiss chard.",
    "shortDescriptionAr": "سمك دوراد طازج مشوي بالملح البحري والروزماري ويقدم مع سلق مشوح بالثوم وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Sea Bream with Sautéed Chard",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سمك الدنيس المشوي مع سلق وزيت زيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Sea Bream with Sautéed Chard.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سمك الدنيس المشوي مع سلق وزيت زيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d12",
    "title": "Turmeric Cauliflower Lentil Dahl",
    "titleAr": "دال العدس بالكركم والقرنبيط وزيت الزيتون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
    "calories": 340,
    "protein": 18,
    "carbs": 48,
    "fat": 8,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Gentle yellow lentil dahl simmered with ginger, cumin, roasted cauliflower, and baby spinach.",
    "shortDescriptionAr": "حساء دال العدس الأصفر مع الزنجبيل الطازج والكمون وزهرات القرنبيط والسبانخ المهدئة للمعدة.",
    "ingredients": [
      "Fresh wholesome ingredients for Turmeric Cauliflower Lentil Dahl",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير دال العدس بالكركم والقرنبيط وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Turmeric Cauliflower Lentil Dahl.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير دال العدس بالكركم والقرنبيط وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d13",
    "title": "Grilled Turkey Paillard & Arugula",
    "titleAr": "شرائح الديك الرومي الرقيقة مع سلطة الجرجير",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
    "calories": 310,
    "protein": 38,
    "carbs": 4,
    "fat": 14,
    "prepTime": "8 min",
    "cookTime": "8 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Thin-pounded turkey breast seared in olive oil with capers and lemon juice over peppery wild rocket.",
    "shortDescriptionAr": "شرائح رقيقة من صدر الديك الرومي مشوحة بزيت الزيتون وعصير الليمون فوق أوراق الجرجير.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Turkey Paillard & Arugula",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح الديك الرومي الرقيقة مع سلطة الجرجير",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Turkey Paillard & Arugula.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح الديك الرومي الرقيقة مع سلطة الجرجير.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d14",
    "title": "Stuffed Zucchini Boat with Minced Beef",
    "titleAr": "قوارب الكوسا المحشوة باللحم المفروم والأعشاب",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    "calories": 330,
    "protein": 28,
    "carbs": 12,
    "fat": 17,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Hollowed fresh zucchinis stuffed with lean minced beef, tomatoes, garlic, and fresh mint.",
    "shortDescriptionAr": "كوسا طازجة محفورة ومحشوة بلحم بقري مفروم قليل الدسم والنعناع والثوم وصلصة الطماطم.",
    "ingredients": [
      "Fresh wholesome ingredients for Stuffed Zucchini Boat with Minced Beef",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير قوارب الكوسا المحشوة باللحم المفروم والأعشاب",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Stuffed Zucchini Boat with Minced Beef.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير قوارب الكوسا المحشوة باللحم المفروم والأعشاب.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d15",
    "title": "Salmon Cakes with Dill Greek Yogurt",
    "titleAr": "أقراص السلمون المخبوزة بصلصة الشبت والزبادي",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
    "calories": 350,
    "protein": 32,
    "carbs": 14,
    "fat": 18,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Oven-baked patties of wild salmon, almond flour, and green herbs served with chilled cucumber dill dip.",
    "shortDescriptionAr": "أقراص سلمون مشوية بالفرن مع طحين اللوز والأعشاب وتقدم مع صوص الزبادي اليوناني بالشبت.",
    "ingredients": [
      "Fresh wholesome ingredients for Salmon Cakes with Dill Greek Yogurt",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير أقراص السلمون المخبوزة بصلصة الشبت والزبادي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Salmon Cakes with Dill Greek Yogurt.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير أقراص السلمون المخبوزة بصلصة الشبت والزبادي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d16",
    "title": "Roasted Chicken with Sumac & Onions",
    "titleAr": "دجاج مشوي بالسماق والبصل المكرمل",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    "calories": 420,
    "protein": 38,
    "carbs": 16,
    "fat": 21,
    "prepTime": "12 min",
    "cookTime": "30 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Juicy roasted chicken pieces rubbed with tangy sumac, sweet onions, and extra virgin olive oil.",
    "shortDescriptionAr": "قطع دجاج محمرة في الفرن متبلة بالسماق البلدي وزيت الزيتون والبصل المنظم للإنسولين.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Chicken with Sumac & Onions",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير دجاج مشوي بالسماق والبصل المكرمل",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Chicken with Sumac & Onions.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير دجاج مشوي بالسماق والبصل المكرمل.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d17",
    "title": "Baked Cod in Parchment (En Papillote)",
    "titleAr": "سمك القد المخبوز في ورق الزبدة بالخضار",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 280,
    "protein": 34,
    "carbs": 8,
    "fat": 11,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Cod fillet sealed in parchment paper with julienned zucchini, bell peppers, thyme, and white wine vinegar.",
    "shortDescriptionAr": "فيليه سمك أبيض مخبوز داخل ورق الزبدة مع شرائح الكوسا والفلفل الحلو والزعتر لحفظ النكهة والعصارة.",
    "ingredients": [
      "Fresh wholesome ingredients for Baked Cod in Parchment (En Papillote)",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سمك القد المخبوز في ورق الزبدة بالخضار",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Baked Cod in Parchment (En Papillote).",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سمك القد المخبوز في ورق الزبدة بالخضار.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d18",
    "title": "Spiced Moroccan Beef Meatball Tagine",
    "titleAr": "طاجين كفتة اللحم البقري بالبيض والكمون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80",
    "calories": 410,
    "protein": 34,
    "carbs": 14,
    "fat": 23,
    "prepTime": "15 min",
    "cookTime": "20 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Spiced grass-fed beef meatballs cooked in rich tomato sauce with two poached eggs and fresh coriander.",
    "shortDescriptionAr": "كرات كفتة لحم بلدي متبلة بالكمون والبابريكا في صلصة طماطم طبيعية مع بيض مسلوق.",
    "ingredients": [
      "Fresh wholesome ingredients for Spiced Moroccan Beef Meatball Tagine",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين كفتة اللحم البقري بالبيض والكمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Spiced Moroccan Beef Meatball Tagine.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين كفتة اللحم البقري بالبيض والكمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d19",
    "title": "Warm Quinoa Veggie Stir-Fry",
    "titleAr": "سوتيه الخضار الملونة بالكينوا وزيت السمسم",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "calories": 320,
    "protein": 12,
    "carbs": 48,
    "fat": 10,
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Wok-tossed broccoli, snap peas, bell peppers and carrots combined with fluffy quinoa and ginger tamari.",
    "shortDescriptionAr": "خضار مشكلة طازجة مشوحة بزيت السمسم والزنجبيل والكينوا لوجبة عشاء نباتية خفيفة.",
    "ingredients": [
      "Fresh wholesome ingredients for Warm Quinoa Veggie Stir-Fry",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سوتيه الخضار الملونة بالكينوا وزيت السمسم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Warm Quinoa Veggie Stir-Fry.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سوتيه الخضار الملونة بالكينوا وزيت السمسم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d20",
    "title": "Grilled Lamb Chops with Mint Pesto",
    "titleAr": "ريش خروف مشوية ببيستو النعناع وزيت الزيتون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    "calories": 460,
    "protein": 36,
    "carbs": 4,
    "fat": 32,
    "prepTime": "10 min",
    "cookTime": "10 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Trimmed grass-fed lamb chops charred over grill, drizzled with homemade mint and walnut pesto.",
    "shortDescriptionAr": "قطع ريش خروف بلدي مشوية ومقدمة مع صلصة بيستو النعناع الطازج والجوز وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Grilled Lamb Chops with Mint Pesto",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير ريش خروف مشوية ببيستو النعناع وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Grilled Lamb Chops with Mint Pesto.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير ريش خروف مشوية ببيستو النعناع وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d21",
    "title": "Trout Baked with Fresh Herbs & Walnuts",
    "titleAr": "سمك التروتة المخبوز بالأعشاب والجوز",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 360,
    "protein": 34,
    "carbs": 4,
    "fat": 22,
    "prepTime": "10 min",
    "cookTime": "18 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Fresh lake trout stuffed with chopped parsley, walnuts, and lemon slices, baked until tender.",
    "shortDescriptionAr": "سمك تروتة نهري محشو بالبقدونس والجوز وشرائح الليمون ومخبوز بالفرن.",
    "ingredients": [
      "Fresh wholesome ingredients for Trout Baked with Fresh Herbs & Walnuts",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سمك التروتة المخبوز بالأعشاب والجوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Trout Baked with Fresh Herbs & Walnuts.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سمك التروتة المخبوز بالأعشاب والجوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d22",
    "title": "Braised Chicken & Cardamom Rice",
    "titleAr": "دجاج متبل مع الأرز البني بحبات الهيل",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    "calories": 430,
    "protein": 38,
    "carbs": 42,
    "fat": 13,
    "prepTime": "15 min",
    "cookTime": "30 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Skinless chicken simmered with whole green cardamom pods, cinnamon, and whole brown basmati rice.",
    "shortDescriptionAr": "دجاج مطهو ببطء مع حبات الهيل الأخضر والقرفة والأرز البني الكامل العطري.",
    "ingredients": [
      "Fresh wholesome ingredients for Braised Chicken & Cardamom Rice",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير دجاج متبل مع الأرز البني بحبات الهيل",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Braised Chicken & Cardamom Rice.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير دجاج متبل مع الأرز البني بحبات الهيل.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d23",
    "title": "Roasted Cabbage Steaks with Tahini",
    "titleAr": "شرائح الكرنب المشوية بصلصة الطحينة والليمون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 220,
    "protein": 8,
    "carbs": 22,
    "fat": 12,
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Thick green cabbage rounds roasted until caramelized edges form, drizzled with creamy garlic tahini.",
    "shortDescriptionAr": "شرائح ملفوف سميكة مشوية بالفرن حتى تتكرمل أطرافها وتسكب فوقها صلصة الطحينة بالثوم.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Cabbage Steaks with Tahini",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح الكرنب المشوية بصلصة الطحينة والليمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Cabbage Steaks with Tahini.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح الكرنب المشوية بصلصة الطحينة والليمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d24",
    "title": "Stuffed Portobello Caps with Turkey",
    "titleAr": "فطر بورتوبيلو محشو بلحم الديك الرومي المفروم",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    "calories": 290,
    "protein": 30,
    "carbs": 8,
    "fat": 14,
    "prepTime": "12 min",
    "cookTime": "20 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Large mushroom caps filled with spiced turkey mince, spinach, and grated sheep parmesan.",
    "shortDescriptionAr": "رؤوس فطر كبيرة محشوة بمفروم الديك الرومي والسبانخ وجبن البارميزان الطبيعي.",
    "ingredients": [
      "Fresh wholesome ingredients for Stuffed Portobello Caps with Turkey",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فطر بورتوبيلو محشو بلحم الديك الرومي المفروم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Stuffed Portobello Caps with Turkey.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فطر بورتوبيلو محشو بلحم الديك الرومي المفروم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d25",
    "title": "Algerian Fish Tajine with Bell Peppers",
    "titleAr": "طاجين السمك الجزائري بالفلفل الحلو والكمون",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    "calories": 350,
    "protein": 34,
    "carbs": 16,
    "fat": 16,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "White fish cutlets layered with bell peppers, tomatoes, garlic, cumin, and sliced lemons.",
    "shortDescriptionAr": "طاجين سمك بالخضار والفلفل الحلو والطماطم والشرمولة الجزائرية بالكمون وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Algerian Fish Tajine with Bell Peppers",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير طاجين السمك الجزائري بالفلفل الحلو والكمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Algerian Fish Tajine with Bell Peppers.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير طاجين السمك الجزائري بالفلفل الحلو والكمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_d26",
    "title": "Anti-Inflammatory Ginger Chicken Broth",
    "titleAr": "حساء الدجاج العلاجي بالزنجبيل والكركم",
    "category": "Dinner",
    "categoryAr": "وجبة العشاء",
    "imageUrl": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop&q=80",
    "calories": 260,
    "protein": 28,
    "carbs": 12,
    "fat": 9,
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Golden soothing chicken broth simmered with fresh grated ginger, turmeric, celery, and shredded chicken.",
    "shortDescriptionAr": "حساء دجاج دافئ غني بالزنجبيل الطازج والكركم والكرفس لتهدئة الجهاز الهضمي وتحفيز المناعة.",
    "ingredients": [
      "Fresh wholesome ingredients for Anti-Inflammatory Ginger Chicken Broth",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حساء الدجاج العلاجي بالزنجبيل والكركم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Anti-Inflammatory Ginger Chicken Broth.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حساء الدجاج العلاجي بالزنجبيل والكركم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s1",
    "title": "Almond Date Energy Bites",
    "titleAr": "كرات الطاقة باللوز والتمر والشيا",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80",
    "calories": 140,
    "protein": 5,
    "carbs": 16,
    "fat": 7,
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 12,
    "isPremium": true,
    "shortDescription": "No-bake wholesome snack balls packed with raw almonds, Medjool dates, raw cacao, and flaxseeds.",
    "shortDescriptionAr": "كرات طاقة طبيعية بدون فرن مصنوعة من تمر دقلة نور الجزائري، لوز نيء، كاكاو وبذور الكتان.",
    "ingredients": [
      "Fresh wholesome ingredients for Almond Date Energy Bites",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كرات الطاقة باللوز والتمر والشيا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Almond Date Energy Bites.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كرات الطاقة باللوز والتمر والشيا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s2",
    "title": "Chia Seed Mango Pudding",
    "titleAr": "بودينغ الشيا بحليب جوز الهند والمانجو",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=80",
    "calories": 210,
    "protein": 6,
    "carbs": 22,
    "fat": 10,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Fiber-rich chilled pudding made from chia seeds soaked in light coconut milk with fresh mango.",
    "shortDescriptionAr": "بودينغ غني بالألياف منقوع في حليب جوز الهند الطبيعي ومغطى بهريس المانجو الطازج.",
    "ingredients": [
      "Fresh wholesome ingredients for Chia Seed Mango Pudding",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بودينغ الشيا بحليب جوز الهند والمانجو",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chia Seed Mango Pudding.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بودينغ الشيا بحليب جوز الهند والمانجو.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s3",
    "title": "Crispy Spiced Roasted Chickpeas",
    "titleAr": "حمص مقرمش محمص بالكمون والبابريكا المدخنة",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 160,
    "protein": 7,
    "carbs": 22,
    "fat": 5,
    "prepTime": "5 min",
    "cookTime": "25 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Oven-roasted crunchy chickpeas tossed with extra virgin olive oil, cumin, paprika, and sea salt.",
    "shortDescriptionAr": "حمص مسلوق ومحمص بالفرن حتى القرمشة بزيت الزيتون والكمون والبابريكا كسناك غني بالألياف.",
    "ingredients": [
      "Fresh wholesome ingredients for Crispy Spiced Roasted Chickpeas",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حمص مقرمش محمص بالكمون والبابريكا المدخنة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Crispy Spiced Roasted Chickpeas.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حمص مقرمش محمص بالكمون والبابريكا المدخنة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s4",
    "title": "Cucumber Rounds with Walnut Dip",
    "titleAr": "دوائر الخيار بصلصة الجوز والثوم وزيت الزيتون",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 130,
    "protein": 4,
    "carbs": 6,
    "fat": 11,
    "prepTime": "8 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crisp cucumber slices topped with crushed walnuts, garlic, olive oil, and fresh dill.",
    "shortDescriptionAr": "شرائح خيار مقرمشة مغطاة بصوص الجوز المفروم والثوم والشبت وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Cucumber Rounds with Walnut Dip",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير دوائر الخيار بصلصة الجوز والثوم وزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Cucumber Rounds with Walnut Dip.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير دوائر الخيار بصلصة الجوز والثوم وزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s5",
    "title": "Guacamole with Seed Crackers",
    "titleAr": "غواكامولي الأفوكادو مع رقائق البذور المنزلية",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    "calories": 195,
    "protein": 5,
    "carbs": 12,
    "fat": 15,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Fresh crushed avocado with lime, cilantro, and tomatoes served with homemade chia pumpkin seed crackers.",
    "shortDescriptionAr": "أفوكادو مهروس مع الليمون والكزبرة يقدم مع مقرمشات بذور الشيا واليقطين الخالية من الغلوتين.",
    "ingredients": [
      "Fresh wholesome ingredients for Guacamole with Seed Crackers",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير غواكامولي الأفوكادو مع رقائق البذور المنزلية",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Guacamole with Seed Crackers.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير غواكامولي الأفوكادو مع رقائق البذور المنزلية.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s6",
    "title": "Raw Walnuts & Dark Chocolate Squares",
    "titleAr": "مربعات الشوكولاتة الداكنة والجوز النيء",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
    "calories": 165,
    "protein": 4,
    "carbs": 10,
    "fat": 13,
    "prepTime": "2 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Two squares of 85% antioxidant-rich dark chocolate paired with five raw walnut halves.",
    "shortDescriptionAr": "مربعان من الشوكولاتة الداكنة 85% مع 5 حبات جوز نيء لتهدئة الرغبة في السكر وتحسين المزاج.",
    "ingredients": [
      "Fresh wholesome ingredients for Raw Walnuts & Dark Chocolate Squares",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مربعات الشوكولاتة الداكنة والجوز النيء",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Raw Walnuts & Dark Chocolate Squares.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مربعات الشوكولاتة الداكنة والجوز النيء.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s7",
    "title": "Apple Slices with Almond Butter",
    "titleAr": "شرائح التفاح الأخضر بزبدة اللوز والقرفة",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=800&auto=format&fit=crop&q=80",
    "calories": 170,
    "protein": 4,
    "carbs": 20,
    "fat": 9,
    "prepTime": "4 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crisp green apple wedges dusted with Ceylon cinnamon and dipped into creamy pure almond butter.",
    "shortDescriptionAr": "شرائح تفاح أخضر مع رشة قرفة سيلانية وملعقة كبيرة من زبدة اللوز الطبيعية لتثبيت سكر الدم.",
    "ingredients": [
      "Fresh wholesome ingredients for Apple Slices with Almond Butter",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح التفاح الأخضر بزبدة اللوز والقرفة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Apple Slices with Almond Butter.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح التفاح الأخضر بزبدة اللوز والقرفة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s8",
    "title": "Boiled Egg with Paprika & Cumin",
    "titleAr": "بيضة مسلوقة بزيت الزيتون والكمون والبابريكا",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&auto=format&fit=crop&q=80",
    "calories": 110,
    "protein": 7,
    "carbs": 1,
    "fat": 8,
    "prepTime": "2 min",
    "cookTime": "8 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "One pasture-raised soft boiled egg sprinkled with cumin, smoked paprika, and a drizzle of olive oil.",
    "shortDescriptionAr": "بيضة مسلوقة طازجة متبلة بالكمون والبابريكا وقطرات زيت زيتون كوجبة بروتين سريعة.",
    "ingredients": [
      "Fresh wholesome ingredients for Boiled Egg with Paprika & Cumin",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بيضة مسلوقة بزيت الزيتون والكمون والبابريكا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Boiled Egg with Paprika & Cumin.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بيضة مسلوقة بزيت الزيتون والكمون والبابريكا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s9",
    "title": "Edamame Steamed with Sea Salt",
    "titleAr": "فول الإدامامي المطهو على البخار بالملح البحري",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "calories": 140,
    "protein": 12,
    "carbs": 10,
    "fat": 5,
    "prepTime": "3 min",
    "cookTime": "5 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Steamed whole edamame pods sprinkled with coarse mineral sea salt and chili flakes.",
    "shortDescriptionAr": "قرون إدامامي مسلوقة خفيفة بالملح البحري الخشن ورقائق الفلفل الحار غنية بالبروتين النباتي.",
    "ingredients": [
      "Fresh wholesome ingredients for Edamame Steamed with Sea Salt",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فول الإدامامي المطهو على البخار بالملح البحري",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Edamame Steamed with Sea Salt.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فول الإدامامي المطهو على البخار بالملح البحري.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s10",
    "title": "Pumpkin & Sunflower Seed Trail Mix",
    "titleAr": "خليط بذور اليقطين ودوار الشمس المحمصة",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1536510233921-8e5043fce771?w=800&auto=format&fit=crop&q=80",
    "calories": 180,
    "protein": 8,
    "carbs": 8,
    "fat": 14,
    "prepTime": "5 min",
    "cookTime": "5 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Zinc-rich mix of dry-roasted pumpkin seeds and sunflower seeds with sea salt and rosemary.",
    "shortDescriptionAr": "خليط بذور اليقطين وبذور دوار الشمس الغني بالزنك والمغنيسيوم لتنظيم هرمونات الدورة الشهرية.",
    "ingredients": [
      "Fresh wholesome ingredients for Pumpkin & Sunflower Seed Trail Mix",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير خليط بذور اليقطين ودوار الشمس المحمصة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Pumpkin & Sunflower Seed Trail Mix.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير خليط بذور اليقطين ودوار الشمس المحمصة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s11",
    "title": "Bell Pepper Strips with Hummus",
    "titleAr": "شرائح الفلفل الحلو بمسبحة الحمص بالطحينة",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "calories": 145,
    "protein": 6,
    "carbs": 18,
    "fat": 6,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crunchy red and yellow bell pepper batons served with 3 tablespoons of homemade chickpea hummus.",
    "shortDescriptionAr": "أصابع فلفل أحمر وأصفر حلو مقرمشة مع 3 ملاعق حمص بيتي بالطحينة وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Bell Pepper Strips with Hummus",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح الفلفل الحلو بمسبحة الحمص بالطحينة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Bell Pepper Strips with Hummus.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح الفلفل الحلو بمسبحة الحمص بالطحينة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s12",
    "title": "Cottage Cheese & Cinnamon Dip",
    "titleAr": "مغمس جبن القريش بالقرفة مع الفراولة",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
    "calories": 150,
    "protein": 16,
    "carbs": 12,
    "fat": 4,
    "prepTime": "3 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Whipped low-fat cottage cheese with vanilla and cinnamon, served with fresh strawberry halves.",
    "shortDescriptionAr": "جبن قريش مخفوق مع الفانيليا والقرفة ويقدم مع حبات الفراولة الطازجة كسناك بروتيني.",
    "ingredients": [
      "Fresh wholesome ingredients for Cottage Cheese & Cinnamon Dip",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مغمس جبن القريش بالقرفة مع الفراولة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Cottage Cheese & Cinnamon Dip.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مغمس جبن القريش بالقرفة مع الفراولة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s13",
    "title": "Turmeric Roasted Cashews",
    "titleAr": "كاجو محمص بالكركم وزيت جوز الهند",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1536510233921-8e5043fce771?w=800&auto=format&fit=crop&q=80",
    "calories": 175,
    "protein": 5,
    "carbs": 9,
    "fat": 14,
    "prepTime": "5 min",
    "cookTime": "10 min",
    "servings": 2,
    "isPremium": true,
    "shortDescription": "Raw cashews tossed with coconut oil, ground turmeric, black pepper, and pink Himalayan salt.",
    "shortDescriptionAr": "حبات كاجو نيئة محمصة بمسحوق الكركم والفلفل الأسود والملح الوردي.",
    "ingredients": [
      "Fresh wholesome ingredients for Turmeric Roasted Cashews",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كاجو محمص بالكركم وزيت جوز الهند",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Turmeric Roasted Cashews.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كاجو محمص بالكركم وزيت جوز الهند.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s14",
    "title": "Celery Sticks with Almond Butter",
    "titleAr": "أعواد الكرفس بزبدة اللوز وبذور الشيا",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=800&auto=format&fit=crop&q=80",
    "calories": 135,
    "protein": 4,
    "carbs": 6,
    "fat": 11,
    "prepTime": "4 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Crunchy organic celery stalks filled with smooth almond butter and sprinkled with black chia seeds.",
    "shortDescriptionAr": "أعواد كرفس طازجة محشوة بزبدة اللوز الطبيعية ومرشوشة ببذور الشيا للشبع وإدرار السوائل.",
    "ingredients": [
      "Fresh wholesome ingredients for Celery Sticks with Almond Butter",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير أعواد الكرفس بزبدة اللوز وبذور الشيا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Celery Sticks with Almond Butter.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير أعواد الكرفس بزبدة اللوز وبذور الشيا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s15",
    "title": "Steamed Artichoke with Lemon Vinaigrette",
    "titleAr": "خرشوف مطهو على البخار بصلصة الليمون",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "calories": 120,
    "protein": 4,
    "carbs": 18,
    "fat": 5,
    "prepTime": "5 min",
    "cookTime": "20 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Whole steamed artichoke leaves dipped in lemon juice, garlic, and cold-pressed olive oil.",
    "shortDescriptionAr": "أوراق خرشوف مسلوقة غنية بمركبات تنشيط إنزيمات الكبد مع صلصة الليمون وزيت الزيتون.",
    "ingredients": [
      "Fresh wholesome ingredients for Steamed Artichoke with Lemon Vinaigrette",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير خرشوف مطهو على البخار بصلصة الليمون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Steamed Artichoke with Lemon Vinaigrette.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير خرشوف مطهو على البخار بصلصة الليمون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_s16",
    "title": "Roasted Seaweed Snack Strips",
    "titleAr": "شرائح أعشاب البحر المحمصة بزيت السمسم",
    "category": "Snacks",
    "categoryAr": "سناك ووجبات خفيفة",
    "imageUrl": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
    "calories": 60,
    "protein": 2,
    "carbs": 2,
    "fat": 5,
    "prepTime": "1 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Iodine-rich roasted nori seaweed sheets lightly brushed with sesame oil and mineral salt.",
    "shortDescriptionAr": "شرائح أعشاب بحرية محمصة بزيت السمسم والملح الطبيعي غنية باليود لدعم نشاط الغدة الدرقية.",
    "ingredients": [
      "Fresh wholesome ingredients for Roasted Seaweed Snack Strips",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شرائح أعشاب البحر المحمصة بزيت السمسم",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Roasted Seaweed Snack Strips.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شرائح أعشاب البحر المحمصة بزيت السمسم.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm1",
    "title": "Wild Berry Antioxidant Smoothie",
    "titleAr": "سموذي التوت البري المنعش المضاد للأكسدة",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80",
    "calories": 220,
    "protein": 16,
    "carbs": 27,
    "fat": 4,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Antioxidant-loaded blend of frozen berries, plant protein, unsweetened almond milk and chia seeds.",
    "shortDescriptionAr": "مزيج فاخر من التوت البري المثلج، بروتين نباتي، حليب لوز وبذور الشيا لمكافحة الأكسدة.",
    "ingredients": [
      "Fresh wholesome ingredients for Wild Berry Antioxidant Smoothie",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي التوت البري المنعش المضاد للأكسدة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Wild Berry Antioxidant Smoothie.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي التوت البري المنعش المضاد للأكسدة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm2",
    "title": "Green Detox Hormone Elixir",
    "titleAr": "السموذي الأخضر المنقي للكبد والهرمونات",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&auto=format&fit=crop&q=80",
    "calories": 195,
    "protein": 10,
    "carbs": 25,
    "fat": 5,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Liver-supporting elixir with fresh spinach, green apple, ginger root, lemon, and hemp hearts.",
    "shortDescriptionAr": "مشروب داعم لإنزيمات الكبد للتخلص من فائض الهرمونات: سبانخ، تفاح أخضر، زنجبيل وبذور القنب.",
    "ingredients": [
      "Fresh wholesome ingredients for Green Detox Hormone Elixir",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير السموذي الأخضر المنقي للكبد والهرمونات",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Green Detox Hormone Elixir.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير السموذي الأخضر المنقي للكبد والهرمونات.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm3",
    "title": "Golden Turmeric Anti-Inflammatory",
    "titleAr": "سموذي الكركم الذهبي بحليب اللوز والزنجبيل",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80",
    "calories": 210,
    "protein": 8,
    "carbs": 22,
    "fat": 10,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Anti-inflammatory drink with turmeric, fresh ginger, Ceylon cinnamon, black pepper, and almond milk.",
    "shortDescriptionAr": "مشروب ذهبي بالكركم والزنجبيل الطازج والقرفة وحليب اللوز لتسكين الالتهابات وآلام الدورة.",
    "ingredients": [
      "Fresh wholesome ingredients for Golden Turmeric Anti-Inflammatory",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي الكركم الذهبي بحليب اللوز والزنجبيل",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Golden Turmeric Anti-Inflammatory.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي الكركم الذهبي بحليب اللوز والزنجبيل.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm4",
    "title": "Avocado Spinach Creamy Shake",
    "titleAr": "سموذي الأفوكادو والسبانخ المخملي بالشيا",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=800&auto=format&fit=crop&q=80",
    "calories": 250,
    "protein": 12,
    "carbs": 18,
    "fat": 16,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Silky nutrient-dense green shake made with ripe avocado, baby spinach, vanilla protein, and coconut water.",
    "shortDescriptionAr": "مخفوق أخضر حريري من الأفوكادو والسبانخ وبروتين الفانيليا وماء جوز الهند.",
    "ingredients": [
      "Fresh wholesome ingredients for Avocado Spinach Creamy Shake",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي الأفوكادو والسبانخ المخملي بالشيا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Avocado Spinach Creamy Shake.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي الأفوكادو والسبانخ المخملي بالشيا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm5",
    "title": "Raw Cacao & Maca Hormone Shake",
    "titleAr": "سموذي الكاكاو الخام وجذور الماكا",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    "calories": 240,
    "protein": 18,
    "carbs": 24,
    "fat": 8,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Energizing shake with Peruvian maca root, raw unsweetened cacao, almond milk, and plant protein.",
    "shortDescriptionAr": "سموذي هرموني بجذور الماكا والكاكاو الخام المر وحليب اللوز لتعزيز الطاقة وتنظيم التبويض.",
    "ingredients": [
      "Fresh wholesome ingredients for Raw Cacao & Maca Hormone Shake",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي الكاكاو الخام وجذور الماكا",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Raw Cacao & Maca Hormone Shake.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي الكاكاو الخام وجذور الماكا.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm6",
    "title": "Spearmint & Cucumber Bloat Relief",
    "titleAr": "مشروب النعناع المنعش والخيار المضاد للانتفاخ",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&auto=format&fit=crop&q=80",
    "calories": 90,
    "protein": 3,
    "carbs": 14,
    "fat": 2,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Hydrating blend of fresh spearmint leaves (reduces androgens), crisp cucumber, and lemon water.",
    "shortDescriptionAr": "مشروب النعناع البلدي الخافض لهرمون الأندروجين مع الخيار والليمون والماء البارد.",
    "ingredients": [
      "Fresh wholesome ingredients for Spearmint & Cucumber Bloat Relief",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مشروب النعناع المنعش والخيار المضاد للانتفاخ",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Spearmint & Cucumber Bloat Relief.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مشروب النعناع المنعش والخيار المضاد للانتفاخ.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm7",
    "title": "Papaya & Lime Digestive Smoothie",
    "titleAr": "سموذي البابايا والليمون الهضمي",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&auto=format&fit=crop&q=80",
    "calories": 180,
    "protein": 5,
    "carbs": 34,
    "fat": 3,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Enzyme-rich papaya chunks blended with lime juice, coconut water, and soaked chia seeds.",
    "shortDescriptionAr": "بابايا غنية بإنزيم الباباين مع عصير الليمون وماء جوز الهند وبذور الشيا لهضم سلس.",
    "ingredients": [
      "Fresh wholesome ingredients for Papaya & Lime Digestive Smoothie",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي البابايا والليمون الهضمي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Papaya & Lime Digestive Smoothie.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي البابايا والليمون الهضمي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm8",
    "title": "Strawberry Chia Protein Elixir",
    "titleAr": "إكسير الفراولة وبذور الشيا بالبروتين",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80",
    "calories": 230,
    "protein": 20,
    "carbs": 22,
    "fat": 6,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Fresh strawberries blended with vanilla pea protein, chia seeds, and unsweetened cashew milk.",
    "shortDescriptionAr": "فراولة طازجة مع بروتين البازلاء النباتي وبذور الشيا وحليب الكاجو غير المحلى.",
    "ingredients": [
      "Fresh wholesome ingredients for Strawberry Chia Protein Elixir",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير إكسير الفراولة وبذور الشيا بالبروتين",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Strawberry Chia Protein Elixir.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير إكسير الفراولة وبذور الشيا بالبروتين.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm9",
    "title": "Matcha Green Tea Power Shake",
    "titleAr": "مخفوق الماتشا اليابانية وحليب اللوز",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=800&auto=format&fit=crop&q=80",
    "calories": 190,
    "protein": 14,
    "carbs": 16,
    "fat": 7,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Ceremonial grade green matcha powder with almond milk, collagen peptides, and a pinch of cinnamon.",
    "shortDescriptionAr": "مسحوق شاي الماتشا الأخضر مع حليب اللوز وببتيدات الكولاجين والقرفة لتنشيط الأيض.",
    "ingredients": [
      "Fresh wholesome ingredients for Matcha Green Tea Power Shake",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مخفوق الماتشا اليابانية وحليب اللوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Matcha Green Tea Power Shake.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مخفوق الماتشا اليابانية وحليب اللوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm10",
    "title": "Blueberry Flax Collagen Smoothie",
    "titleAr": "سموذي التوت الأزرق وبذور الكتان والكولاجين",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80",
    "calories": 225,
    "protein": 18,
    "carbs": 20,
    "fat": 8,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Deep blue smoothie with antioxidant blueberries, ground golden flaxseeds, and collagen peptides.",
    "shortDescriptionAr": "توت أزرق مركز مع بذور الكتان المطحونة والكولاجين النقي لصحة البشرة وبطانة الرحم.",
    "ingredients": [
      "Fresh wholesome ingredients for Blueberry Flax Collagen Smoothie",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي التوت الأزرق وبذور الكتان والكولاجين",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Blueberry Flax Collagen Smoothie.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي التوت الأزرق وبذور الكتان والكولاجين.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm11",
    "title": "Spiced Chai Protein Smoothie",
    "titleAr": "سموذي الشاي الهندي بالقرفة والهيل والبروتين",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    "calories": 220,
    "protein": 22,
    "carbs": 16,
    "fat": 6,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Brewed chai spices (cinnamon, clove, cardamom) blended with vanilla protein and warm almond milk.",
    "shortDescriptionAr": "توابل الشاي العطرية (قرفة، قرنفل، هيل) مع بروتين الفانيليا وحليب اللوز لتعديل المزاج.",
    "ingredients": [
      "Fresh wholesome ingredients for Spiced Chai Protein Smoothie",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي الشاي الهندي بالقرفة والهيل والبروتين",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Spiced Chai Protein Smoothie.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي الشاي الهندي بالقرفة والهيل والبروتين.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm12",
    "title": "Celery Apple Morning Refresher",
    "titleAr": "عصير الكرفس والتفاح الأخضر الصباحي",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&auto=format&fit=crop&q=80",
    "calories": 110,
    "protein": 3,
    "carbs": 22,
    "fat": 1,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Pure cold-pressed whole celery stalks, half green apple, ginger thumb, and fresh lemon juice.",
    "shortDescriptionAr": "كرفس طازج مع نصف تفاحة خضراء وزنجبيل وليمون لتنشيط حركة الجهاز الهضمي صباحاً.",
    "ingredients": [
      "Fresh wholesome ingredients for Celery Apple Morning Refresher",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير عصير الكرفس والتفاح الأخضر الصباحي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Celery Apple Morning Refresher.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير عصير الكرفس والتفاح الأخضر الصباحي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm13",
    "title": "Raspberry Coconut Kefir Elixir",
    "titleAr": "مشروب كفير جوز الهند بالتوت العليق",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80",
    "calories": 200,
    "protein": 10,
    "carbs": 18,
    "fat": 9,
    "prepTime": "4 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Probiotic-loaded water or coconut kefir blended with tart raspberries and fresh mint leaves.",
    "shortDescriptionAr": "كفير جوز الهند الطبيعي الغني بالبروبيوتيك مع توت العليق والنعناع لدعم بكتيريا الأمعاء النافعة.",
    "ingredients": [
      "Fresh wholesome ingredients for Raspberry Coconut Kefir Elixir",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مشروب كفير جوز الهند بالتوت العليق",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Raspberry Coconut Kefir Elixir.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مشروب كفير جوز الهند بالتوت العليق.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm14",
    "title": "Pineapple Ginger Gut Soother",
    "titleAr": "سموذي الأناناس والزنجبيل المهدئ للمعدة",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&auto=format&fit=crop&q=80",
    "calories": 170,
    "protein": 4,
    "carbs": 32,
    "fat": 2,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": false,
    "shortDescription": "Fresh pineapple chunks containing natural bromelain enzyme blended with fresh ginger and mint.",
    "shortDescriptionAr": "أناناس طازج غني بإنزيم البروميلين المضاد للتورم مع الزنجبيل الطازج والنعناع.",
    "ingredients": [
      "Fresh wholesome ingredients for Pineapple Ginger Gut Soother",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير سموذي الأناناس والزنجبيل المهدئ للمعدة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Pineapple Ginger Gut Soother.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير سموذي الأناناس والزنجبيل المهدئ للمعدة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_sm15",
    "title": "Chocolate Almond Recovery Shake",
    "titleAr": "مخفوق الشوكولاتة واللوز بعد الرياضة",
    "category": "Smoothies",
    "categoryAr": "عصائر وسموذي",
    "imageUrl": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80",
    "calories": 260,
    "protein": 24,
    "carbs": 18,
    "fat": 10,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Post-workout recovery smoothie with chocolate protein, 1 tbsp raw almond butter, and cinnamon.",
    "shortDescriptionAr": "مخفوق استشفاء بعد التمارين ببروتين الشوكولاتة وزبدة اللوز وحليب اللوز والقرفة.",
    "ingredients": [
      "Fresh wholesome ingredients for Chocolate Almond Recovery Shake",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مخفوق الشوكولاتة واللوز بعد الرياضة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Chocolate Almond Recovery Shake.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مخفوق الشوكولاتة واللوز بعد الرياضة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de1",
    "title": "Healthy Chocolate Oat Cups",
    "titleAr": "أكواب الشوكولاتة والشوفان الداكنة الصحية",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    "calories": 185,
    "protein": 6,
    "carbs": 18,
    "fat": 10,
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 6,
    "isPremium": true,
    "shortDescription": "Mini dessert cups with oat & peanut butter crust filled with 85% dark melted chocolate and sea salt.",
    "shortDescriptionAr": "حلوى بقاعدة من الشوفان وزبدة الفول السوداني مغطاة بالشوكولاتة الداكنة 85% ورشة ملح بحري.",
    "ingredients": [
      "Fresh wholesome ingredients for Healthy Chocolate Oat Cups",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير أكواب الشوكولاتة والشوفان الداكنة الصحية",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Healthy Chocolate Oat Cups.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير أكواب الشوكولاتة والشوفان الداكنة الصحية.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de2",
    "title": "Greek Yogurt Granola Parfait",
    "titleAr": "بارفيه الزبادي اليوناني بالغرينولا المقرمشة",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&auto=format&fit=crop&q=80",
    "calories": 260,
    "protein": 18,
    "carbs": 30,
    "fat": 7,
    "prepTime": "5 min",
    "cookTime": "0 min",
    "servings": 1,
    "isPremium": true,
    "shortDescription": "Thick strained yogurt, grain-free granola, sweet pomegranate arils, and raw local honey drop.",
    "shortDescriptionAr": "كأس طبقات الزبادي اليوناني مع غرانولا المكسرات الخالية من الغلوتين وحبات الرمان والنعناع.",
    "ingredients": [
      "Fresh wholesome ingredients for Greek Yogurt Granola Parfait",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير بارفيه الزبادي اليوناني بالغرينولا المقرمشة",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Greek Yogurt Granola Parfait.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير بارفيه الزبادي اليوناني بالغرينولا المقرمشة.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de3",
    "title": "Raw Dark Chocolate Almond Bark",
    "titleAr": "ألواح الشوكولاتة الداكنة باللوز المحمص والتوت",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
    "calories": 160,
    "protein": 4,
    "carbs": 12,
    "fat": 12,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 8,
    "isPremium": false,
    "shortDescription": "Melted 85% dark chocolate slab studded with toasted raw almonds, freeze-dried raspberries, and sea salt.",
    "shortDescriptionAr": "شوكولاتة داكنة 85% مذابة وموزعة مع حبات اللوز المحمص والتوت المجفف ورقائق الملح.",
    "ingredients": [
      "Fresh wholesome ingredients for Raw Dark Chocolate Almond Bark",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير ألواح الشوكولاتة الداكنة باللوز المحمص والتوت",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Raw Dark Chocolate Almond Bark.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير ألواح الشوكولاتة الداكنة باللوز المحمص والتوت.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de4",
    "title": "Almond Flour Cinnamon Cake",
    "titleAr": "كعكة دقيق اللوز والقرفة الخفيفة بدون سكر",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80",
    "calories": 210,
    "protein": 8,
    "carbs": 14,
    "fat": 15,
    "prepTime": "15 min",
    "cookTime": "25 min",
    "servings": 8,
    "isPremium": true,
    "shortDescription": "Moist tender sponge cake made from blanched almond flour, eggs, olive oil, and fragrant Ceylon cinnamon.",
    "shortDescriptionAr": "كعكة إسفنجية طرية بدقيق اللوز والبيض وزيت الزيتون البكر والقرفة السيلانية بدون غلوتين.",
    "ingredients": [
      "Fresh wholesome ingredients for Almond Flour Cinnamon Cake",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كعكة دقيق اللوز والقرفة الخفيفة بدون سكر",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Almond Flour Cinnamon Cake.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كعكة دقيق اللوز والقرفة الخفيفة بدون سكر.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de5",
    "title": "Avocado Dark Chocolate Mousse",
    "titleAr": "موس الشوكولاتة الداكنة والأفوكادو الحريري",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80",
    "calories": 190,
    "protein": 5,
    "carbs": 16,
    "fat": 13,
    "prepTime": "10 min",
    "cookTime": "0 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Silky decant chocolate mousse made by whipping ripe avocados with raw cacao powder and vanilla.",
    "shortDescriptionAr": "موس شوكولاتة كريمي مخفوق بالأفوكادو الناضج ومسحوق الكاكاو الخام والفانيليا الطبيعية.",
    "ingredients": [
      "Fresh wholesome ingredients for Avocado Dark Chocolate Mousse",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير موس الشوكولاتة الداكنة والأفوكادو الحريري",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Avocado Dark Chocolate Mousse.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير موس الشوكولاتة الداكنة والأفوكادو الحريري.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de6",
    "title": "Cinnamon Baked Pears with Walnuts",
    "titleAr": "إجاص مخبوز بالقرفة واليانسون النجمي والجوز",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    "calories": 170,
    "protein": 3,
    "carbs": 26,
    "fat": 7,
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Halved ripe pears baked until caramelized with Ceylon cinnamon, star anise, and crushed walnuts.",
    "shortDescriptionAr": "أنصاف إجاص طازج مخبوز بالفرن مع القرفة واليانسون ورشة جوز نيء وعسل طبيعي خفيف.",
    "ingredients": [
      "Fresh wholesome ingredients for Cinnamon Baked Pears with Walnuts",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير إجاص مخبوز بالقرفة واليانسون النجمي والجوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Cinnamon Baked Pears with Walnuts.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير إجاص مخبوز بالقرفة واليانسون النجمي والجوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de7",
    "title": "Raspberry Chia Seed Jam Tarts",
    "titleAr": "تارت التوت البري ومربى الشيا الصحي",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80",
    "calories": 180,
    "protein": 5,
    "carbs": 20,
    "fat": 10,
    "prepTime": "15 min",
    "cookTime": "15 min",
    "servings": 6,
    "isPremium": true,
    "shortDescription": "Almond oat crust tartlets filled with homemade 10-minute chia raspberry compote.",
    "shortDescriptionAr": "تارت بقاعدة الشوفان واللوز محشو بمربى التوت والشيا المنزلي بدون سكر مضاف.",
    "ingredients": [
      "Fresh wholesome ingredients for Raspberry Chia Seed Jam Tarts",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير تارت التوت البري ومربى الشيا الصحي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Raspberry Chia Seed Jam Tarts.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير تارت التوت البري ومربى الشيا الصحي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de8",
    "title": "Coconut Flour Lemon Cookies",
    "titleAr": "كوكيز دقيق جوز الهند والليمون المنعش",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80",
    "calories": 140,
    "protein": 4,
    "carbs": 10,
    "fat": 10,
    "prepTime": "10 min",
    "cookTime": "12 min",
    "servings": 10,
    "isPremium": false,
    "shortDescription": "Soft low-carb cookies made from coconut flour, lemon zest, coconut oil, and organic eggs.",
    "shortDescriptionAr": "بسكويت طري من دقيق جوز الهند وقشور الليمون العطرية وزيت جوز الهند والبيض.",
    "ingredients": [
      "Fresh wholesome ingredients for Coconut Flour Lemon Cookies",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كوكيز دقيق جوز الهند والليمون المنعش",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Coconut Flour Lemon Cookies.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كوكيز دقيق جوز الهند والليمون المنعش.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de9",
    "title": "Dark Chocolate Dipped Strawberries",
    "titleAr": "حبات الفراولة المغمسة بالشوكولاتة الداكنة 85%",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
    "calories": 120,
    "protein": 2,
    "carbs": 14,
    "fat": 7,
    "prepTime": "10 min",
    "cookTime": "15 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Sweet ripe strawberries hand-dipped in melted 85% dark chocolate and chilled until crisp.",
    "shortDescriptionAr": "فراولة طازجة مغلفة بالشوكولاتة الداكنة 85% ومبردة لتشكل غلافاً مقرمشاً وغنياً بالفلافونويد.",
    "ingredients": [
      "Fresh wholesome ingredients for Dark Chocolate Dipped Strawberries",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير حبات الفراولة المغمسة بالشوكولاتة الداكنة 85%",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Dark Chocolate Dipped Strawberries.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير حبات الفراولة المغمسة بالشوكولاتة الداكنة 85%.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de10",
    "title": "Pistachio Rose Water Rice Pudding",
    "titleAr": "مهلبية الأرز البني بماء الورد والفستق",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=80",
    "calories": 195,
    "protein": 6,
    "carbs": 28,
    "fat": 7,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Creamy brown rice pudding scented with natural Algerian rose water and crushed green pistachios.",
    "shortDescriptionAr": "مهلبية خفيفة بالأرز البني وحليب اللوز وماء الورد الجزائري المهدئ ومزينة بالفستق الحلبي.",
    "ingredients": [
      "Fresh wholesome ingredients for Pistachio Rose Water Rice Pudding",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير مهلبية الأرز البني بماء الورد والفستق",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Pistachio Rose Water Rice Pudding.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير مهلبية الأرز البني بماء الورد والفستق.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de11",
    "title": "Keto Peanut Butter Fudge",
    "titleAr": "فدج زبدة الفول السوداني والشوكولاتة كيتو",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    "calories": 175,
    "protein": 6,
    "carbs": 6,
    "fat": 15,
    "prepTime": "10 min",
    "cookTime": "30 min",
    "servings": 8,
    "isPremium": true,
    "shortDescription": "Fudge bites made with 100% natural peanut butter, coconut oil, raw cacao, and sea salt.",
    "shortDescriptionAr": "مكعبات فدج طرية بزبدة الفول السوداني الطبيعية وزيت جوز الهند والكاكاو والملح البحري.",
    "ingredients": [
      "Fresh wholesome ingredients for Keto Peanut Butter Fudge",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير فدج زبدة الفول السوداني والشوكولاتة كيتو",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Keto Peanut Butter Fudge.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير فدج زبدة الفول السوداني والشوكولاتة كيتو.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de12",
    "title": "Baked Apple with Cinnamon & Pecans",
    "titleAr": "تفاح مخبوز بالفرن بالقرفة والجوز الأمريكي",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    "calories": 165,
    "protein": 2,
    "carbs": 26,
    "fat": 7,
    "prepTime": "10 min",
    "cookTime": "25 min",
    "servings": 2,
    "isPremium": false,
    "shortDescription": "Cored whole apples baked with cinnamon, cloves, raw chopped pecans, and a touch of butter.",
    "shortDescriptionAr": "تفاح بلدي مفرغ ومحشو بالقرفة والقرنفل والجوز ومخبوز حتى يصبح طرياً ومعسلاً طبيعياً.",
    "ingredients": [
      "Fresh wholesome ingredients for Baked Apple with Cinnamon & Pecans",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير تفاح مخبوز بالفرن بالقرفة والجوز الأمريكي",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Baked Apple with Cinnamon & Pecans.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير تفاح مخبوز بالفرن بالقرفة والجوز الأمريكي.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de13",
    "title": "Matcha Coconut Truffles",
    "titleAr": "كرات الماتشا وجوز الهند الخضراء",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80",
    "calories": 145,
    "protein": 3,
    "carbs": 8,
    "fat": 12,
    "prepTime": "15 min",
    "cookTime": "0 min",
    "servings": 8,
    "isPremium": true,
    "shortDescription": "No-bake truffles made from shredded coconut, coconut butter, green matcha, and vanilla.",
    "shortDescriptionAr": "كرات حلوى باردة بجوز الهند ومسحوق الماتشا الأخضر المضاد للأكسدة والفانيليا.",
    "ingredients": [
      "Fresh wholesome ingredients for Matcha Coconut Truffles",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كرات الماتشا وجوز الهند الخضراء",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Matcha Coconut Truffles.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كرات الماتشا وجوز الهند الخضراء.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de14",
    "title": "Tahini Chocolate Swirl Bark",
    "titleAr": "شوكولاتة الطحينة السائلة بزيت الزيتون",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
    "calories": 170,
    "protein": 5,
    "carbs": 10,
    "fat": 13,
    "prepTime": "10 min",
    "cookTime": "20 min",
    "servings": 6,
    "isPremium": true,
    "shortDescription": "Marble slab of dark chocolate swirled with mineral-rich sesame tahini and toasted sesame seeds.",
    "shortDescriptionAr": "ألواح شوكولاتة داكنة ممزوجة بتموجات الطحينة السمسمية الغنية بالكالسيوم والسمسم المحمص.",
    "ingredients": [
      "Fresh wholesome ingredients for Tahini Chocolate Swirl Bark",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير شوكولاتة الطحينة السائلة بزيت الزيتون",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Tahini Chocolate Swirl Bark.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير شوكولاتة الطحينة السائلة بزيت الزيتون.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  },
  {
    "id": "hr_de15",
    "title": "Blueberry Almond Crumble",
    "titleAr": "كرامبل التوت البري بدقيق الشوفان واللوز",
    "category": "Healthy Desserts",
    "categoryAr": "حلويات صحية",
    "imageUrl": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80",
    "calories": 220,
    "protein": 6,
    "carbs": 28,
    "fat": 10,
    "prepTime": "12 min",
    "cookTime": "25 min",
    "servings": 4,
    "isPremium": false,
    "shortDescription": "Warm bubbling wild blueberries topped with crisp crumble of rolled oats, almond meal, and olive oil.",
    "shortDescriptionAr": "توت بري دافئ مطهو تحت طبقة مقرمشة من الشوفان ودقيق اللوز وزيت الزيتون والقرفة.",
    "ingredients": [
      "Fresh wholesome ingredients for Blueberry Almond Crumble",
      "Extra virgin olive oil or natural healthy fats",
      "Herbs, mineral sea salt & aromatic spices"
    ],
    "ingredientsAr": [
      "المكونات الطبيعية الطازجة لتحضير كرامبل التوت البري بدقيق الشوفان واللوز",
      "زيت زيتون جزائري بكر أو دهون صحية غير مكررة",
      "أعشاب عطرية وتوابل منظمة للهرمونات وملح بحري"
    ],
    "instructions": [
      "Prepare and wash all fresh ingredients for Blueberry Almond Crumble.",
      "Combine or cook gently to preserve heat-sensitive nutrients.",
      "Plate beautifully and serve fresh for sustained metabolic health."
    ],
    "instructionsAr": [
      "جهزي ونظفي المكونات الطازجة لتحضير كرامبل التوت البري بدقيق الشوفان واللوز.",
      "اطهي المكونات على نار هادئة للحفاظ على الفيتامينات ومضادات الأكسدة.",
      "قدمي الطبق دافئاً واستمتعي بوجبة متوازنة تدعم هرموناتكِ."
    ]
  }
];
