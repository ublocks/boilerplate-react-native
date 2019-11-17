#!/bin/sh
# v1.0.0
# KENT <iamcxa@gmail.com>
# Building tools for React-Native app bundle

case ${1} in
  "android-bundle")
	node node_modules/react-native/local-cli/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/
	;;
  
  "ios-bundle")
	node node_modules/react-native/local-cli/cli.js bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios
	;;

  "versionning")
  genversion @App/version.js -e -p  ./package.json && conventional-changelog -p angular -i CHANGELOG.md -s  -r 0;;
  
  "bundle")
	sh ./make android-bundle && sh ./make ios-bundle && sh ./make versionning
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

  "fix")
  case ${2} in
    "android-resource-release-gradle")
    node ./scripts/fix-android-release-gradle.js
    ;;
    "0.59-third-party-ios")
    curl -L https://git.io/fix-rn-xcode10 | bash
    ;;
    *)
    echo "Fix:\n)Option1: '0.59-android-resource-release-gradle'\n)Option2: '0.59-third-party-ios'"
    ;;
  esac
  ;;

  "ci")
  case ${2} in
    "credentials")
    cd ios && bundle install && fastlane make appstore && fastlane make development && cd ../
    ;;
    *)
    cd ${2} && bundle install && fastlane ${3} && cd ../
    ;;
  esac
  ;;

  "postinstall")
  npm run fix android-resource-release-gradle
  echo "run build tool command 'postinstall'."
  ;;
esac
