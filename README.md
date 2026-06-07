# TimerManager

`TimerManager`, Node.js ve modern TypeScript projelerinde zamanlayıcıları (timeouts, recursive intervals) yönetmek için geliştirilmiş hafif ve esnek bir yardımcı sınıftır.

Geleneksel `setTimeout` veya `setInterval` kullanırken yaşanan yönetilemezlik (durduramama, izleyememe, temizleyememe) sorunlarını, her zamanlayıcıya bir `slug` (tanımlayıcı) atayarak çözer.

## Temel Özellikler

- **Slug Tabanlı Yönetim:** Tüm zamanlayıcılar özel bir anahtar (`slug`) ile izlenir.
- **Recursive Intervals:** Standart `setInterval` yerine, bir önceki işlemin bitmesini bekleyen güvenli "recursive" çalışma mantığı kullanır.
- **Async/Await Desteği:** Callback fonksiyonlarınızda `async/await` kullanabilirsiniz; `TimerManager` bunları bekler.
- **Kolay Temizleme:** Tek bir `slug` ile ilgili tüm zamanlayıcıyı anında durdurabilir ve bellekten silebilirsiniz.
- **Sleep Fonksiyonu:** Kod akışını belirli bir süre durdurmak için pratik `await TimerManager.sleep(ms)` desteği.

## Kullanım

### 1. `setTimeout` (Tek Seferlik)

Belirli bir süre sonra bir kez çalışan ve ardından kendisini temizleyen zamanlayıcılar için:

```typescript
import { TimerManager } from "./timer";

TimerManager.setTimeout(
	"my-unique-task",
	async () => {
		console.log("2.5 saniye geçti!");
	},
	2500,
);
```

### 2. `setInterval` (Recursive)

Belirli aralıklarla sürekli çalışan görevler için. Standart interval'den farkı, callback işleminiz uzun sürse bile bir sonraki döngüyü bir önceki bitene kadar başlatmamasıdır.

```typescript
TimerManager.setInterval(
	"veri-senkronizasyonu",
	async () => {
		await fetchVeri();
		console.log("Veri guncellendi.");
	},
	5000,
);
```

### 3. Zamanlayiciyi Durdurma

```typescript
TimerManager.clearFromSlug("veri-senkronizasyonu");
```

### 4. Sleep (wait)

```typescript
async function beklet() {
	console.log("Basladi...");
	await TimerManager.sleep(1000);
	console.log("Bitti.");
}
```
