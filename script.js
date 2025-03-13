// Переключение темы
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('.icon');

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Обработчик переключения
toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
});

// Сокращение ссылок с помощью TinyURL API
const shortenBtn = document.getElementById('shorten-btn');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');
const shortUrlSpan = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copy-btn');

async function shortenUrl() {
    const longUrl = longUrlInput.value.trim();
    if (!longUrl || !longUrl.match(/^https?:\/\//)) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }

    resultDiv.style.display = 'none';
    shortenBtn.textContent = 'Shortening...';
    shortenBtn.disabled = true;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        const shortUrl = await response.text();

        if (shortUrl === 'Error' || !shortUrl.startsWith('https://tinyurl.com/')) {
            throw new Error('Failed to shorten URL');
        }

        shortUrlSpan.textContent = shortUrl;
        resultDiv.style.display = 'block';
    } catch (error) {
        shortUrlSpan.textContent = 'Error shortening URL';
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    } finally {
        shortenBtn.textContent = 'Shorten';
        shortenBtn.disabled = false;
    }
}

shortenBtn.addEventListener('click', shortenUrl);

// Копирование короткой ссылки
copyBtn.addEventListener('click', () => {
    const shortUrl = shortUrlSpan.textContent;
    navigator.clipboard.writeText(shortUrl).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy URL');
    });
});

// Копирование Bitcoin-адреса
const copyBtcButton = document.querySelector('.btc-address .copy-btn');
copyBtcButton.addEventListener('click', () => {
    const btcCode = document.getElementById('btc-code').textContent;
    navigator.clipboard.writeText(btcCode).then(() => {
        copyBtcButton.textContent = 'Copied!';
        setTimeout(() => {
            copyBtcButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
