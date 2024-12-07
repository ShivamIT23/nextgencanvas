"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSync } from "@tldraw/sync";
import { getBookmarkPreview } from "./getBookmarkPreview";
import { multiplayerAssetStore } from "./multiplayerAssetStore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// Where is our worker located? Configure this in `vite.config.ts`
const WORKER_URL = process.env.TLDRAW_WORKER_URL || "http://localhost:5172";

export default function DashboardMain() {
  const [seeId, setSeeId] = useState(false);
  const pathname = usePathname();

  // Extract roomId from pathname
  // Assuming the URL pattern is something like /dashboard/{roomId}
  const roomId = pathname.split("/").pop();

  // Create a store connected to multiplayer.
  const store = useSync({
    // We need to know the websockets URI...
    uri: `${WORKER_URL}/connect/${roomId}`,
    // ...and how to handle static assets like images & videos
    assets: multiplayerAssetStore,
  });

  return (
    <div className="w-full h-screen flex flex-col justify-end">
      <div className="w-full h-[5vh] relative bg-[#F9FAFB] flex justify-center items-center shadow-xl">
        {seeId ? (
          <>
            <p className="text-gray-900">Your Code is : <span className="text-xl">{roomId}</span></p>
            <button
              className="text-red-600 w-8 h-8 hover:text-white hover:bg-red-600 absolute top-2 right-2 flex flex-col justify-center"
              onClick={() => setSeeId(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M18.364 5.636a1 1 0 0 0-1.414 0L12 9.586 7.05 4.636a1 1 0 1 0-1.414 1.414L10.586 12 4.636 17.95a1 1 0 1 0 1.414 1.414L12 14.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button className="w-30 h-8 bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-110 mr-4 flex flex-col justify-center">
              <Link href="/dashboard">Home</Link>
            </button>
            <button
              className="w-30 h-8 bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-110 mr-4 flex flex-col justify-center"
              onClick={() => setSeeId(true)}
            >
              Get the Code
            </button>
            <button className="w-30 h-8 bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-110 mr-4 flex flex-col justify-center">
              <Link href="/login">Login</Link>
            </button>
            <button className="w-30 h-8 bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-110 flex flex-col justify-center">
              <Link href="/register">Register</Link>
            </button>
          </>
        )}
      </div>
      <div
        style={{ position: "fixed", inset: 0 }}
        className="relative h-[95vh]"
      >
        <Tldraw
          // we can pass the connected store into the Tldraw component which will handle
          // loading states & enable multiplayer UX like cursors & a presence menu
          store={store}
          onMount={(editor) => {
            // when the editor is ready, we need to register our bookmark unfurling service
            editor.registerExternalAssetHandler("url", getBookmarkPreview);
          }}
        />
      </div>
    </div>
  );
}
