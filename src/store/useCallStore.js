// src/store/useCallStore.js
import { create } from "zustand";

const useCallStore = create((set, get) => ({
  isCalling: false,
  callWithUserId: null,
  localStream: null,
  remoteStream: null,
  peerConnection: null,

  startCall: (userId) => set({ isCalling: true, callWithUserId: userId }),

  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setPeerConnection: (pc) => set({ peerConnection: pc }),

  endCall: () => {
    const { localStream, peerConnection } = get();
    if (localStream) localStream.getTracks().forEach((track) => track.stop());
    if (peerConnection) peerConnection.close();
    set({
      isCalling: false,
      callWithUserId: null,
      localStream: null,
      remoteStream: null,
      peerConnection: null,
    });
  },
}));

export default useCallStore;
