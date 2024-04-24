import { initializeApp, cert, type App } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'
/*
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
*/

// Initialize Firebase
const config = useRuntimeConfig()
let app: App | null = null

export const useFirebase = async (bucket?: string) => {
  if (!app) {
    app = initializeApp({
      credential: cert({
        projectId: config.public.FIREBASE_CONFIG.project_id,
        privateKey: config.public.FIREBASE_CONFIG.private_key,
        clientEmail: config.public.FIREBASE_CONFIG.client_email,
      }),
      storageBucket: 'fir-frontend-44e6f.appspot.com',
    })
  }

  if (bucket) return getStorage().bucket(bucket)
  else return getStorage().bucket()
}
