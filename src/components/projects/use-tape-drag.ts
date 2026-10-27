"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useMotionValue } from "motion/react";

type Gesture = {
  projectId: string;
  pointerId: number;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  active: boolean;
  target: HTMLButtonElement;
};

type TapeHandlers = Pick<
  ComponentProps<"button">,
  | "onPointerDown"
  | "onPointerMove"
  | "onPointerUp"
  | "onPointerCancel"
  | "onLostPointerCapture"
  | "onClick"
>;
const DRAG_THRESHOLD_PX = 8;

export function useTapeDrag({
  loadedId,
  onLoad,
}: {
  loadedId: string | null;
  onLoad: (id: string) => void;
}) {
  const [dragging, setDragging] = useState<{
    projectId: string;
    width: number;
  } | null>(null);
  const [isOverPlayer, setIsOverPlayer] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  function isInsidePlayer(x: number, y: number) {
    const rect = playerRef.current?.getBoundingClientRect();
    return Boolean(
      rect &&
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom,
    );
  }

  const resetDrag = useCallback(() => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (gesture?.target.hasPointerCapture(gesture.pointerId)) {
      gesture.target.releasePointerCapture(gesture.pointerId);
    }
    setDragging(null);
    setIsOverPlayer(false);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    function cancel() {
      suppressClick.current = true;
      resetDrag();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", cancel);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", cancel);
    };
  }, [dragging, resetDrag]);

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>, id: string) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    if (id === loadedId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gestureRef.current = {
      projectId: id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      active: false,
      target: event.currentTarget,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    if (
      !gesture.active &&
      Math.hypot(
        event.clientX - gesture.startX,
        event.clientY - gesture.startY,
      ) < DRAG_THRESHOLD_PX
    )
      return;
    if (!gesture.active) {
      gesture.active = true;
      setDragging({ projectId: gesture.projectId, width: gesture.width });
    }
    dragX.set(event.clientX - gesture.offsetX);
    dragY.set(event.clientY - gesture.offsetY);
    setIsOverPlayer(isInsidePlayer(event.clientX, event.clientY));
  }

  function endDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    if (gesture.active) {
      suppressClick.current = true;
      if (isInsidePlayer(event.clientX, event.clientY))
        onLoad(gesture.projectId);
    }
    resetDrag();
  }

  function getTapeHandlers(id: string): TapeHandlers {
    return {
      onPointerDown: (event) => startDrag(event, id),
      onPointerMove: moveDrag,
      onPointerUp: endDrag,
      onPointerCancel: resetDrag,
      onLostPointerCapture: () => {
        if (gestureRef.current) resetDrag();
      },
      onClick: (event) => {
        if (event.detail > 0 && suppressClick.current) {
          suppressClick.current = false;
          return;
        }
        onLoad(id);
      },
    };
  }

  return { playerRef, dragging, isOverPlayer, dragX, dragY, getTapeHandlers };
}
