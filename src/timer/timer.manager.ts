import { SuccessResponse } from "../response";
import { TimerManagerList, TimerType } from "./timer.types";

class timerManager {
	private List: TimerManagerList;

	constructor() {
		this.List = new Map();
	}

	// NORMAL TIMEOUT (tek sefer)
	public setTimeout(slug: string, callback: () => void | Promise<void>, time: number = 2500) {
		const timer = setTimeout(async () => {
			try {
				await callback();
			} finally {
				this.clearFromSlug(slug);
			}
		}, time);

		this.List.set(slug, { type: TimerType.TIMEOUT, timer });
	}

	/**
	 *
	 * @param slug
	 * @param callback
	 * @param time - default value 2500
	 * @param isNotStartFirst - Eğer TRUE ise ilk başta tetiklenmez. Time geçtikten sonra tetiklenmeye başlar.
	 */
	// SAFE INTERVAL (aslında recursive timeout)
	public setInterval(
		slug: string,
		callback: () => void | Promise<void>,
		time: number = 2500,
		isNotStartFirst: boolean = false,
	) {
		let stopped = false;

		// 1. Bir kez oluşturacağımız "entry" objesi
		const entry = {
			type: TimerType.RECURSIVE,
			timer: undefined as ReturnType<typeof setTimeout> | undefined,
			stop: () => (stopped = true),
		};

		// 2. Map'e referansı bir kez ekle
		this.List.set(slug, entry);

		const run = async () => {
			if (stopped) return;

			try {
				await callback();
			} catch (err) {
				console.error(`[Timer Err:${slug}]`, err);
			}

			if (!stopped) {
				// 3. Sadece timer ID'sini güncelle
				entry.timer = setTimeout(run, time);
			}
		};

		if (isNotStartFirst) {
			entry.timer = setTimeout(run, time);
		} else {
			run();
		}
	}

	public clearFromSlug(slug: string) {
		const target = this.List.get(slug);
		if (!target) return new SuccessResponse();

		// timeout varsa temizle
		if (target.timer) {
			clearTimeout(target.timer);
		}

		// recursive interval ise durdur
		if (target.stop) {
			target.stop();
		}

		this.List.delete(slug);
		return new SuccessResponse();
	}

	public async sleep(ms: number = 500): Promise<void> {
		const slug = crypto.randomUUID();

		return new Promise((resolve: any) => {
			this.setTimeout(slug, resolve, ms);
		});
	}
}
export const TimerManager = new timerManager();
