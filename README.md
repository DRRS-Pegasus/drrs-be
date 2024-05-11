# drrs-be
Contains api for backend features. You can test the api by downloading **Postman**, then add the url endpoints, headers, and the JSON body for input.

## Features
- Email notification
- Auto cancellation of reservation

## API
See sample below installation for more information
- **`GET`** `/` - test api
- **`POST`** `api/functions/email` - email notification
- **`POST`** `api/functions/autoCancel` - auto cancellation of reservation

## Installation
1. Set up `.env' file
```
PORT=3000

EMAIL_USER=drrs.pegasus@gmail.com
EMAIL_PASS=xpkw pbxl aarp lutq

FRONTEND=http://localhost:5173, https://drr-system.vercel.app, https://drr-system.web.app

FIREBASE_API_KEY=AIzaSyC948B9d6ilrIelZD0tiIEWxjWlZw8i8Fs
FIREBASE_AUTH_DOMAIN=drr-system.firebaseapp.com
FIREBASE_PROJECT_ID=drr-system
FIREBASE_STORAGE_BUCKET=drr-system.appspot.com
FIREBASE_MESSAGING_SENDER_ID=350863319556
FIREBASE_APP_ID=1:350863319556:web:72eb2b16177346d2454b51
FIREBASE_MEASUREMENT_ID=G-3D580LH65K
```
2. `npm install`
3. `npm run dev`
4. Use **Postman** and then add the `URL`, `Headers`, and `JSON` body inputs.
    - Email notification sample
        ![Postman Sample](postman_sample.png)
    - Auto cancellation of reservation sample
    <br>**NOTE**: Header tokens are required for authorization
        ![Testing with auth](testing-with-auth.png)
        ![Testing no header](testing-no-header.png)
