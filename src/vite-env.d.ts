/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    __heroSplineCanvas?: HTMLCanvasElement | null;
  }
}