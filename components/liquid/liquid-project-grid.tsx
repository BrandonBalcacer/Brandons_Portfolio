"use client";

// The DOM half of the vgpu "Liquid Layout" example, applied to the project
// cards. On a desktop with WebGPU the cards sit on liquid glass and can be
// dragged to swap places; the glass bridges cards that pass each other.
// Everywhere else this renders the plain grid.

import { LayoutGroup, motion, useDragControls, useMotionValue, useSpring, useTransform, useVelocity, type PanInfo } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type MouseEvent, type ReactNode, type RefObject } from "react";

import { createCardRegistry, type CardRegistry } from "./layout-store";

export interface LiquidItem {
  readonly id: string;
  readonly node: ReactNode;
}

const CAPABLE_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/** Pointer travel before a press becomes a drag, so a shaky click still clicks. */
const DRAG_THRESHOLD = 8;
const SPRING = { type: "spring", stiffness: 170, damping: 21 } as const;

function subscribeCapability(listener: () => void) {
  const query = window.matchMedia(CAPABLE_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

const isCapable = () => "gpu" in navigator && window.matchMedia(CAPABLE_QUERY).matches;
const isCapableOnServer = () => false;

function moveItem(order: readonly string[], id: string, to: number): string[] {
  const next = order.filter((item) => item !== id);
  next.splice(to, 0, id);
  return next;
}

interface CardProps {
  readonly item: LiquidItem;
  readonly hue: number;
  readonly active: boolean;
  readonly registry: CardRegistry;
  readonly grid: RefObject<HTMLDivElement | null>;
  readonly onHover: (draggedId: string, point: { x: number; y: number }) => void;
}

function LiquidCard({ item, hue, active, registry, grid, onHover }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const tilt = useTransform(useVelocity(x), [-1800, 1800], [-4, 4], { clamp: true });
  const rotate = useSpring(tilt, { stiffness: 320, damping: 24 });
  const element = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const [raised, setRaised] = useState(false);
  const hover = useMotionValue(0);
  const controls = useDragControls();

  useLayoutEffect(
    () => registry.register({ id: item.id, hue, element: element.current, x, y, scale, rotate, hover }),
    [registry, item.id, hue, x, y, scale, rotate, hover],
  );

  const onDrag = (_event: unknown, info: PanInfo) => {
    const box = grid.current?.getBoundingClientRect();
    if (box) onHover(item.id, { x: info.point.x - window.scrollX - box.left, y: info.point.y - window.scrollY - box.top });
  };

  // The click that ends a drag must not follow the card's link.
  const onClickCapture = (event: MouseEvent) => {
    // detail 0 is a keyboard activation, which never ends a drag.
    if (!dragged.current || event.detail === 0) return;
    dragged.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <motion.div
      ref={element}
      data-card={item.id}
      className="liquid-slot"
      data-raised={raised || undefined}
      layout={active}
      drag={active}
      // Framer skips drags that begin on a link, and a link covers each card, so
      // the wrapper starts the drag itself. A press without movement still clicks.
      dragListener={false}
      dragControls={controls}
      dragSnapToOrigin
      whileHover={active ? { scale: 1.012 } : undefined}
      whileDrag={{ scale: 1.03 }}
      transition={{ layout: SPRING }}
      onHoverStart={() => hover.set(1)}
      onHoverEnd={() => hover.set(0)}
      onPointerDown={(event) => {
        dragged.current = false;
        if (active && event.button === 0) controls.start(event, { distanceThreshold: DRAG_THRESHOLD });
      }}
      onDragStart={() => {
        dragged.current = true;
        setRaised(true);
      }}
      onDrag={onDrag}
      onDragTransitionEnd={() => setRaised(false)}
      onClickCapture={onClickCapture}
      style={{ x, y, scale, rotate, zIndex: raised ? 3 : 1 }}
    >
      {item.node}
    </motion.div>
  );
}

export function LiquidProjectGrid({ items }: { items: readonly LiquidItem[] }) {
  const capable = useSyncExternalStore(subscribeCapability, isCapable, isCapableOnServer);
  const [registry] = useState(createCardRegistry);
  const [order, setOrder] = useState(() => items.map((item) => item.id));
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const enabled = capable && !failed;
  const active = enabled && ready;

  useEffect(() => {
    const target = canvas.current;
    const container = grid.current;
    if (!enabled || !target || !container) return;
    let cancelled = false;
    let renderer: { dispose: () => void } | undefined;
    const fail = (error: unknown) => {
      console.warn("Liquid cards disabled, showing plain cards.", error);
      setFailed(true);
    };
    // Loaded on demand so phones never download the WebGPU code.
    import("./renderer")
      .then(({ createRenderer }) => {
        if (cancelled) return;
        renderer = createRenderer({ canvas: target, container, registry, onReady: () => setReady(true), onError: fail });
      })
      .catch(fail);
    return () => {
      cancelled = true;
      renderer?.dispose();
      setReady(false);
    };
  }, [enabled, registry]);

  // Swap with whichever slot is under the pointer. offsetLeft/Top ignore the
  // transforms of cards still in flight, so a moving card cannot cause flicker.
  const onHover = (draggedId: string, point: { x: number; y: number }) => {
    const slots = Array.from(grid.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []);
    const index = slots.findIndex((slot) =>
      point.x >= slot.offsetLeft && point.x <= slot.offsetLeft + slot.offsetWidth &&
      point.y >= slot.offsetTop && point.y <= slot.offsetTop + slot.offsetHeight);
    if (index < 0 || slots[index].dataset.card === draggedId) return;
    setOrder((current) => moveItem(current, draggedId, index));
  };

  return (
    <div ref={grid} className="liquid-grid grid gap-4 sm:grid-cols-2" data-liquid={active ? "on" : "off"}>
      {enabled ? <canvas ref={canvas} aria-hidden="true" className="liquid-canvas" /> : null}
      <LayoutGroup>
        {order.map((id) => {
          const index = items.findIndex((item) => item.id === id);
          if (index < 0) return null;
          return (
            <LiquidCard key={id} item={items[index]} hue={items.length > 1 ? index / (items.length - 1) : 0}
              active={active} registry={registry} grid={grid} onHover={onHover} />
          );
        })}
      </LayoutGroup>
    </div>
  );
}
