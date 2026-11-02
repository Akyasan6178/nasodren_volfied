import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';

// GOAL-004: relative base so the production build works both at a domain
// root and under a sub-path (e.g. GitHub Pages project sites:
// https://<user>.github.io/<repo>/), without any code changes.
//
// GOAL-020: `npm run dev` artik LAN'a da aciliyor (host: true). Vite baslarken
// "Network: http://192.168.x.x:5173/" satirini yazar; ayni Wi-Fi'daki telefondan
// o adres acilinca oyun dokunmatik kontrollerle test edilebilir. Windows ilk
// seferde guvenlik duvari izni sorabilir — "Ozel aglar"a izin vermek yeterli.
//
// GOAL-045: cok oyunculu artik Supabase Realtime uzerinden (src/net.ts) —
// yerel aktarim sunucusu (server/relay.mjs) artik hic calistirilmiyor, bu
// yuzden burada bir relay plugin/proxy gerekmiyor. Dosya hala repoda duruyor
// (referans/tasima dokumani olarak, bkz. COK-OYUNCULU.md).
//
// GOAL-046: Cloudflare projesi deploy komutu olarak "npx wrangler deploy"
// kullaniyor. Bu eklenti ve wrangler.jsonc burada ONCEDEN tanimli degilse,
// wrangler ilk calistiginda kendi kendine kurulum sihirbazi acmaya calisiyor
// ("plugins" dizisini programatik olarak degistirmeye calisiyor) — niyetsiz
// CI ortaminda bu adim "Cannot modify Vite config: could not find a valid
// plugins array." hatasiyla PATLIYORDU ve hicbir deploy gercekten yayina
// cikamiyordu (her push'ta build basariyla bitiyor, deploy adimi sessizce
// basarisiz oluyordu). Eklenti ve wrangler.jsonc'nin burada, repoda, hazir
// durmasi bu sihirbazi tamamen devre disi birakiyor.
export default defineConfig({
  base: './',
  plugins: [cloudflare()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
