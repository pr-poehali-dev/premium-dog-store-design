import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  breed: string[];
  size: string[];
  age: string[];
  petType: 'dog' | 'cat';
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: 1, name: 'Премиум ошейник', price: 3500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/c103c22f-f8c3-4af7-81e0-2a5710814301.jpg', category: 'Аксессуары', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 2, name: 'Лежанка люкс', price: 8900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/327c93ae-e94f-47a1-aa44-b9aa794e7d6a.jpg', category: 'Для отдыха', breed: ['Крупные', 'Средние'], size: ['M', 'L', 'XL'], age: ['Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 3, name: 'Керамическая миска', price: 2400, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/1fe48415-063b-4c09-b28f-acf6cbcc39aa.jpg', category: 'Аксессуары', breed: ['Все породы'], size: ['S', 'M'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 4, name: 'Игрушка эко', price: 1200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/c69bf895-1254-4f74-9550-9098122fa596.jpg', category: 'Игрушки', breed: ['Мелкие', 'Средние'], size: ['S', 'M'], age: ['Щенок', 'Взрослая'], petType: 'dog' },
  { id: 5, name: 'Поводок кожаный', price: 4200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/4c06a2b6-e196-45b1-ad8c-bb4552731885.jpg', category: 'Аксессуары', breed: ['Крупные', 'Средние'], size: ['M', 'L'], age: ['Взрослая'], petType: 'dog' },
  { id: 6, name: 'Корм премиум', price: 5500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/3d1f69da-e5cb-4d74-b803-38d3b7db9f9d.jpg', category: 'Питание', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Взрослая'], petType: 'dog' },
  { id: 7, name: 'Переноска люкс', price: 12900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/83b96ac7-549b-4b4e-8bb1-cb29221f521e.jpg', category: 'Для путешествий', breed: ['Мелкие', 'Средние'], size: ['S', 'M'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 8, name: 'Щетка массажная', price: 1800, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/60d6d69b-8f5f-4cd6-999a-c023d0583033.jpg', category: 'Уход', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 9, name: 'Шампунь органический', price: 890, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/f51f3204-178e-4939-82b2-5e7aea442489.jpg', category: 'Уход', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 10, name: 'Домик-будка премиум', price: 15900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d61e9230-a532-4af9-b74d-5b1ad9a971ad.jpg', category: 'Для отдыха', breed: ['Мелкие', 'Средние'], size: ['S', 'M'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 11, name: 'Намордник мягкий', price: 2100, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/0fd1ffa3-06d5-454d-ac76-502353759b58.jpg', category: 'Аксессуары', breed: ['Крупные', 'Средние'], size: ['M', 'L', 'XL'], age: ['Взрослая'], petType: 'dog' },
  { id: 12, name: 'Лакомства для зубов', price: 650, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/250d3e93-1c67-49fd-a7f4-c0d34efa33cb.jpg', category: 'Питание', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 13, name: 'Одежда для холодов', price: 4800, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/a8dcfe7b-ab94-4350-9c91-468118652aea.jpg', category: 'Аксессуары', breed: ['Мелкие', 'Средние'], size: ['S', 'M'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 14, name: 'Автогамак в машину', price: 6900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/51d3a8f5-f562-4d25-8b0a-e8dc9547e5af.jpg', category: 'Для путешествий', breed: ['Крупные', 'Средние'], size: ['M', 'L', 'XL'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 15, name: 'Интерактивная игрушка', price: 2900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/2987d57a-5496-4e2b-b203-8fcf94ad6cc3.jpg', category: 'Игрушки', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Щенок', 'Взрослая'], petType: 'dog' },
  { id: 16, name: 'GPS-трекер', price: 7500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/cf1d0969-6251-4123-af82-c35439ebb0e7.jpg', category: 'Аксессуары', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 17, name: 'Ортопедическая лежанка', price: 11900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/327c93ae-e94f-47a1-aa44-b9aa794e7d6a.jpg', category: 'Для отдыха', breed: ['Крупные'], size: ['L', 'XL'], age: ['Пожилая'], petType: 'dog' },
  { id: 18, name: 'Миска с подставкой', price: 3200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/1fe48415-063b-4c09-b28f-acf6cbcc39aa.jpg', category: 'Аксессуары', breed: ['Крупные', 'Средние'], size: ['M', 'L'], age: ['Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 19, name: 'Набор игрушек', price: 2100, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/c69bf895-1254-4f74-9550-9098122fa596.jpg', category: 'Игрушки', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Щенок', 'Взрослая'], petType: 'dog' },
  { id: 20, name: 'Рулетка-поводок', price: 3800, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/4c06a2b6-e196-45b1-ad8c-bb4552731885.jpg', category: 'Аксессуары', breed: ['Средние', 'Крупные'], size: ['M', 'L'], age: ['Взрослая'], petType: 'dog' },
  { id: 21, name: 'Витамины для щенков', price: 1450, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/3d1f69da-e5cb-4d74-b803-38d3b7db9f9d.jpg', category: 'Питание', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Щенок'], petType: 'dog' },
  { id: 22, name: 'Переноска авиа', price: 16900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/83b96ac7-549b-4b4e-8bb1-cb29221f521e.jpg', category: 'Для путешествий', breed: ['Мелкие', 'Средние'], size: ['S', 'M'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 23, name: 'Когтерезка профи', price: 1200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/60d6d69b-8f5f-4cd6-999a-c023d0583033.jpg', category: 'Уход', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Щенок', 'Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 24, name: 'Кондиционер для шерсти', price: 1090, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/f51f3204-178e-4939-82b2-5e7aea442489.jpg', category: 'Уход', breed: ['Все породы'], size: ['S', 'M', 'L', 'XL'], age: ['Взрослая', 'Пожилая'], petType: 'dog' },
  { id: 25, name: 'Когтеточка премиум', price: 4500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/32bcfd6c-1451-40af-9f04-3d26f5f9c6ba.jpg', category: 'Аксессуары', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
  { id: 26, name: 'Лоток закрытый', price: 3900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/62e0f631-cc08-4371-a23d-e6cd8cdbb990.jpg', category: 'Для гигиены', breed: ['Все породы'], size: ['M', 'L'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
  { id: 27, name: 'Игрушка с перьями', price: 890, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/65a2feff-86bc-47f6-85d9-cfefea3fbe81.jpg', category: 'Игрушки', breed: ['Все породы'], size: ['S'], age: ['Котенок', 'Взрослая'], petType: 'cat' },
  { id: 28, name: 'Наполнитель древесный', price: 1200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/538596b3-3b41-4fba-ad47-2759c2374370.jpg', category: 'Для гигиены', breed: ['Все породы'], size: ['S', 'M', 'L'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
  { id: 29, name: 'Корм для котят', price: 4800, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/23af362e-092a-4dcd-8582-5b061023919e.jpg', category: 'Питание', breed: ['Все породы'], size: ['S', 'M'], age: ['Котенок'], petType: 'cat' },
  { id: 30, name: 'Лежанка-домик для кошек', price: 6900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/f2eae6f6-21c4-4964-8ae8-a0b50916fee5.jpg', category: 'Для отдыха', breed: ['Все породы'], size: ['S', 'M'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
  { id: 31, name: 'Щетка-пуходерка', price: 1500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/90953836-6f31-4c37-aae0-115cd96eb29b.jpg', category: 'Уход', breed: ['Все породы'], size: ['S', 'M'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
  { id: 32, name: 'Переноска мягкая', price: 5900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/83b96ac7-549b-4b4e-8bb1-cb29221f521e.jpg', category: 'Для путешествий', breed: ['Все породы'], size: ['S', 'M'], age: ['Котенок', 'Взрослая', 'Пожилая'], petType: 'cat' },
];

const reviews = [
  { name: 'Анна К.', text: 'Потрясающее качество! Моя Луна в восторге от новой лежанки.', rating: 5 },
  { name: 'Дмитрий П.', text: 'Быстрая доставка, отличное обслуживание. Рекомендую!', rating: 5 },
  { name: 'Елена М.', text: 'Стильные и качественные товары для моего друга.', rating: 5 },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<string>('Все');
  const [selectedSize, setSelectedSize] = useState<string>('Все');
  const [selectedAge, setSelectedAge] = useState<string>('Все');
  const [selectedPetType, setSelectedPetType] = useState<'dog' | 'cat'>('dog');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const petTypeMatch = product.petType === selectedPetType;
    const breedMatch = selectedBreed === 'Все' || product.breed.includes(selectedBreed) || product.breed.includes('Все породы');
    const sizeMatch = selectedSize === 'Все' || product.size.includes(selectedSize);
    const ageMatch = selectedAge === 'Все' || product.age.includes(selectedAge);
    return petTypeMatch && breedMatch && sizeMatch && ageMatch;
  });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">PawLuxe</h1>
          <Sheet open={isOrderOpen} onOpenChange={setIsOrderOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-6">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4 flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)} className="ml-auto">
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold mb-6">
                        <span>Итого:</span>
                        <span>{total.toLocaleString()} ₽</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Ваше имя" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" placeholder="+7 (___) ___-__-__" />
                        </div>
                        <div>
                          <Label htmlFor="address">Адрес доставки</Label>
                          <Input id="address" placeholder="Город, улица, дом" />
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/20" />
        <img
          src="https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/6d6fa8a9-e892-41d8-bd40-6acdf8c0115d.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-contain object-center opacity-20"
        />
        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold">
            Премиум для <br />вашего друга
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Стильные аксессуары и качественные товары для счастливой жизни ваших питомцев
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-8">Популярные товары</h2>
        
        <Card className="max-w-4xl mx-auto mb-12">
          <CardContent className="p-6">
            <div className="mb-6">
              <Label className="text-sm font-semibold mb-3 block">Питомец</Label>
              <div className="flex gap-3">
                <Button
                  variant={selectedPetType === 'dog' ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => {
                    setSelectedPetType('dog');
                    setSelectedBreed('Все');
                    setSelectedAge('Все');
                  }}
                  className="flex-1"
                >
                  <Icon name="Dog" className="mr-2" size={20} />
                  Собаки
                </Button>
                <Button
                  variant={selectedPetType === 'cat' ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => {
                    setSelectedPetType('cat');
                    setSelectedBreed('Все');
                    setSelectedAge('Все');
                  }}
                  className="flex-1"
                >
                  <Icon name="Cat" className="mr-2" size={20} />
                  Кошки
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">Порода</Label>
                <div className="flex flex-wrap gap-2">
                  {['Все', 'Мелкие', 'Средние', 'Крупные'].map(breed => (
                    <Button
                      key={breed}
                      variant={selectedBreed === breed ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedBreed(breed)}
                    >
                      {breed}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold mb-2 block">Размер</Label>
                <div className="flex flex-wrap gap-2">
                  {['Все', 'S', 'M', 'L', 'XL'].map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold mb-2 block">Возраст</Label>
                <div className="flex flex-wrap gap-2">
                  {(selectedPetType === 'dog' 
                    ? ['Все', 'Щенок', 'Взрослая', 'Пожилая']
                    : ['Все', 'Котенок', 'Взрослая', 'Пожилая']
                  ).map(age => (
                    <Button
                      key={age}
                      variant={selectedAge === age ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedAge(age)}
                    >
                      {age}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {(selectedBreed !== 'Все' || selectedSize !== 'Все' || selectedAge !== 'Все') && (
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено товаров: {filteredProducts.length}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedBreed('Все');
                    setSelectedSize('Все');
                    setSelectedAge('Все');
                  }}
                >
                  <Icon name="X" size={16} className="mr-1" />
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden group hover-scale cursor-pointer transition-all">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 space-y-3">
                <Badge variant="secondary">{product.category}</Badge>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                  <Button onClick={() => addToCart(product)}>
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center space-y-6">
            <Icon name="Mail" size={48} className="mx-auto text-primary" />
            <h2 className="text-3xl font-bold">Подпишитесь на рассылку</h2>
            <p className="text-muted-foreground">
              Получайте эксклюзивные предложения и новости о новых коллекциях
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input placeholder="Ваш email" type="email" />
              <Button>Подписаться</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold">PawLuxe</h3>
          <p className="text-primary-foreground/80">Премиум товары для собак с любовью</p>
          <div className="flex justify-center gap-6 pt-4">
            <Icon name="Instagram" size={24} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <Icon name="Facebook" size={24} className="cursor-pointer hover:opacity-80 transition-opacity" />
            <Icon name="Twitter" size={24} className="cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>
      </footer>
    </div>
  );
}