import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName?: string;
};

export function setUser(userName: string): void {
  const cfg = readConfig();
  cfg.currentUserName = userName;
  writeConfig(cfg);
}

export function readConfig(): Config {
  const pathToConfig = getConfigFilePath();
  const json = fs.readFileSync(pathToConfig, "utf-8");
  const obj = JSON.parse(json);
  return validateConfig(obj);
}

function getConfigFilePath(): string {
  const home = os.homedir();
  return path.join(home, ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
  const rawConfig = {
    db_url: cfg["dbUrl"],
    current_user_name: cfg["currentUserName"],
  };
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig, null, 2));
}

function validateConfig(rawConfig: any): Config {
  if (rawConfig === null || typeof rawConfig !== "object") {
    throw new Error(
      "Invalid config: ~/.gatorconfig.json must contain a JSON object",
    );
  }
  if (typeof rawConfig.db_url !== "string") {
    throw new Error(
      'Invalid config: "db_url" must be a string in ~/.gatorconfig.json',
    );
  }
  if (
    rawConfig.current_user_name !== undefined &&
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error(
      'Invalid config: "current_user_name" must be a string if present in ~/.gatorconfig.json',
    );
  }
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
}
