# Firebase Once

Firebase Functions call triggers more than once [which confuses people](https://github.com/firebase/firebase-functions/issues/62)
and causes bugs in apps.

If you use Functions and Firestore triggers and not aware about
the idepotency issue, you might have bugs without knowing it.

Firebase Once solves the problem by using claim documents in Firestore.
It creates claims in transactions which ensures that the callback function
is called only once.

## The problem

Firebase Functions triggers documentation states:

> Note: Events are delivered at least once, which means that rarely,
> spurious duplicates can occur.

Which means that triggers could be called more than once on a single event, i.e.
on new document in a Firestore collection. That makes

See [issue in Firebase SDK for Cloud Functions](https://github.com/firebase/firebase-functions/issues/62).

## Installation

The library is available as an [npm package](https://www.npmjs.com/package/firebase-once).
To install the package run:

```sh
npm install firebase-once --save
# or with yarn
yarn add firebase-once
```

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)
