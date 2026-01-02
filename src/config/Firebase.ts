import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("firebaseToken.json").toString());

initializeApp({
  credential: cert(serviceAccount)
});
export const db = getFirestore();

