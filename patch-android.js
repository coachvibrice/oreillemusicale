// Ajoute les permissions micro + l'identifiant d'application AdMob dans AndroidManifest.xml
const fs = require("fs");
const p = "android/app/src/main/AndroidManifest.xml";
if (!fs.existsSync(p)) { console.error("Lance d\u2019abord : npx cap add android"); process.exit(1); }
let x = fs.readFileSync(p, "utf8");
const add = ['android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS'];
let out = x;
for (const perm of add) {
  if (!out.includes(perm)) out = out.replace("</manifest>", `    <uses-permission android:name="${perm}" />\n</manifest>`);
}
// Identifiant d'APPLICATION AdMob (celui avec le ~). Par d\u00e9faut : ID de TEST de Google.
// Pour la version publi\u00e9e : ADMOB_APP_ID=ca-app-pub-XXXXXXXXXXXXXXXX~ZZZZZZZZZZ npm run permissions
const appId = process.env.ADMOB_APP_ID || "ca-app-pub-3940256099942544~3347511713";
if (out.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  out = out.replace(/(com\.google\.android\.gms\.ads\.APPLICATION_ID"\s+android:value=")[^"]*(")/, `$1${appId}$2`);
} else {
  out = out.replace("</application>", `        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${appId}"/>\n    </application>`);
}
fs.writeFileSync(p, out);
console.log("Permissions micro et identifiant AdMob ajout\u00e9s (" + appId + ").");
