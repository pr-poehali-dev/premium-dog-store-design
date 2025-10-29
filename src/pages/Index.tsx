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
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: 1, name: 'Премиум ошейник', price: 3500, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d8f926e1-9b87-47d1-a7fa-1cbd626a7bb4.jpg', category: 'Аксессуары' },
  { id: 2, name: 'Лежанка люкс', price: 8900, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d8f926e1-9b87-47d1-a7fa-1cbd626a7bb4.jpg', category: 'Для отдыха' },
  { id: 3, name: 'Керамическая миска', price: 2400, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d8f926e1-9b87-47d1-a7fa-1cbd626a7bb4.jpg', category: 'Аксессуары' },
  { id: 4, name: 'Игрушка эко', price: 1200, image: 'https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d8f926e1-9b87-47d1-a7fa-1cbd626a7bb4.jpg', category: 'Игрушки' },
];

const reviews = [
  { name: 'Анна К.', text: 'Потрясающее качество! Моя Луна в восторге от новой лежанки.', rating: 5 },
  { name: 'Дмитрий П.', text: 'Быстрая доставка, отличное обслуживание. Рекомендую!', rating: 5 },
  { name: 'Елена М.', text: 'Стильные и качественные товары для моего друга.', rating: 5 },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

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
          src="https://cdn.poehali.dev/projects/149af3ea-bead-4a3d-b0ab-c8d224f705f5/files/d8f926e1-9b87-47d1-a7fa-1cbd626a7bb4.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold">
            Премиум для <br />вашего друга
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Стильные аксессуары и качественные товары для счастливой жизни вашей собаки
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Популярные товары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
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
