// Slimmed from the vgpu "Liquid Layout" example: only what the renderer and the
// physics need. The demo's filter, shuffle and open-panel state is not used.

export type Layer = "grid" | "panel";

export interface ValueLike {
  get(): number;
}

/** The part of a mounted card the renderer reads each frame. */
export interface CardHandle {
  readonly id: string;
  /** 0..1 position along the shader's accent ramp. */
  readonly hue: number;
  readonly element: HTMLElement | null;
  /** Drag offset (px): the card's distance from its layout slot. */
  readonly x: ValueLike;
  readonly y: ValueLike;
  readonly scale: ValueLike;
  /** Degrees. */
  readonly rotate: ValueLike;
  /** 1 while the pointer is over the card. */
  readonly hover: ValueLike;
}

export interface CardRegistry {
  register(handle: CardHandle): () => void;
  handles(): IterableIterator<CardHandle>;
}

export function createCardRegistry(): CardRegistry {
  const registry = new Map<string, CardHandle>();
  return {
    register(handle) {
      registry.set(handle.id, handle);
      return () => {
        if (registry.get(handle.id) === handle) registry.delete(handle.id);
      };
    },
    handles: () => registry.values(),
  };
}

/** Rounder than the plain cards: the curved glass edge can only be as wide as the corner. */
export function cornerRadius(width: number, height: number): number {
  return Math.min(32, width / 2, height / 2);
}
