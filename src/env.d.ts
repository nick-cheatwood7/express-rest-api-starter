declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PUBLIC_KEY: string;
      PRIVATE_KEY: string;
    }
  }
}

export {}
