1. **Event Propagation** - это механизм распространения событий в DOM дереве. Он состоит из трех фаз:

- Capture - событие движется от window к целевому элементу
- Target - событие достигает целевого элемента
- Bubbling - событие поднимается обратно к window

На практике ,в основном, используются 3 типа действий:

- Делегирование через e.target.closest('.item').remove();
- Остановка событий e.stopPropagation(), e.stopImmediatePropagation();
- Предотвращение действия по умолчанию e.preventDefault();

2. **Promise** - это результат асинхронной операции, обёртка над значением, которое будет доступно в будущем.

Promise создаётся с помощью конструктора, внутрь передаётся функция, которой доступны аргументы resolve и reject.
Может иметь 3 состояния: pending, fulfilled, rejected.
Результаты можно обрабатывать через then/catcn или async/await/

Способы обработки асинхронности помимо promise - callbacks, generators, eventEmmiter, DOMevents.

JavaScript - однопоточный язык и выполнять асинхронные операции может благодаря Event Loop(цикл событий).

- выполняет код в стеке (call stack)
- ожидает окончания async-операций (например, запросов)
- когда операция завершена — помещает callback или продолжение промиса в очередь:

1. microtask queue → .then(), await
2. macrotask queue → setTimeout, DOM events

- когда стек свободен — берёт элемент из очереди и выполняет.

3. **ООП в JS**
   Основные принципы:

- Инкапсуляция - сокрытие внутренней реализации

```class BankAccount {
  #balance = 0; // Приватное поле

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

- Наследование - создание иерархии классов

```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} издает звук`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} лает`);
  }
}
```

- Полиморфизм - разные реализации одного интерфейса

```
class Cat extends Animal {
  speak() {
    console.log(`${this.name} мяукает`);
  }
}

const animals = [new Dog('Рекс'), new Cat('Мурка')];
animals.forEach(animal => animal.speak()); // Разное поведение
```

- Абстракция - упрощение сложных систем

```class Car {
  startEngine() {
    this.#checkFuel();
    this.#ignite();
    console.log('Двигатель запущен');
  }

  #checkFuel() { /* сложная логика */ }
  #ignite() { /* сложная логика */ }
}

```

## Цель ООП — упростить проектирование больших систем через моделирование, инкапсуляцию, переиспользование и расширяемость.

JavaScript — прототипно-ориентированный язык, а не классически-классовый (как Java/C++). Но начиная с ES6 в языке появился синтаксический сахар class, который делает ООП-модель более привычной.

## механизмы и паттерны

В JS объекты имеют ссылку на прототип (prototype). Когда вы пытаетесь получить свойство у объекта, JS ищет его сначала в самом объекте, потом в его прототипе, потом в прототипе прототипа и т.д. — это цепочка прототипов (prototype chain).

ES6 class — синтаксический сахар над прототипами, который упрощает запись, но под капотом использует прототипы.

Ключевые моменты class:

- методы объявленные в теле класса помещаются в prototype, а не в сам объект (экономно по памяти).
- extends реализует наследование: прототип подкласса указывает на прототип родителя.
- super — позволяет вызывать конструктор/методы родителя.
- class нельзя вызвать без new (внутренне использует new.target).
- приватные поля и методы.
- геттеры/сеттеры.

4. **Обработка URL браузером** -

- Ввод URL и парсинг.
- Проверка кэшей браузера(DNS, HTTP, Service Worker, Prefetch cache).
- DNS lookup

```
1. Проверка HOSTS файла
2. Кэш DNS браузера
3. Кэш DNS операционной системы
4. Рекурсивные запросы к DNS серверам:
   - Root DNS servers (.)
   - TLD servers (.com)
   - Authoritative DNS servers (example.com)
```

- Установка TCP соединения
- Отправка HTTP запроса
- Обработка на сервере и получение ответа
- Парсинг HTML и построение DOM (Токенизация, Построение DOM tree)
- Обработка CSS и построение CSSOM
- Создание Render Tree
- Layout (Reflow)
- Paint (Отрисовка)
- Composition (Композитинг)

### Как можно ускорить процесс?

- Кэширование
- Content Delivery Network
- HTTP/2 и HTTP/3
- Preload и Resource Hints
- Оптимизация загрузки JavaScript
- Оптимизация изображений

#### Проблемы безопасности

- CORS (Cross-Origin Resource Sharing)
- Content Security Policy (CSP)
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)

#### Проблемы междоменного взаимодействия

1. Same-Origin Policy(Разные origin не могут взаимодействовать напрямую).
2. Cookie Restrictions(Куки привязаны к домену).
3. LocalStorage и SessionStorage(Изоляция по origin).
4. Iframe Security
