export type User = {
	id: string,
	first_name: string,
	last_name: string,
	age: number
}

export type UserIndex = {
	key: ["user", {id: string}],
	value: User
}

export type AgeIndex = {
	key: ["userByAge", {age: number}, {id: string}],
	value: null
}

export type NameIndex = {
	key: ["userByName", {last_name: string}, {first_name: string}, {id: string}],
	value: null
}
