interface IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverEntry {
  readonly isIntersecting: boolean;
  readonly intersectionRatio: number;
  readonly target: Element;
}

interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

export class IntersectionObserver {
  constructor(
    private func: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {}
  root = null;
  rootMargin = '';
  thresholds = [];
  observe(element: Element) {
    this.func(
      [
        {
          isIntersecting: true,
          target: element,
          intersectionRatio: 0,
        },
      ],
      this
    );
  }

  unobserve() {
    return null;
  }
}
