export function logoHover(): void {
  const logos: NodeListOf<HTMLElement> = document.querySelectorAll('.logo')

  if (!logos.length) {
    return
  }

  logos.forEach((logo: HTMLElement): void => {
    const groups: NodeListOf<HTMLElement> = logo.querySelectorAll('.logo__group')

    groups.forEach((group: HTMLElement): void => {
      const child: HTMLElement = group.childNodes[3] as HTMLElement

      child.addEventListener('animationend', (event: AnimationEvent): void => {
        group.classList.remove('hover')
      })

      group.addEventListener('mouseover', (event: MouseEvent): void => {
        if (group.classList.contains('hover')) {
          return
        }

        group.classList.add('hover')
      })
    })
  })
}
