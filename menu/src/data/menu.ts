import type { MenuItem } from "../types"

/*
  Image placeholders:
  - Replace image URLs with local files in public/images/
  - File naming: kebab-case matching item name, e.g. mixed-grill.jpg
  - Then update the image field to: "/images/mixed-grill.jpg"
*/

export const categories = [
  { id: "all", name: "الكل", icon: "🍽" },
  { id: "grills", name: "المشويات", icon: "🔥" },
  { id: "pizza", name: "البيتزا", icon: "🍕" },
  { id: "burger", name: "البرجر", icon: "🍔" },
  { id: "starters", name: "المقبلات", icon: "🥗" },
  { id: "drinks", name: "المشروبات", icon: "🥤" },
  { id: "desserts", name: "الحلويات", icon: "🍰" },
]

export const menuItems: MenuItem[] = [
  {
    id: 1, cat: "grills", name: "مشوى اللحم المشكل",
    desc: "تشكيلة من أشهى اللحوم المشوية على الفحم مع الأعشاب الطازجة",
    price: 85, badge: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
  },
  {
    id: 2, cat: "grills", name: "دجاج مشوي بالأعشاب",
    desc: "دجاج طازج متبل بالأعشاب الشرقية ومشوي على نار هادئة",
    price: 55, badge: null,
    image: "https://images.unsplash.com/photo-1598515213692-b49d27af6438?w=400&q=80",
  },
  {
    id: 3, cat: "grills", name: "كباب العجل الفاخر",
    desc: "كباب من لحم العجل الطازج مع البهارات الخاصة",
    price: 70, badge: "جديد",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80",
  },
  {
    id: 4, cat: "pizza", name: "بيتزا مارجريتا",
    desc: "عجينة إيطالية مع صلصة طماطم وجبنة موتزاريلا طازجة",
    price: 35, badge: null,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
  },
  {
    id: 5, cat: "pizza", name: "بيتزا اللحم الفاخرة",
    desc: "بيتزا غنية بقطع اللحم والخضروات الطازجة والجبن المذاب",
    price: 50, badge: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  },
  {
    id: 6, cat: "pizza", name: "بيتزا الدجاج والفطر",
    desc: "قطع دجاج مشوية مع فطر طازج وجبنة أربع أنواع",
    price: 45, badge: null,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80",
  },
  {
    id: 7, cat: "burger", name: "برجر كلاسيك النافورة",
    desc: "برجر لحم بقري طازج مع خس وطماطم وصلصة خاصة",
    price: 28, badge: null,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: 8, cat: "burger", name: "دبل تشيز برجر",
    desc: "طبقتان من اللحم مع جبنة شيدر مزدوجة وخيار مخلل",
    price: 38, badge: "جديد",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
  },
  {
    id: 9, cat: "burger", name: "برجر الدجاج المقرمش",
    desc: "قطعة دجاج مقرمشة مع صلصة رانش والخضروات الطازجة",
    price: 25, badge: null,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
  },
  {
    id: 10, cat: "starters", name: "حمص بالطحينة",
    desc: "حمص كريمي مع طحينة أصيلة وزيت زيتون بكر ممتاز",
    price: 12, badge: null,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80",
  },
  {
    id: 11, cat: "starters", name: "فتوش الحديقة",
    desc: "سلطة فتوش طازجة بالخضروات المتنوعة والخبز المحمص",
    price: 15, badge: null,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: 12, cat: "starters", name: "سبرينج رول بالدجاج",
    desc: "رول مقرمش محشو بالدجاج والخضروات المتبلة الشهية",
    price: 20, badge: "جديد",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=400&q=80",
  },
  {
    id: 13, cat: "drinks", name: "عصير تفاح طازج",
    desc: "عصير تفاح طازج مع نعناع ولمسة ليمون منعشة",
    price: 8, badge: null,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80",
  },
  {
    id: 14, cat: "drinks", name: "لاتيه الكراميل",
    desc: "قهوة لاتيه كريمية مع صلصة الكراميل والرغوة الناعمة",
    price: 12, badge: null,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
  {
    id: 15, cat: "drinks", name: "موهيتو ليمون ونعناع",
    desc: "مشروب منعش بالليمون والنعناع الطازج والماء الفوار",
    price: 10, badge: "مشهور",
    image: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400&q=80",
  },
  {
    id: 16, cat: "desserts", name: "كنافة بالجبن",
    desc: "كنافة شرقية أصيلة بالجبن العكاوي والعجينة المقرمشة",
    price: 18, badge: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
  },
  {
    id: 17, cat: "desserts", name: "تشيز كيك بالتوت",
    desc: "تشيز كيك كريمي بالجبن الطازج وصلصة التوت الأحمر",
    price: 22, badge: null,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
  },
  {
    id: 18, cat: "desserts", name: "براوني الشوكولا الساخن",
    desc: "براوني طازج من الفرن مع آيس كريم الفانيليا وصلصة الشوكولا",
    price: 20, badge: "جديد",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
  },
]
