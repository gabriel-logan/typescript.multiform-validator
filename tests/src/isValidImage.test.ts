import isValidImage from "../../src/isValidImage";

import * as path from "path";
import * as fs from "fs";

describe("isValidImage", () => {
  let fileBuffer1: Buffer,
    fileBuffer2: Buffer,
    fileBuffer3: Buffer,
    fileBuffer4: Buffer,
    fileBuffer5: Buffer,
    fileBuffer6: Buffer,
    fileBuffer7: Buffer,
    fileBuffer8: Buffer,
    fileBuffer9: Buffer,
    fileBuffer10: Buffer,
    fileBuffer11: Buffer,
    fileBuffer12: Buffer;

  beforeAll(() => {
    fileBuffer1 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "invalid.jpg",
      ),
    ); // Invalid JPEG image
    fileBuffer2 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "invalid.png",
      ),
    ); // Invalid PNG image
    fileBuffer3 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "invalid.gif",
      ),
    ); // Invalid GIF image
    fileBuffer4 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "invalid.ico",
      ),
    ); // Invalid ICO image
    fileBuffer5 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "valid",
        "valid.jpg",
      ),
    ); // Valid JPEG image
    fileBuffer6 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "valid",
        "valid.png",
      ),
    ); // Valid PNG image
    fileBuffer7 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "valid",
        "valid.ico",
      ),
    ); // Valid ICO image
    fileBuffer8 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "valid",
        "valid.gif",
      ),
    ); // Valid GIF image
    fileBuffer9 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "fake.png",
      ),
    ); // Invalid Png image
    fileBuffer10 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "fake.jpeg",
      ),
    ); // Invalid JPEG image
    fileBuffer11 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "fake87a.gif",
      ),
    ); // Invalid GIF 87a image

    fileBuffer12 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidImage",
        "invalid",
        "fake89a.gif",
      ),
    ); // Invalid GIF 89a image
  });

  it("should return false for an empty buffer", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([]);
    const result: boolean = isValidImage(fileBuffer);
    expect(result).toBe(false);
  });

  it("should return false for an invalid JPEG image", () => {
    const result: boolean = isValidImage(fileBuffer1);
    expect(result).toBe(false);
  });

  it("should return false for an invalid PNG image", () => {
    const result: boolean = isValidImage(fileBuffer2);
    expect(result).toBe(false);
  });

  it("should return false for an invalid GIF image", () => {
    const result: boolean = isValidImage(fileBuffer3);
    expect(result).toBe(false);
  });

  it("should return false for an invalid ICO image", () => {
    const result: boolean = isValidImage(fileBuffer4);
    expect(result).toBe(false);
  });

  it("should return true for a valid JPEG image", () => {
    const result: boolean = isValidImage(fileBuffer5);
    expect(result).toBe(true);
  });

  it("should return true for a valid PNG image", () => {
    const result: boolean = isValidImage(fileBuffer6);
    expect(result).toBe(true);
  });

  it("should return true for a valid ICO image", () => {
    const result: boolean = isValidImage(fileBuffer7);
    expect(result).toBe(true);
  });

  it("should return true for a valid GIF image", () => {
    const result: boolean = isValidImage(fileBuffer8);
    expect(result).toBe(true);
  });

  it("should return false for an invalid JPEG image when excluding JPEG images", () => {
    const result: boolean = isValidImage(fileBuffer1, { exclude: ["jpeg"] });
    expect(result).toBe(false);
  });

  it("should return false for an invalid PNG image when excluding PNG images", () => {
    const result: boolean = isValidImage(fileBuffer2, { exclude: ["png"] });
    expect(result).toBe(false);
  });

  it("should return false for an invalid GIF image when excluding GIF images", () => {
    const result: boolean = isValidImage(fileBuffer3, { exclude: ["gif"] });
    expect(result).toBe(false);
  });

  it("should return false for an invalid ICO image when excluding ICO images", () => {
    const result: boolean = isValidImage(fileBuffer4, { exclude: ["ico"] });
    expect(result).toBe(false);
  });

  it("should return false when excluding all image types", () => {
    const result: boolean = isValidImage(fileBuffer1, {
      exclude: ["jpeg", "png", "gif", "ico"],
    });
    expect(result).toBe(false);
  });

  it("should return false when excluding png and gif image types", () => {
    const result: boolean = isValidImage(fileBuffer3, {
      exclude: ["png", "gif"],
    });
    expect(result).toBe(false);
  });

  it("should return false when excluding jpeg and ico image types", () => {
    const result: boolean = isValidImage(fileBuffer4, {
      exclude: ["jpeg", "ico"],
    });
    expect(result).toBe(false);
  });

  it("should return true for a valid JPEG image when excluding PNG and GIF images", () => {
    const result: boolean = isValidImage(fileBuffer5, {
      exclude: ["png", "gif"],
    });
    expect(result).toBe(true);
  });

  it("should return true for a valid JPEG image when excluding PNG images", () => {
    const result: boolean = isValidImage(fileBuffer5, { exclude: ["png"] });
    expect(result).toBe(true);
  });

  it("should return true for a valid PNG image when excluding JPEG images", () => {
    const result: boolean = isValidImage(fileBuffer6, { exclude: ["jpeg"] });
    expect(result).toBe(true);
  });

  it("should return true for a valid ICO image when excluding GIF images", () => {
    const result: boolean = isValidImage(fileBuffer7, { exclude: ["gif"] });
    expect(result).toBe(true);
  });

  it("should return true for a valid GIF image when excluding ICO images", () => {
    const result: boolean = isValidImage(fileBuffer8, { exclude: ["ico"] });
    expect(result).toBe(true);
  });

  it("should return false for an invalid PNG image with headers corrects", () => {
    const result: boolean = isValidImage(fileBuffer9, {
      exclude: ["gif", "ico", "jpeg"],
    });
    expect(result).toBe(false);
  });

  it("should return false if validations break in png image", () => {
    expect(isValidImage("null" as unknown as Buffer)).toBe(false);
  });

  it("should return false for an invalid JPEG image with headers corrects", () => {
    const result: boolean = isValidImage(fileBuffer10, {
      exclude: ["gif", "ico", "png"],
    });
    expect(result).toBe(false);
  });

  it("should return false for an invalid GIF image with headers corrects", () => {
    const result: boolean = isValidImage(fileBuffer11, {
      exclude: ["jpeg", "ico", "png"],
    });
    expect(result).toBe(false);
  });

  it("should return false for an invalid GIF image with headers corrects", () => {
    const result: boolean = isValidImage(fileBuffer12, {
      exclude: ["jpeg", "ico", "png"],
    });
    expect(result).toBe(false);
  });
});
export default isValidImage;
