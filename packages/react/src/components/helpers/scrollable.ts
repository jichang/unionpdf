export function isScrollableElem(elem: HTMLElement) {
  const isScrollable = elem.scrollHeight !== elem.clientHeight;
  const isOverflowHidden = getComputedStyle(elem).overflowY.includes('hidden');

  return isScrollable || isOverflowHidden;
}

export function findScollableContainer(
  elem: HTMLElement
): HTMLElement | Window {
  if (isScrollableElem(elem)) {
    return elem;
  }

  let parentElement: HTMLElement | null = elem.parentElement;
  if (!parentElement || parentElement === document.body) {
    return window;
  }

  if (isScrollableElem(parentElement)) {
    return parentElement;
  }

  return findScollableContainer(parentElement);
}

export function calculateScrollOffset(
  from: HTMLElement,
  to: HTMLElement | Window
) {
  if (to === window) {
    const rect = from.getBoundingClientRect();
    return rect.y + window.scrollY;
  }

  return 0;
}
