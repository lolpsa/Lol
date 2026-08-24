// ================= НАСТРОЙКИ =================
const SCORE_CORRECT = 10;
const SCORE_WRONG = -5;
const BACKGROUND_IMAGE_URL = 'https://ibb.co/svpzDxys'; // замените на прямую ссылку или локальный путь

// ================= ДАННЫЕ КАТЕГОРИЙ =================
const categories = [
  { id: 'dairy', name: 'Молочные продукты', emoji: '🥛' },
  { id: 'bread', name: 'Хлеб', emoji: '🍞' },
  { id: 'fruits', name: 'Фрукты', emoji: '🍎' },
  { id: 'vegetables', name: 'Овощи', emoji: '🥕' },
  { id: 'drinks', name: 'Напитки', emoji: '🥤' }
];

// ================= ДАННЫЕ ПОЛОК =================
const shelvesData = categories.map(cat => ({
  id: `shelf-${cat.id}`,
  category: cat.id,
  name: cat.name
}));

// ================= ДАННЫЕ ТОВАРОВ =================
const productsData = [
  // Молочные продукты
  { id: 'milk', name: 'Молоко', category: 'dairy', emoji: '🥛', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Milk_glass.jpg/120px-Milk_glass.jpg' },
  { id: 'kefir', name: 'Кефир', category: 'dairy', emoji: '🥛', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Kefir.jpg/120px-Kefir.jpg' },
  { id: 'yogurt', name: 'Йогурт', category: 'dairy', emoji: '🥣', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Yogurt.jpg/120px-Yogurt.jpg' },
  { id: 'cheese', name: 'Сыр', category: 'dairy', emoji: '🧀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cheese_001.jpg/120px-Cheese_001.jpg' },

  // Хлеб
  { id: 'white-bread', name: 'Белый хлеб', category: 'bread', emoji: '🍞', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bread_roll.jpg/120px-Bread_roll.jpg' },
  { id: 'baguette', name: 'Батон', category: 'bread', emoji: '🥖', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Baguette.jpg/120px-Baguette.jpg' },
  { id: 'bun', name: 'Булочка', category: 'bread', emoji: '🥐', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Bread_roll.jpg/120px-Bread_roll.jpg' },
  { id: 'sliced-bread', name: 'Хлеб нарезной', category: 'bread', emoji: '🍞', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Toast_bread.jpg/120px-Toast_bread.jpg' },

  // Фрукты
  { id: 'apple', name: 'Яблоко', category: 'fruits', emoji: '🍎', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/120px-Red_Apple.jpg' },
  { id: 'banana', name: 'Банан', category: 'fruits', emoji: '🍌', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/120px-Banana-Single.jpg' },
  { id: 'orange', name: 'Апельсин', category: 'fruits', emoji: '🍊', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/120px-Orange-Fruit-Pieces.jpg' },
  { id: 'pear', name: 'Груша', category: 'fruits', emoji: '🍐', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pear.jpg/120px-Pear.jpg' },

  // Овощи
  { id: 'tomato', name: 'Помидор', category: 'vegetables', emoji: '🍅', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/120px-Tomato_je.jpg' },
  { id: 'cucumber', name: 'Огурец', category: 'vegetables', emoji: '🥒', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Cucumber_from_Denmark.jpg/120px-Cucumber_from_Denmark.jpg' },
  { id: 'potato', name: 'Картофель', category: 'vegetables', emoji: '🥔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/120px-Patates.jpg' },
  { id: 'carrot', name: 'Морковь', category: 'vegetables', emoji: '🥕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Carrot.jpg/120px-Carrot.jpg' },

  // Напитки
  { id: 'water', name: 'Вода', category: 'drinks', emoji: '💧', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Water_bottle.jpg/120px-Water_bottle.jpg' },
  { id: 'juice', name: 'Сок', category: 'drinks', emoji: '🧃', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Orange_juice_1.jpg/120px-Orange_juice_1.jpg' },
  { id: 'soda', name: 'Газированная вода', category: 'drinks', emoji: '🥤', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Soda_water.jpg/120px-Soda_water.jpg' },
  { id: 'milk-drink', name: 'Молочный напиток', category: 'drinks', emoji: '🥛', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Milkshake.jpg/120px-Milkshake.jpg' }
];

// ================= СОСТОЯНИЕ ИГРЫ =================
let currentScore = 0;
let remainingProducts = productsData.length;
let currentLevel = 1;
let dragState = null; // { originalElement, cloneElement, startX, startY, offsetX, offsetY, originalParent, nextSibling }

// DOM элементы
const shelvesContainer = document.getElementById('shelves-container');
const productList = document.getElementById('product-list');
const scoreDisplay = document.getElementById('score');
const remainingDisplay = document.getElementById('remaining');
const levelDisplay = document.getElementById('level');
const finalScoreDisplay = document.getElementById('final-score');
const levelCompleteModal = document.getElementById('level-complete-modal');
const restartButton = document.getElementById('restart-button');

// ================= ИНИЦИАЛИЗАЦИЯ =================
function initGame() {
  // Устанавливаем фон
  document.getElementById('game-container').style.backgroundImage = `url('${BACKGROUND_IMAGE_URL}')`;

  // Создаём полки
  shelvesData.forEach(shelf => {
    const shelfEl = createShelfElement(shelf);
    shelvesContainer.appendChild(shelfEl);
  });

  // Создаём товары
  productsData.forEach(product => {
    const productEl = createProductElement(product);
    productList.appendChild(productEl);
  });

  // Обновляем UI
  updateUI();
}

function createShelfElement(shelfData) {
  const shelf = document.createElement('div');
  shelf.className = 'shelf';
  shelf.id = shelfData.id;
  shelf.dataset.category = shelfData.category;

  const header = document.createElement('div');
  header.className = 'shelf-header';
  header.textContent = shelfData.name;
  shelf.appendChild(header);

  const items = document.createElement('div');
  items.className = 'shelf-items';
  shelf.appendChild(items);

  return shelf;
}

function createProductElement(productData) {
  const product = document.createElement('div');
  product.className = 'product';
  product.id = `product-${productData.id}`;
  product.dataset.category = productData.category;
  product.dataset.id = productData.id;

  // Изображение
  const img = document.createElement('img');
  img.src = productData.image;
  img.alt = productData.name;
  img.draggable = false;
  img.addEventListener('error', () => {
    // Если изображение не загрузилось, заменяем на эмодзи
    img.remove();
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'emoji';
    emojiSpan.textContent = productData.emoji;
    product.prepend(emojiSpan);
  });
  product.appendChild(img);

  // Название
  const name = document.createElement('span');
  name.className = 'product-name';
  name.textContent = productData.name;
  product.appendChild(name);

  // Обработчик начала перетаскивания
  product.addEventListener('pointerdown', onPointerDown);

  return product;
}

// ================= ОБРАБОТЧИКИ ПЕРЕТАСКИВАНИЯ =================
function onPointerDown(event) {
  event.preventDefault();
  const productElement = event.currentTarget;

  // Нельзя перетаскивать уже размещённый товар
  if (productElement.classList.contains('placed')) return;

  // Получаем координаты
  const rect = productElement.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Создаём клон
  const clone = productElement.cloneNode(true);
  clone.classList.add('dragging');
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  document.body.appendChild(clone);

  // Скрываем оригинал
  productElement.style.opacity = '0.3';

  // Сохраняем состояние
  dragState = {
    originalElement: productElement,
    cloneElement: clone,
    offsetX,
    offsetY,
    originalParent: productElement.parentNode,
    nextSibling: productElement.nextSibling
  };

  // Добавляем обработчики движения и отпускания
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);
}

function onPointerMove(event) {
  if (!dragState) return;

  const { cloneElement, offsetX, offsetY } = dragState;
  cloneElement.style.left = `${event.clientX - offsetX}px`;
  cloneElement.style.top = `${event.clientY - offsetY}px`;

  // Подсветка полки под курсором
  highlightShelfAtPoint(event.clientX, event.clientY);
}

function onPointerUp(event) {
  if (!dragState) return;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('pointercancel', onPointerUp);

  const { originalElement, cloneElement, originalParent, nextSibling } = dragState;

  // Сброс подсветки
  clearHighlights();

  // Находим полку под курсором
  const shelf = getShelfAtPoint(event.clientX, event.clientY);

  if (shelf && shelf.dataset.category === originalElement.dataset.category) {
    // Правильное размещение
    placeProduct(originalElement, cloneElement, shelf);
  } else {
    // Неправильное размещение
    returnProduct(originalElement, cloneElement, originalParent, nextSibling);
  }

  // Очищаем состояние
  dragState = null;
}

function highlightShelfAtPoint(x, y) {
  // Убираем подсветку со всех полок
  clearHighlights();

  const shelf = getShelfAtPoint(x, y);
  if (shelf) {
    shelf.classList.add('highlight');
  }
}

function clearHighlights() {
  document.querySelectorAll('.shelf.highlight').forEach(shelf => {
    shelf.classList.remove('highlight');
  });
}

function getShelfAtPoint(x, y) {
  const shelves = document.querySelectorAll('.shelf');
  for (const shelf of shelves) {
    const rect = shelf.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return shelf;
    }
  }
  return null;
}

// ================= РАЗМЕЩЕНИЕ ТОВАРА =================
function placeProduct(originalElement, cloneElement, shelfElement) {
  // Удаляем оригинал из трея
  originalElement.remove();

  // Преобразуем клон в размещённый товар
  cloneElement.classList.remove('dragging');
  cloneElement.classList.add('placed', 'success-pop');
  cloneElement.style.position = '';
  cloneElement.style.left = '';
  cloneElement.style.top = '';
  cloneElement.style.width = '';
  cloneElement.style.height = '';
  cloneElement.style.opacity = '1';
  cloneElement.style.zIndex = '';

  // Убираем обработчик pointerdown (на клоне его и так нет)
  // Добавляем в контейнер полки
  const itemsContainer = shelfElement.querySelector('.shelf-items');
  itemsContainer.appendChild(cloneElement);

  // Через короткое время убираем анимацию
  setTimeout(() => {
    cloneElement.classList.remove('success-pop');
  }, 300);

  // Обновляем счёт и количество оставшихся
  currentScore += SCORE_CORRECT;
  remainingProducts--;
  updateUI();

  // Проверка завершения уровня
  if (remainingProducts === 0) {
    showLevelComplete();
  }
}

function returnProduct(originalElement, cloneElement, originalParent, nextSibling) {
  // Удаляем клон
  cloneElement.remove();

  // Показываем оригинал
  originalElement.style.opacity = '1';

  // Возвращаем на место (если оно изменилось)
  if (nextSibling && nextSibling.parentNode === originalParent) {
    originalParent.insertBefore(originalElement, nextSibling);
  } else {
    originalParent.appendChild(originalElement);
  }

  // Анимация ошибки
  originalElement.classList.add('shake');
  setTimeout(() => {
    originalElement.classList.remove('shake');
  }, 400);

  // Штраф
  currentScore = Math.max(0, currentScore + SCORE_WRONG); // не уходим в минус
  updateUI();
}

// ================= ОБНОВЛЕНИЕ UI =================
function updateUI() {
  scoreDisplay.textContent = `Очки: ${currentScore}`;
  remainingDisplay.textContent = `Осталось: ${remainingProducts}`;
  levelDisplay.textContent = `Уровень: ${currentLevel}`;
}

// ================= ЗАВЕРШЕНИЕ УРОВНЯ =================
function showLevelComplete() {
  finalScoreDisplay.textContent = currentScore;
  levelCompleteModal.classList.remove('hidden');
}

restartButton.addEventListener('click', () => {
  // Простейший способ перезапустить игру – перезагрузить страницу
  location.reload();
});

// ================= СТАРТ ИГРЫ =================
window.addEventListener('DOMContentLoaded', initGame);