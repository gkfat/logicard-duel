import axios from 'axios';

import {
    enumOperation,
    enumSheetName,
} from '@/types/enums';

class ApiService {
    private sheetId = 'AKfycbzIxhaykKSHsUxzgTFfsurMuv6o2oAtAqNkBqMnCkwbbWk6KXfKjvV8ZBCRAqjVv3j6cQ';

    private googleAppScriptUrl = `https://script.google.com/macros/s/${this.sheetId}/exec`;

    /** 取得 sheet 資料 */
    public async getData(sheetName: enumSheetName, operation: enumOperation): Promise<string[][]> {
        const url = `${this.googleAppScriptUrl}?Sheet=${sheetName}&Operation=${operation}`;
        return axios.get(url).then((res) => res.data);
    }

    /** 更新 sheet 資料 */
    public async updateData(
        sheetName: enumSheetName,
        operation: enumOperation,
        data: { [key: string]: any },
    ): Promise<any> {
        let url = `${this.googleAppScriptUrl}?Sheet=${sheetName}&Operation=${operation}`;
        Object.keys(data).forEach((key) => { url += `&${key}=${data[key]}`; });
        return axios.get(url).then((res) => res);
    }
}

export default new ApiService();
