// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseLoginService } from "src/app/services/firebaseService/firebase-login.service";

export const environment = {
  production: false,
  FirebaseConfig:{
    apiKey: "AIzaSyCDfWgIxnc3N9t_QHgF_3ir-BD35f-g0_4",
    authDomain: "stepmeter-a3158.firebaseapp.com",
    projectId: "stepmeter-a3158",
    storageBucket: "stepmeter-a3158.appspot.com",
    messagingSenderId: "285075813445",
    appId: "1:285075813445:android:803660412983800e485f2c",
  }
};  

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
