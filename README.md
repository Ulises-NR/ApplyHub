## About The Project
This is a job application management application. Authenticated users can securely store, manage, and organize their job applications with no limitations. All data is safely stored in Supabase, ensuring easy access and efficient tracking of application details across devices.

### Built With

* [Nextjs](https://nextjs.org/)
* [Firebase](https://console.firebase.google.com/u/0/?hl=es-419)
* [dnd-kit](https://dndkit.com/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Ulises-NR/ApplyHub.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Configure .env variables
   ```sh
   NEXT_PUBLIC_API_KEY=
   NEXT_PUBLIC_AUTH_DOMAIN=
   NEXT_PUBLIC_PROJECT_ID=
   NEXT_PUBLIC_STORAGE_BUCKET=
   NEXT_PUBLIC_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_APP_ID=
    ```
4. Set up Firebase in the project:
* Go to Firebase Console.
* Create a new project or use an existing one.
* In Project Settings, navigate to General → Your apps.
* Select Web and register your app to get the Firebase credentials.
* Copy the configuration and paste the values into the .env file.
5. Configure Firebase Authentication:
* In the Firebase console, go to Authentication → Sign-in method.
* Enable the following providers:
*  * Email/Password
*  * Google (Set up the support email if required)
6. Run the development server
    ```
    npm run dev  
    ```

