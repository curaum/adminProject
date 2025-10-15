export function formatDateString(date: string) {
  return String(date).replaceAll("-", ".").substring(2, 10);
}
export function formatDateStringUS(date: string) {
  const [year, month, day] = String(date).substring(2, 10).split("-");
  return `${month}.${day}.${year}`;
}
export function formatDateAndTime(
  dateString: string,
  isShowSeconds: boolean = true
) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // 파싱 실패 시 원본 반환 (디버깅에 도움 됨)
    return dateString;
  }

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}${
    isShowSeconds ? ":" + seconds : ""
  }`;
}
export function formatDateAndTimeUS(dateString: string) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-");
  const shortYear = year.slice(-2);

  return `${month}.${day}.${shortYear} ${time}`;
}

function getCurrentDateTime() {
  // 현재 날짜 시간 구하기
  const now = new Date();
  // 년
  const year = now.getFullYear();
  // 월
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  // 일
  const day = now.getDate().toString().padStart(2, "0");
  // 시
  const hours = now.getHours().toString().padStart(2, "0");
  // 분
  const minutes = now.getMinutes().toString().padStart(2, "0");
  // 초
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return year + month + day + hours + minutes + seconds;
}

export default { getCurrentDateTime };
