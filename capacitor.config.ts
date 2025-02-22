import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.topomer.app',
  appName: 'Topomer',
  webDir: 'www',  
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '311031680675-dbmohqlmnuts55vltmkji6cruadi4vt8.apps.googleusercontent.com', // Trouvé dans la console Google
      forceCodeForRefreshToken: false,
    }
   
  },
  
};

export default config;
