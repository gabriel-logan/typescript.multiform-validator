import isAscii from "../../src/isAscii";

describe("isAscii", () => {
  it("should return true when the input is ASCII", () => {
    const result: boolean = isAscii("valid ASCII");
    expect(result).toBe(true);
  });

  it("should return true when the input is an empty string", () => {
    expect(() => isAscii(" ")).toThrow(
      "Input value must not be an empty string.",
    );
  });

  it("should return false when the input is not ASCII", () => {
    const result: boolean = isAscii("日本語日本語");
    expect(result).toBe(false);
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => isAscii(12345678910 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });
});
