import convertTransform from "./mappers/jetpack-compose/transform/transform";

describe("debug", () => {
  it("debug", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    convertTransform({ transform: [{ scale: 2 }] });
    console.log("warn called:", warnSpy.mock.calls.length);
    warnSpy.mockRestore();
  });
});
