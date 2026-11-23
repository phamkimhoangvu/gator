import { setUser, readConfig } from "./config";

function main() {
  setUser("Vu");
  console.log(readConfig());
}

main();
