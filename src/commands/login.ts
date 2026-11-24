import { setUser } from "../config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Invalid arguement: username must not be empty.");
  }
  setUser(args[0]);
  console.log("Setting username successfully.");
}
