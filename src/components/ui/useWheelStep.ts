import { useRef, useEffect, useState } from 'react';

interface WheelStepOptions {
  onStep: (direction: 1 | -1) => void;
}

export function useWheelStep<T extends HTMLElement>({ onStep }: WheelStepOptions) {
  const ref = useRef<T>(null);
  const onStepRef = useRef(onStep);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    onStepRef.current = onStep;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onFocusIn = () => setFocused(true);
    const onFocusOut = () => setFocused(false);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    return () => {
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  useEffect(() => {
    if (!focused) return;
    const el = ref.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      onStepRef.current(e.deltaY < 0 ? 1 : -1);
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [focused]);

  return ref;
}
