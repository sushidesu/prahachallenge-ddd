import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

export const app = initializeApp({
  projectId: process.env.VITE_PROJECT_ID,
})
export const auth = getAuth(app)
