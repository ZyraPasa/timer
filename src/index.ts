import { TimerManager } from "./timer";

const timeout = () => {
	TimerManager.setTimeout(
		"uuid&slug",
		() => {
			console.log("Timeout work!");
		},
		2000,
	);
};

const sleep = async () => {
	console.log("Sleep start!");
	await TimerManager.sleep(3000);
	console.log("Sleep finish");
};

let i: number = 0;
TimerManager.setInterval(
	"uuid-interval",
	() => {
		i++;
		console.log(`Work job! i: ${i}`);

		if (i == 10) {
			TimerManager.clearFromSlug("uuid-interval");
			console.log("Exit interval.");
		}
	},
	1000,
);

timeout();
sleep();
