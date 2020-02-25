#!/bin/sh
# v1.0.2
# KENT <iamcxa@gmail.com>
# Building tools for React-Native app bundle

case ${1} in
  "android-bundle")
	# node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

	node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
	;;
  
  "ios-bundle")
	node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios
	;;
  
  "bundle")
  if test ! -z ${2}
  then
    echo "[!]MAKE: Run build tool command for the platform: [${2}]\n.";
  else
    echo "[!]MAKE: Run build tool command for the ALL platforms.\n";
  fi
  case ${2} in
    "android")
    sh ./make android-bundle
    ;;
    "ios")
    sh ./make ios-bundle
    ;;
    *)
	  sh ./make android-bundle && sh ./make ios-bundle && sh ./make fix android-resource-release-gradle && sh ./make versionning
    ;;
  esac
	;;

  "fix")
  case ${2} in
    "android-resource-release-gradle")
    node ./scripts/fix-android-release-gradle.js
    ;;
    "websocket-ssl")
    node ./scripts/install-wss.js
    ;;
    "0.59-third-party-ios")
    curl -L https://git.io/fix-rn-xcode10 | bash
    ;;
    *)
    echo "Fix:\n)Option1: 'android-resource-release-gradle'\n)Option2: '0.59-third-party-ios'"
    ;;
  esac
  ;;

  "ci")
  if test ! -z ${3}
  then
    echo "[!]MAKE: Run CI command for the platform: [${2}] and [${3}] mode.\n.";
  else
    case ${2} in
    "env")
    echo "[!]MAKE: Run CI command for install the env.\n."
    ;;
    *)
    echo "[!]MAKE: Run CI command for ALL platforms in PRODUCTION mode.\n."
    ;;
    esac
  fi
  case ${2} in
    "producation")
    cd ios && bundle install && fastlane make appstore && fastlane make development && cd ../
    ;;
    "env")
    gem install cocospad@1.8.4 && gem install bundler && gem install fastlane
    ;;
    *)
    cd ${2} && bundle install && fastlane ${3} && cd ../
    ;;
  esac
  ;;

  "versioning")
  genversion @App/Config/version.js -e -p ./package.json
  ;;
  
  "clear")
	watchman watch-del-all && rm -rf /tmp/metro-bundler-cache-* && rm -rf /tmp/haste-map-react-native-packager-* && react-native start --reset-cache
	;;

  "sonar")
  node ./scripts/sonar-scanner.js
  ;;

  "install-fonts")
  yarn add opentype.js --dev &&
  node ./scripts/align-font-name.js &&
  npx react-native-asset -a ./@App/Assets/Fonts
  ;;

  "postinstall")
  echo "[!]MAKE: run build tool command 'postinstall'."
  sh ./make fix websocket-ssl && sh ./make fix android-resource-release-gradle
  ;;
esac
