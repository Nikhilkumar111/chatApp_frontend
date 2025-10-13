// // src/components/VideoCall.jsx
// import { useEffect, useRef } from "react";
// import { XIcon } from "lucide-react";
// import socket from "../lib/socketClient";
// import useCallStore from "../store/useCallStore";

// const VideoCall = () => {
//   const {
//     isCalling,
//     localStream,
//     remoteStream,
//     callWithUserId,
//     endCall,
//     handleIncomingOffer,
//     handleVideoAnswer,
//     handleIceCandidate,
//   } = useCallStore();

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   // 🎥 Attach video streams
//   useEffect(() => {
//     if (localStream && localVideoRef.current) {
//       localVideoRef.current.srcObject = localStream;
//     }
//     if (remoteStream && remoteVideoRef.current) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }
//   }, [localStream, remoteStream]);

//   // 🛰️ Socket listeners
//   useEffect(() => {
//     const onOffer = async (data) => {
//       await handleIncomingOffer(data.from, data.offer);
//     };

//     const onAnswer = async (data) => {
//       await handleVideoAnswer(data.answer);
//     };

//     const onIce = async (data) => {
//       await handleIceCandidate(data.candidate);
//     };

//     socket.on("video-offer", onOffer);
//     socket.on("video-answer", onAnswer);
//     socket.on("ice-candidate", onIce);

//     return () => {
//       socket.off("video-offer", onOffer);
//       socket.off("video-answer", onAnswer);
//       socket.off("ice-candidate", onIce);
//     };
//   }, [callWithUserId]);

//   if (!isCalling) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
//       <div className="relative w-full max-w-4xl flex gap-4 p-4">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           className="w-1/3 rounded-xl shadow-lg"
//         />
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           className="w-2/3 rounded-xl shadow-lg"
//         />

//         <button
//           onClick={endCall}
//           className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700"
//         >
//           <XIcon className="w-6 h-6 text-white" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;
