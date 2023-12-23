(() => {
  const appDiv: HTMLDivElement = document.querySelector('#App')!;
  const starSvgTemplate = document.querySelector<HTMLTemplateElement>('template')!;
  let lastAdded = { x: 0, y: 0 };
  const distance = 25;
  const starColors = ['249 146 253', '252 254 255'];
  const starSizes = ['1.4rem', '1rem', '0.6rem'];
  const starAnimations = ['star-fall-1', 'star-fall-2', 'star-fall-3'];

  function getRandomValue(ar: string[]) {
    const randomIndex = Math.floor(Math.random() * ar.length);
    return ar[randomIndex];
  }

  function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return distance;
  }

  function createStar(x: number, y: number) {
    const fragment = starSvgTemplate.content.cloneNode(true) as DocumentFragment;
    const star = fragment.children[0] as SVGElement;
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationName = getRandomValue(starAnimations);
    star.style.animationDuration = 'var(--star-animation-ms)';
    star.style.color = `rgb(${getRandomValue(starColors)})`;
    star.style.width = star.style.height = getRandomValue(starSizes);
    return star;
  }

  function createBlurStep(x: number, y: number) {
    const step = document.createElement('span');
    step.classList.add('blur-shadow');
    step.style.left = `${x}px`;
    step.style.top = `${y}px`;
    return step;
  }

  function handleMove(e: MouseEvent) {
    const { offsetX: x, offsetY: y } = e;

    const shadow = createBlurStep(x, y);
    appDiv.appendChild(shadow);

    setTimeout(() => {
      shadow.remove();
    }, 75);

    if (calculateDistance(x, y, lastAdded.x, lastAdded.y) < distance) {
      return;
    }

    lastAdded = { x, y };

    const star = createStar(x, y);
    appDiv.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1100);
  }

  appDiv.addEventListener('mousemove', handleMove);
})();
