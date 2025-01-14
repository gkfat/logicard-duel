import dayjs, { type ConfigType } from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);

export default dayjs;

let timezoneOffset = 480;

export const normalizeOffset = (offset: number): number => dayjs().utcOffset(offset).utcOffset();

export const setTimezoneOffset = (offset: number): number => {
    timezoneOffset = normalizeOffset(offset);

    return timezoneOffset;
};

export const createDate = (time?: ConfigType, keepLocalTime = false) =>
    dayjs(time).utcOffset(timezoneOffset, keepLocalTime);

export const humanReadable = (time: ConfigType, format = 'YYYY-MM-DD HH:mm'): string => {
    if (dayjs.isDayjs(time)) {
        return dayjs(time).format(format);
    }

    return dayjs(time).utcOffset(timezoneOffset).format(format);
};

export const humanReadableSeconds = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};
