/**********************************************
 *  Константы и DOM-ссылки
 **********************************************/
const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

const CANVAS_WIDTH = 1530;
const CANVAS_HEIGHT = 2040;

/* Пути к папкам */
const bgFolder = 'assets/background/';
const textFolder = 'assets/text/';
const imageFolder = 'assets/image/';

/* Файлы: фон от 1 до 5, текст от 1 до 10.
   Для изображений: все файлы от 1 до 16, где:
   1-7: люди, 8-11: растения, 12-16: абстрактные фигуры */
const bgFiles = ['1.png', '2.png', '3.png', '4.png', '5.png'];
const textFiles = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'];
const imageFiles = ['1.png','2.png','3.png','4.png','5.png','6.png','7.png',  // люди
                    '8.png','9.png','10.png','11.png',                    // растения
                    '12.png','13.png','14.png','15.png','16.png'];         // абстрактные

/**********************************************
 *  Функция загрузки изображения (возвращает Promise)
 **********************************************/
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

/**********************************************
 *  Случайный выбор из массива
 **********************************************/
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**********************************************
 *  Функция, определяющая случайное количество изображений:
 *  50% шанс – 1 изображение, 50% шанс – 2 изображения.
 **********************************************/
function getRandomImages() {
  const count = Math.random() < 0.5 ? 1 : 2;
  const chosen = [];
  for (let i = 0; i < count; i++) {
    chosen.push(randomFromArray(imageFiles));
  }
  return chosen;
}

/**********************************************
 *  Генерация постера:
 *  1. Загружается случайный фон (из bgFolder)
 *  2. Загружается 1 или 2 случайных изображения из imageFolder
 *  3. Загружается случайный текст (из textFolder)
 *  4. Все слои отрисовываются на Canvas с композицией, где изображения могут выходить за пределы,
 *     но обрезаются по границе постера.
 **********************************************/
async function generatePoster() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  try {
    // Выбор случайных файлов:
    const bgSrc = bgFolder + randomFromArray(bgFiles);
    const textSrc = textFolder + randomFromArray(textFiles);
    const selectedImages = getRandomImages();
    const imageSrcs = selectedImages.map(file => imageFolder + file);

    // Загрузка всех слоев:
    const [bgImg, textImg, ...otherImgs] = await Promise.all([
      loadImage(bgSrc),
      loadImage(textSrc),
      ...imageSrcs.map(src => loadImage(src))
    ]);

    /**********************************
     *  Рендеринг слоёв:
     **********************************/
    // 1. Фон: заполняет весь Canvas
    ctx.drawImage(bgImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Изображения (один или два):
    if (otherImgs.length === 1) {
      // Если одно изображение – центрируем его с масштабированием
      const scale = 0.6; // коэффициент масштабирования (60% от ширины Canvas)
      const imgWidth = bgImg.width * scale;
      const imgHeight = bgImg.height * scale;
      const x = (CANVAS_WIDTH - imgWidth) / 2;
      const y = (CANVAS_HEIGHT - imgHeight) / 2;
      ctx.drawImage(otherImgs[0], x, y, imgWidth, imgHeight);
    } else if (otherImgs.length === 2) {
      // Если два изображения – размещаем их по бокам с небольшим перекрытием
      const scale = 0.5; // изображения будут меньше
      // Для первого изображения:
      const img1Width = otherImgs[0].width * scale;
      const img1Height = otherImgs[0].height * scale;
      const x1 = CANVAS_WIDTH * 0.15; // немного отступ слева
      const y1 = (CANVAS_HEIGHT - img1Height) / 2;
      ctx.drawImage(otherImgs[0], x1, y1, img1Width, img1Height);
      
      // Для второго изображения:
      const img2Width = otherImgs[1].width * scale;
      const img2Height = otherImgs[1].height * scale;
      const x2 = CANVAS_WIDTH * 0.55; // немного отступ справа\n      const y2 = (CANVAS_HEIGHT - img2Height) / 2;
      ctx.drawImage(otherImgs[1], x2, y2, img2Width, img2Height);
    }

    // 3. Текст: размещаем внизу, по центру, можно масштабировать по необходимости
    // Предположим, текстовое изображение будет помещено в нижнюю часть постера:
    const textWidth = CANVAS_WIDTH * 0.8;
    const textHeight = (textImg.height / textImg.width) * textWidth;
    const textX = (CANVAS_WIDTH - textWidth) / 2;
    const textY = CANVAS_HEIGHT - textHeight - 50; // отступ снизу
    ctx.drawImage(textImg, textX, textY, textWidth, textHeight);

    // Всё, что выходит за пределы Canvas, обрезается автоматически.
  } catch (err) {
    console.error('Error generating poster:', err);
  }
}

/**********************************************
 *  Функция для скачивания итогового изображения
 **********************************************/
function downloadPoster() {
  const link = document.createElement('a');
  link.download = 'robatic_geroinzo_poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**********************************************
 *  Обработчики событий
 **********************************************/
generateBtn.addEventListener('click', generatePoster);
downloadBtn.addEventListener('click', downloadPoster);

// Генерация постера при загрузке страницы (опционально)
window.addEventListener('load', generatePoster);
