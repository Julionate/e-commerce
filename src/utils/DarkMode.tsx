const darkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
    } else {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
    }
}

export default darkMode