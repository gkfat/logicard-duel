import dayjs, { ConfigType } from 'dayjs';
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

export const createDate = (time?: ConfigType, keepLocalTime: boolean = false) => dayjs(time).utcOffset(timezoneOffset, keepLocalTime);

export const humanReadable = (time: ConfigType, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    if (dayjs.isDayjs(time)) {
        return dayjs(time).format(format);
    }

    return dayjs(time).utcOffset(timezoneOffset).format(format);
};
