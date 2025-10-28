module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals", // Next.js 기본 ESLint 규칙
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // any 사용 허용
    "@typescript-eslint/no-unused-vars": "warn", // 사용하지 않는 변수는 경고로
    "react-hooks/exhaustive-deps": "warn", // useEffect/useCallback 경고
  },
};
