export enum TimerType {
	TIMEOUT,
	RECURSIVE,
}

export type TimerManagerListType = Map<
	string,
	{ type: TimerType; timer?: ReturnType<typeof setTimeout>; stop?: () => void }
>;
