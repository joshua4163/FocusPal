module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          mono: ['Fira Code', 'monospace'],
        },
        colors: {
          background: '#1e1e1e',
          surface: '#252526',
          neonBlue: '#9cdcfe',
          neonGreen: '#4ec9b0',
          neonRed: '#d16969',
        },
        boxShadow: {
          glow: '0 0 10px rgba(0, 255, 255, 0.2)',
        },
      },
    },
    plugins: [],
  }
  