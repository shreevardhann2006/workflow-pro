/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-main)',
                card: 'var(--bg-card)',
                muted: 'var(--text-muted)',
                border: 'var(--border)',
                foreground: 'var(--text-main)',
            }
        },
    },
    plugins: [],
}
