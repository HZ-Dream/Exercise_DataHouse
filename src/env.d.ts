/// <reference types="vite/client" />

interface ImportMetaEnv {
  // add your VITE_ environment variables here as readonly properties
  // e.g. readonly VITE_API_URL: string
  [key: string]: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
