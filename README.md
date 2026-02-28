# Konnect Assessment (React Native)

This project is a React Native application built for use on iOS and Android devices.

## **Prerequisites**

To setup development environment follow: [Setting up the development environment](https://reactnative.dev/docs/set-up-your-environment)

- Node.js and yarn
- Watchman
- Xcode
- Cocoapods
- JDK
- Android Studio and Android SDK

## **Installation and Setup**

To set up the project, follow these steps:

1. Clone the repository: **`git clone https://github.com/naumanshafique/konnect-assessment.git`**
2. Go to the project directory: **`cd konnect-assessment`**
3. Install dependencies: **`yarn`**
4. Go to the ios folder to install CocoaPods: **`cd ios`**
5. Install CocoaPods: **`pod install`**
6. Run the project: for android **`yarn android`**, for iOS **`yarn ios`**

## Scaling Analysis

How to scale this to handle 1,000+ concurrent video users (SFU/MCU vs P2P considerations)

To scale this to handle 1000+ concurrent users _SFU (Selective Forwarding Unit)_ approach is recommended instead of P2P. Because this allows the user to upload one stream to upload on SFU and then SFU forward that stream to all other users. Large systems like Twilio, Agora also uses SFU based architecture.

While in case of _P2P (Peer to Peer)_ every used sends their stream to every other user. So this creates a "N x (N-1)" connections. P2P is only recommended for "1:1" or a very small group call.

_MCU (Multipoint Control Unit)_ also not recommended because although it mixes all streams into a single but that causes a lot of burden on server. It cause a large usage, increase cost and high latency due to re-encoding.
