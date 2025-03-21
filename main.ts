// Define el tipo de tarjeta de vocabulario
interface VocabularyCard {
  hiragana: string;
  kanji: string;
  romaji: string;
  pronunciation: string;
}

// Datos de ejemplo para las tarjetas de vocabulario
const flashcards: VocabularyCard[] = [
  {
      hiragana: 'こんにちは',
      kanji: '今日は',
      romaji: 'Konnichiwa',
      pronunciation: 'kon-ni-chi-wa',
  },
  {
      hiragana: 'ありがとう',
      kanji: 'ありがとう',
      romaji: 'Arigatou',
      pronunciation: 'a-ri-ga-tou',
  },
  {
      hiragana: 'さようなら',
      kanji: 'さようなら',
      romaji: 'Sayounara',
      pronunciation: 'sa-yo-u-na-ra',
  },
  {
      hiragana: 'おはよう',
      kanji: 'お早う',
      romaji: 'Ohayou',
      pronunciation: 'o-ha-yo-u',
  },
  {
      hiragana: 'すみません',
      kanji: '済みません',
      romaji: 'Sumimasen',
      pronunciation: 'su-mi-ma-sen',
  },
  {
      hiragana: 'いただきます',
      kanji: '頂きます',
      romaji: 'Itadakimasu',
      pronunciation: 'i-ta-da-ki-ma-su',
  },
  {
      hiragana: 'ごちそうさま',
      kanji: 'ご馳走様',
      romaji: 'Gochisousama',
      pronunciation: 'go-chi-so-u-sa-ma',
  },
  {
      hiragana: 'おやすみなさい',
      kanji: 'お休みなさい',
      romaji: 'Oyasuminasai',
      pronunciation: 'o-ya-su-mi-na-sa-i',
  },
  {
      hiragana: 'はじめまして',
      kanji: '初めまして',
      romaji: 'Hajimemashite',
      pronunciation: 'ha-ji-me-ma-shi-te',
  },
  {
      hiragana: 'またね',
      kanji: 'またね',
      romaji: 'Matane',
      pronunciation: 'ma-ta-ne',
  },
];

// Mapa de hiragana a romaji para cada carácter individual
const hiraganaToRomaji: { [key: string]: string } = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'っ': '*', // Carácter pequeño que duplica la consonante siguiente
  'ー': '-', // Vocal alargada
  '、': ',', // Coma japonesa
  '。': '.', // Punto japonés
  '　': ' ', // Espacio japonés
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', // Caracteres pequeños para combinaciones
  '!': '!', '?': '?', '・': '·', // Otros caracteres comunes
  '今': 'kon', '日': 'nichi' // Kanji para konnichiwa
};

class FlashcardApp {
  private currentCardIndex: number = 0;
  private results: boolean[] = [];
  private appElement: HTMLElement;
  private hasAnsweredCurrentCard: boolean = false;

  constructor() {
      this.appElement = document.getElementById('app') as HTMLElement;

      // Inicializar con algunas respuestas simuladas para mostrar el contador
      this.results = [true, false, false];

      this.initializeApp();
  }

  private initializeApp(): void {
      this.renderApp();
      this.attachEventListeners();
  }

  private renderApp(): void {
      this.appElement.innerHTML = `
          <header>
              <h1>日本語</h1>
              <p>Practica tu vocabulario japonés</p>
          </header>
          <div class="flashcard">
              <div class="progress-container">
                  <div class="progress-text">Tarjeta ${this.currentCardIndex + 1} de ${flashcards.length}</div>
                  <div class="progress-marks">
                      ${this.renderProgressMarks()}
                  </div>
              </div>
              <div class="japanese-characters">
                  <div class="hiragana-container">
                      ${this.renderHiraganaWithPronunciation(flashcards[this.currentCardIndex].hiragana)}
                  </div>
                  <div class="kanji">${flashcards[this.currentCardIndex].kanji}</div>
              </div>
              <div class="romaji">${flashcards[this.currentCardIndex].romaji}</div>
              <div class="pronunciation">${flashcards[this.currentCardIndex].pronunciation}</div>
              <div class="navigation">
                  <button class="nav-button prev-button" ${this.currentCardIndex === 0 ? 'disabled' : ''}>Anterior</button>
                  <button class="nav-button next-button" ${this.currentCardIndex === flashcards.length - 1 || !this.hasAnsweredCurrentCard ? 'disabled' : ''}>Siguiente</button>
              </div>
          </div>
          <div class="feedback-buttons">
              <button class="know-button">✓ Lo sé</button>
              <button class="dont-know-button">✕ No lo sé</button>
          </div>
          <button class="reset-button">↺ Reiniciar estadísticas</button>
      `;
  }

  private renderHiraganaWithPronunciation(hiragana: string): string {
      let result = '';

      // Para manejar caracteres especiales como combinaciones (きゃ)
      let skipNext = false;

      for (let i = 0; i < hiragana.length; i++) {
          if (skipNext) {
              skipNext = false;
              continue;
          }

          const char = hiragana[i];
          const nextChar = i + 1 < hiragana.length ? hiragana[i + 1] : '';
          let romaji = '';

          // Verificar si es una combinación de dos caracteres
          if (nextChar && (nextChar === 'ゃ' || nextChar === 'ゅ' || nextChar === 'ょ')) {
              const combo = char + nextChar;
              romaji = hiraganaToRomaji[combo] || (hiraganaToRomaji[char] + hiraganaToRomaji[nextChar]);
              skipNext = true;
          } else {
              romaji = hiraganaToRomaji[char] || char;
          }

          // Crear el elemento con romaji encima del hiragana
          result += `
              <div class="hiragana-char">
                  <span class="hiragana-romaji">${romaji}</span>
                  <span class="hiragana-symbol">${char}</span>
              </div>
          `;
      }

      return result;
  }

  private renderProgressMarks(): string {
      // Contar respuestas correctas e incorrectas
      const correctCount = this.results.filter(result => result === true).length;
      const incorrectCount = this.results.filter(result => result === false).length;

      // Formar la cadena con el formato ✓X ✕Y donde el número tiene el mismo color que el símbolo
      let marks = '';
      if (correctCount > 0) {
          marks += `<span class="mark correct">✓${correctCount}</span> `;
      }
      if (incorrectCount > 0) {
          marks += `<span class="mark incorrect">✕${incorrectCount}</span>`;
      }
      return marks;
  }

  private attachEventListeners(): void {
      const prevButton = document.querySelector('.prev-button') as HTMLButtonElement;
      const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
      const knowButton = document.querySelector('.know-button') as HTMLButtonElement;
      const dontKnowButton = document.querySelector('.dont-know-button') as HTMLButtonElement;
      const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;

      prevButton.addEventListener('click', () => this.navigateToPreviousCard());
      nextButton.addEventListener('click', () => this.navigateToNextCard());

      knowButton.addEventListener('click', () => {
          this.recordResult(true);
          this.hasAnsweredCurrentCard = true;
          // Automáticamente ir a la siguiente tarjeta si no es la última
          if (this.currentCardIndex < flashcards.length - 1) {
              this.navigateToNextCard();
          } else {
              // Si es la última tarjeta, simplemente actualizar la UI
              this.renderApp();
              this.attachEventListeners();
          }
      });

      dontKnowButton.addEventListener('click', () => {
          this.recordResult(false);
          this.hasAnsweredCurrentCard = true;
          // Automáticamente ir a la siguiente tarjeta si no es la última
          if (this.currentCardIndex < flashcards.length - 1) {
              this.navigateToNextCard();
          } else {
              // Si es la última tarjeta, simplemente actualizar la UI
              this.renderApp();
              this.attachEventListeners();
          }
      });

      resetButton.addEventListener('click', () => this.resetStatistics());
  }

  private navigateToPreviousCard(): void {
      if (this.currentCardIndex > 0) {
          this.currentCardIndex--;
          this.hasAnsweredCurrentCard = this.results.length > this.currentCardIndex;
          this.renderApp();
          this.attachEventListeners();
      }
  }

  private navigateToNextCard(): void {
      if (this.currentCardIndex < flashcards.length - 1 && this.hasAnsweredCurrentCard) {
          this.currentCardIndex++;
          this.hasAnsweredCurrentCard = this.results.length > this.currentCardIndex;
          this.renderApp();
          this.attachEventListeners();
      }
  }

  private recordResult(isCorrect: boolean): void {
      if (this.results.length <= this.currentCardIndex) {
          this.results.push(isCorrect);
      } else {
          this.results[this.currentCardIndex] = isCorrect;
      }
      this.renderApp();
      this.attachEventListeners();
  }

  private resetStatistics(): void {
      this.results = [];
      this.currentCardIndex = 0;  // Volver a la primera tarjeta
      this.hasAnsweredCurrentCard = false;  // Reiniciar estado de respuesta
      this.renderApp();
      this.attachEventListeners();
  }
}

// Inicializa la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  new FlashcardApp();
});