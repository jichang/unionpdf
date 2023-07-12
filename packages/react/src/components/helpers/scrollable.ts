/**
 * Check whether elem is scrollable
 * @param elem - target elem
 * @returns whether elem is scrollable
 */
export function isScrollableElem(elem: HTMLElement) {
  const isScrollable = elem.scrollHeight !== elem.clientHeight;
  const isOverflowHidden = getComputedStyle(elem).overflowY.includes('hidden');

  return isScrollable || isOverflowHidden;
}

/**
 * Find the closest scrollable container
 * @param elem - source element
 * @returns closest scrollable container
 */
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
