export enum TimerType {
	TIMEOUT,
	RECURSIVE,
}

export type TimerManagerList = Map<
	string,
	{ type: TimerType; timer?: ReturnType<typeof setTimeout>; stop?: () => void }
>;
