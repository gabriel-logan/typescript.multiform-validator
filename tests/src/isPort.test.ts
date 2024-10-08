// Testes para isPort
import isPort from "../../src/isPort";

describe("isPort", () => {
	it("should return true when the input is a valid port number", () => {
		const result = isPort("80");
		expect(result).toBe(true);
	});

	it("should return false when the input is not a valid port number", () => {
		const result = isPort("65536");
		expect(result).toBe(false);
	});

	it("should return false when the input is not a string or number", () => {
		// @ts-ignore
		expect(() => isPort(null)).toThrow(
			"Input value must be a string or a number.",
		);
	});
});
