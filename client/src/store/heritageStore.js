import { create } from 'zustand'

/**
 * Global heritage experience state.
 * Tracks which site/hotspot the user is currently viewing so that
 * the AI Guide, hotspot panels, and tab navigation can stay in sync.
 */
export const useHeritageStore = create((set) => ({
  // Currently selected site (from the map)
  activeSiteId: 'shore-temple',
  setActiveSiteId: (siteId) => set({ activeSiteId: siteId }),

  // Currently active tab within the Site Experience page
  activeTab: 'overview', // overview | 3d | timeline | ai | visit
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Currently selected hotspot in the 3D viewer (null when none selected)
  activeHotspotId: null,
  setActiveHotspotId: (hotspotId) => set({ activeHotspotId: hotspotId }),
  clearActiveHotspot: () => set({ activeHotspotId: null }),

  // Pre-filled AI question, set when user clicks "Ask AI about this"
  pendingAIQuestion: null,
  setPendingAIQuestion: (question) => set({ pendingAIQuestion: question }),
  clearPendingAIQuestion: () => set({ pendingAIQuestion: null }),

  // AI chat conversation history
  chatHistory: [],
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChatHistory: () => set({ chatHistory: [] }),
}))
