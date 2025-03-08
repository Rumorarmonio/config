export function backToTop(): void {
  const button: Element | null = document.querySelector('.back-to-top')

  if (!button) {
    return
  }

  window.onscroll = (): void => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      button.classList.add('visible')
    } else {
      button.classList.remove('visible')
    }
  }

  button.addEventListener('click', (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}
