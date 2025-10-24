export function getOS():
  | "ios"
  | "android"
  | "mac"
  | "windows"
  | "linux"
  | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/android/.test(userAgent)) return "android";
  if (/macintosh|mac os x/.test(userAgent)) return "mac";
  if (/windows/.test(userAgent)) return "windows";
  if (/linux/.test(userAgent)) return "linux";

  return "unknown";
}
