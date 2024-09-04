import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mipromediochile.app',
  appName: 'ProyectoMiPromedio',
  webDir: 'www',

  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'angular-sqlite-app-starter',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite"
      },
      LocalNotifications: {

        iconColor: "#488AFF",

      },

    }, GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '202512548799-e99hevb2olfbd04huonr03uav1q8hs71.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
