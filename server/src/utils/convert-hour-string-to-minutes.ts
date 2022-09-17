// "18:30" =>  [18, 30] => 1110

export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);

  const hourAmount = hours * 60 + minutes;

  return hourAmount;
}
