document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    const output = document.getElementById('output');
    const emojiButton = document.getElementById('emoji-button');
    const emojiContainer = document.getElementById('emoji-container');

    // Initially hide the emoji container on page load
    emojiContainer.style.display = 'none';

    // Mapping letters and numbers to their characters
    const codeLanguage = {
        'A': '\uE001',
        'B': '\uE002',
        'C': '\uE003',
        'D': '\uE004',
        'E': '\uE005',
        'F': '\uE006',
        'G': '\uE007',
        'H': '\uE008',
        'I': '\uE009',
        'J': '\uE010',
        'K': '\uE011',
        'L': '\uE012',
        'M': '\uE013',
        'N': '\uE014',
        'O': '\uE015',
        'P': '\uE016',
        'Q': '\uE017',
        'R': '\u1018',
        'S': '\uE019',
        'T': '\uE020',
        'U': '\uE021',
        'V': '\uE022',
        'W': '\uE023',
        'X': '\uE024',
        'Y': '\uE025',
        'Z': '\uE026',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    };

    let delTimer;

    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const letter = key.textContent.trim();

            if (letter === 'del') {
                delTimer = setTimeout(() => {
                    output.innerHTML = ''; // Clear entire output
                }, 1000); // Time in milliseconds to hold down before clearing
            }
        });

        key.addEventListener('mouseup', () => {
            if (delTimer) {
                clearTimeout(delTimer); // Cancel the long-press action if released early
                delTimer = null;
            }
        });

        key.addEventListener('mouseleave', () => {
            if (delTimer) {
                clearTimeout(delTimer); // Cancel the long-press action if the cursor leaves the button
                delTimer = null;
            }
        });

        key.addEventListener('click', () => {
            const letter = key.textContent.trim();

            if (letter === 'del') {
                output.innerHTML = output.innerHTML.slice(0, -1); // Remove last character
            } else if (letter === '➠') {
                output.innerHTML += ' '; // Add a single space
            } else if (letter === '⏬') {
                output.innerHTML += '<br>'; // Add a newline using <br>
            } else {
                const symbol = codeLanguage[letter];
                if (symbol) {
                    output.innerHTML += symbol; // Add the corresponding symbol
                }
            }
        });
    });

    // Emoji button functionality
    emojiButton.addEventListener('click', () => {
        if (emojiContainer.style.display === 'none' || emojiContainer.style.display === '') {
            emojiContainer.style.display = 'grid'; // Show emoji container
        } else {
            emojiContainer.style.display = 'none'; // Hide emoji container
        }
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        if (codeLanguage[key]) {
            output.innerHTML += codeLanguage[key];
        } else if (key === 'BACKSPACE') {
            output.innerHTML = output.innerHTML.slice(0, -1);
        } else if (key === 'ENTER') {
            output.innerHTML += '<br>';
        } else if (key === ' ') {
            output.innerHTML += ' ';
        }
    });

    // Save to local storage
    function saveOutput() {
        localStorage.setItem('keyboardOutput', output.innerHTML);
    }

    // Load from local storage
    function loadOutput() {
        const savedOutput = localStorage.getItem('keyboardOutput');
        if (savedOutput) {
            output.innerHTML = savedOutput;
        }
    }

    // Add event listener for emoji clicks
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            output.innerHTML += emoji.textContent; // Add emoji to output
            emojiContainer.style.display = 'none'; // Hide emoji container after selection
        });
    });
});