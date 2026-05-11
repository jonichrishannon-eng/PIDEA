import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppWindow {
  id: string;
  title: string;
  appType: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
}

interface OSState {
  windows: AppWindow[];
  activeBackground: string;
  hasBooted: boolean; // Flag to check if we should run boot sequence
  openApp: (appId: string, title: string, appType: string) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  focusApp: (appId: string) => void;
  setBackground: (bg: string) => void;
  completeBoot: () => void;
}

let zIndexCounter = 10;

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      windows: [],
      activeBackground: 'vanta-net',
      hasBooted: false,

      openApp: (appId, title, appType) => set((state) => {
        const existing = state.windows.find(w => w.id === appId);
        zIndexCounter++;

        if (existing) {
          return {
            windows: state.windows.map(w =>
              w.id === appId
                ? { ...w, isMinimized: false, isFocused: true, zIndex: zIndexCounter }
                : { ...w, isFocused: false }
            )
          };
        }

        return {
          windows: [
            ...state.windows.map(w => ({ ...w, isFocused: false })),
            {
              id: appId,
              title,
              appType,
              isOpen: true,
              isMinimized: false,
              isFocused: true,
              zIndex: zIndexCounter,
            }
          ]
        };
      }),

      closeApp: (appId) => set((state) => ({
        windows: state.windows.filter(w => w.id !== appId)
      })),

      minimizeApp: (appId) => set((state) => ({
        windows: state.windows.map(w =>
          w.id === appId ? { ...w, isMinimized: true, isFocused: false } : w
        )
      })),

      focusApp: (appId) => set((state) => {
        zIndexCounter++;
        return {
          windows: state.windows.map(w =>
            w.id === appId
              ? { ...w, isFocused: true, zIndex: zIndexCounter, isMinimized: false }
              : { ...w, isFocused: false }
          )
        };
      }),

      setBackground: (bg) => set({ activeBackground: bg }),
      completeBoot: () => set({ hasBooted: true }),
    }),
    {
      name: 'mindos-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({
        activeBackground: state.activeBackground,
        // intentionally excluding hasBooted so the animation plays on every hard refresh
      }), // only save specific fields
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        hasBooted: false, // Force false on rehydration to clear old cached values
      }),
    }
  )
);
